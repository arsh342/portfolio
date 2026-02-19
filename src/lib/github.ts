const GITHUB_USERNAME = "arsh342";
const GITHUB_API = "https://api.github.com";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
  name: string | null;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  pushed_at: string;
  created_at: string;
  topics: string[];
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    size?: number;
    ref_type?: string;
    action?: string;
    pull_request?: { merged: boolean };
  };
}

export interface GitHubStats {
  repos: number;
  followers: number;
  contributions: number;
  commitsThisYear: number;
  prsThisYear: number;
}

export interface GitHubRepoData {
  name: string;
  description: string;
  tech: string;
  stars: number;
  url: string;
  live: string | null;
  fork: boolean;
  pushedAt: string;
  topics: string[];
}

export interface ActivityMonth {
  month: string;
  events: ActivityEvent[];
}

export interface ActivityEvent {
  type: "commits" | "repos" | "prs";
  description: string;
  repos: { name: string; commits?: number; lang?: string }[];
}

export interface LanguageStat {
  name: string;
  percentage: number;
}

export interface ContributionDay {
  date: string;
  level: number; // 0-4
}

export interface CodingPatternsData {
  totalEvents: number;
  description: string;
  byDay: { day: string; value: number }[];
  byTime: { time: string; value: number }[];
  label: string;
}

export interface TrendingInterest {
  keyword: string;
  repos: {
    name: string;
    description: string;
    stars: number;
    url: string;
    language: string | null;
    starsToday?: number;
  }[];
}

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

// Scrape contribution count from GitHub profile (no auth needed, no rate limit)
export async function fetchContributionsThisYear(): Promise<number> {
  try {
    const year = new Date().getFullYear();
    const res = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`,
      { cache: "no-store" },
    );
    if (!res.ok) return 0;
    const html = await res.text();
    // Parse: "76\n      contributions\n        in 2026"
    const match = html.match(
      />\s*(\d+)\s*\n\s*contributions\s*\n\s*in\s+\d{4}/,
    );
    return match ? parseInt(match[1], 10) : 0;
  } catch {
    return 0;
  }
}

// Scrape the full contribution graph (date + intensity level 0-4)
export async function fetchContributionGraph(): Promise<ContributionDay[]> {
  try {
    const year = new Date().getFullYear();
    const res = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const html = await res.text();
    const days: ContributionDay[] = [];
    const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      days.push({ date: match[1], level: parseInt(match[2], 10) });
    }
    // Sort by date
    days.sort((a, b) => a.date.localeCompare(b.date));
    return days;
  } catch {
    return [];
  }
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) {
    // Return defaults on rate limit
    return {
      public_repos: 0,
      followers: 0,
      following: 0,
      avatar_url: "",
      bio: null,
      name: null,
    };
  }
  return res.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
    { headers, cache: "no-store" },
  );
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  const allEvents: GitHubEvent[] = [];
  try {
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/events?per_page=100&page=${page}`,
        { headers, cache: "no-store" },
      );
      if (!res.ok) break;
      const events = await res.json();
      if (!Array.isArray(events) || events.length === 0) break;
      allEvents.push(...events);
    }
  } catch {
    // Silently fail — activity timeline will use fallback data
  }
  return allEvents;
}

export function computeLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const langCount: Record<string, number> = {};
  let total = 0;

  for (const repo of repos) {
    if (repo.language && !repo.fork) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      total++;
    }
  }

  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100),
    }));
}

export function buildActivityTimeline(events: GitHubEvent[]): ActivityMonth[] {
  const monthMap = new Map<
    string,
    {
      pushes: Map<string, number>;
      repos: { name: string; lang: string }[];
      prs: number;
    }
  >();

  for (const event of events) {
    const date = new Date(event.created_at);
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    const repoName = event.repo.name.replace(`${GITHUB_USERNAME}/`, "");

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, {
        pushes: new Map(),
        repos: [],
        prs: 0,
      });
    }

    const month = monthMap.get(monthKey)!;

    if (event.type === "PushEvent") {
      // Count commits if available, otherwise count each push as 1
      const commitCount =
        event.payload.commits?.length ?? event.payload.size ?? 1;
      const current = month.pushes.get(repoName) || 0;
      month.pushes.set(repoName, current + commitCount);
    }

    if (
      event.type === "CreateEvent" &&
      event.payload.ref_type === "repository"
    ) {
      month.repos.push({ name: repoName, lang: "" });
    }

    if (
      event.type === "PullRequestEvent" &&
      event.payload.action === "closed" &&
      event.payload.pull_request?.merged
    ) {
      month.prs++;
    }
  }

  const timeline: ActivityMonth[] = [];

  for (const [monthKey, data] of monthMap) {
    const events: ActivityEvent[] = [];

    if (data.pushes.size > 0) {
      const totalCommits = Array.from(data.pushes.values()).reduce(
        (a, b) => a + b,
        0,
      );
      const repos = Array.from(data.pushes.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, commits]) => ({ name, commits }));

      events.push({
        type: "commits",
        description: `Created ${totalCommits} commits in ${repos.length} ${repos.length === 1 ? "repository" : "repositories"}`,
        repos,
      });
    }

    if (data.repos.length > 0) {
      events.push({
        type: "repos",
        description: `Created ${data.repos.length} ${data.repos.length === 1 ? "repository" : "repositories"}`,
        repos: data.repos,
      });
    }

    if (events.length > 0) {
      timeline.push({ month: monthKey, events });
    }
  }

  return timeline;
}

export function computeCodingPatterns(
  events: GitHubEvent[],
): CodingPatternsData {
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const timeLabels = ["12a", "4a", "8a", "12p", "4p", "8p"];
  const dayCounts = new Array(7).fill(0);
  const timeCounts = new Array(6).fill(0); // 6 four-hour buckets

  let totalEvents = 0;

  for (const event of events) {
    if (event.type === "PushEvent") {
      const date = new Date(event.created_at);
      const dayOfWeek = date.getUTCDay(); // 0=Sun, 6=Sat
      const hour = date.getUTCHours();
      const timeBucket = Math.min(Math.floor(hour / 4), 5); // 0-5

      const count = event.payload.commits?.length ?? event.payload.size ?? 1;
      dayCounts[dayOfWeek] += count;
      timeCounts[timeBucket] += count;
      totalEvents += count;
    }
  }

  // Normalize to 0-1 range
  const maxDay = Math.max(...dayCounts, 1);
  const maxTime = Math.max(...timeCounts, 1);

  const byDay = dayNames.map((day, i) => ({
    day,
    value: Math.round((dayCounts[i] / maxDay) * 100) / 100,
  }));

  const byTime = timeLabels.map((time, i) => ({
    time,
    value: Math.round((timeCounts[i] / maxTime) * 100) / 100,
  }));

  // Find peak day and time
  const peakDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
  const peakTimeIndex = timeCounts.indexOf(Math.max(...timeCounts));
  const fullDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const timeRanges = [
    "midnight–4am",
    "4am–8am",
    "8am–noon",
    "noon–4pm",
    "4pm–8pm",
    "8pm–midnight",
  ];

  // Determine label
  const weekendActivity = dayCounts[0] + dayCounts[6];
  const weekdayActivity = dayCounts.slice(1, 6).reduce((a, b) => a + b, 0);
  const label =
    weekendActivity > weekdayActivity * 0.5
      ? "Weekend active"
      : "Weekday focused";

  const description =
    totalEvents > 0
      ? `Peaks on ${fullDayNames[peakDayIndex]} and ${timeRanges[peakTimeIndex]} (UTC)`
      : "No recent activity data";

  return { totalEvents, description, byDay, byTime, label };
}

// Interest keywords mapped to GitHub search queries
const INTEREST_QUERIES: { keyword: string; query: string }[] = [
  { keyword: "AI Agents", query: "ai-agent OR ai-agents OR autonomous-agent" },
  { keyword: "LLMs", query: "llm OR large-language-model" },
  { keyword: "MCP Servers", query: "mcp-server OR model-context-protocol" },
  { keyword: "RAG", query: "retrieval-augmented-generation OR rag-pipeline" },
  { keyword: "Gemini", query: "gemini-api OR google-gemini" },
  { keyword: "OpenAI", query: "openai OR gpt-4 OR chatgpt-api" },
  { keyword: "Anthropic", query: "anthropic OR claude-ai OR claude-api" },
  { keyword: "Microservices", query: "microservices OR microservice" },
  { keyword: "System Design", query: "system-design OR distributed-systems" },
  { keyword: "Open Source", query: "open-source OR hacktoberfest" },
];

export async function fetchTrendingInterests(): Promise<TrendingInterest[]> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const dateStr = oneWeekAgo.toISOString().split("T")[0];

  const results: TrendingInterest[] = [];

  // Fetch top 3 repos per interest keyword (recently created/updated, sorted by stars)
  const fetches = INTEREST_QUERIES.map(async ({ keyword, query }) => {
    try {
      const searchQuery = `${query} created:>${dateStr}`;
      const res = await fetch(
        `${GITHUB_API}/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc&per_page=2`,
        { headers, cache: "no-store" },
      );
      if (!res.ok) return { keyword, repos: [] };
      const data = await res.json();
      const repos = (data.items || []).map(
        (r: {
          full_name: string;
          description: string | null;
          stargazers_count: number;
          html_url: string;
          language: string | null;
        }) => ({
          name: r.full_name,
          description: (r.description || "").slice(0, 100),
          stars: r.stargazers_count,
          url: r.html_url,
          language: r.language,
        }),
      );
      return { keyword, repos };
    } catch {
      return { keyword, repos: [] };
    }
  });

  const settled = await Promise.all(fetches);
  for (const result of settled) {
    if (result.repos.length > 0) {
      results.push(result);
    }
  }

  return results;
}

// Fetch real commit count for a repo via the contributors endpoint
async function fetchRepoCommitCount(repoName: string): Promise<number> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/contributors?per_page=1`,
      { headers, cache: "no-store" },
    );
    if (!res.ok) return 0;
    const contributors = await res.json();
    if (!Array.isArray(contributors)) return 0;
    // Find the owner's contributions
    const owner = contributors.find(
      (c: { login: string }) =>
        c.login.toLowerCase() === GITHUB_USERNAME.toLowerCase(),
    );
    return owner?.contributions ?? 0;
  } catch {
    return 0;
  }
}

/** Fetch count of PRs authored by the user that were merged in repos they don't own */
async function fetchExternalPRsMerged(): Promise<number> {
  try {
    // Search for merged PRs by the user, excluding their own repos
    const query = `type:pr+author:${GITHUB_USERNAME}+is:merged+-user:${GITHUB_USERNAME}`;
    const res = await fetch(
      `${GITHUB_API}/search/issues?q=${query}&per_page=1`,
      { headers, cache: "no-store" },
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.total_count ?? 0;
  } catch {
    return 0;
  }
}

export async function fetchAllGitHubData() {
  const [
    user,
    repos,
    events,
    contributionsThisYear,
    contributionGraph,
    trendingInterests,
    externalPRsMerged,
  ] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepos(),
    fetchGitHubEvents(),
    fetchContributionsThisYear(),
    fetchContributionGraph(),
    fetchTrendingInterests(),
    fetchExternalPRsMerged(),
  ]);

  // Count PRs this year from events
  const currentYear = new Date().getFullYear();
  const yearStart = new Date(currentYear, 0, 1);
  let prsThisYear = 0;

  for (const event of events) {
    const eventDate = new Date(event.created_at);
    if (eventDate >= yearStart) {
      if (
        event.type === "PullRequestEvent" &&
        (event.payload.action === "opened" || event.payload.action === "closed")
      ) {
        prsThisYear++;
      }
    }
  }

  const stats: GitHubStats = {
    repos: user.public_repos,
    followers: user.followers,
    contributions: contributionsThisYear,
    commitsThisYear: contributionsThisYear,
    prsThisYear,
  };

  const languages = computeLanguageStats(repos);
  const activity = buildActivityTimeline(events);
  const codingPatterns = computeCodingPatterns(events);

  // Most active repos: get top repos by recent push activity, then fetch real commit counts
  const nonForkRepos = repos
    .filter((r) => !r.fork)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 8); // Check top 8 recently pushed repos

  const mostActiveWithCounts = await Promise.all(
    nonForkRepos.map(async (repo) => ({
      name: repo.name,
      commits: await fetchRepoCommitCount(repo.name),
      pushedAt: repo.pushed_at,
    })),
  );

  const mostActive = mostActiveWithCounts
    .filter((r) => r.commits > 0)
    .sort((a, b) => b.commits - a.commits)
    .slice(0, 4);

  // Extract real "In Public Repos" tags from languages + topics
  const repoTags = computeRepoTags(repos);

  return {
    stats,
    languages,
    activity,
    mostActive,
    codingPatterns,
    trendingInterests,
    contributionGraph,
    repoCount: user.public_repos,
    followers: user.followers,
    avatarUrl: user.avatar_url,
    repoTags,
    externalPRsMerged,
  };
}

/** Extract top languages and framework/tool topics actually used across public repos,
 *  supplemented by technologies from the user's GitHub README profile */
function computeRepoTags(repos: GitHubRepo[]): string[] {
  const nonFork = repos.filter((r) => !r.fork);

  // Count languages
  const langCount: Record<string, number> = {};
  for (const repo of nonFork) {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  }

  // Count topics (normalize casing)
  const topicCount: Record<string, number> = {};
  // Map topic slugs to display names
  const TOPIC_DISPLAY: Record<string, string> = {
    react: "React",
    reactjs: "React",
    nextjs: "Next.js",
    "next-js": "Next.js",
    nodejs: "Node.js",
    "node-js": "Node.js",
    express: "Express.js",
    expressjs: "Express.js",
    "spring-boot": "Spring Boot",
    springboot: "Spring Boot",
    typescript: "TypeScript",
    javascript: "JavaScript",
    java: "Java",
    python: "Python",
    tailwindcss: "Tailwind CSS",
    "tailwind-css": "Tailwind CSS",
    mongodb: "MongoDB",
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    docker: "Docker",
    aws: "AWS",
    firebase: "Firebase",
    "firebase-auth": "Firebase",
    "firebase-database": "Firebase",
    graphql: "GraphQL",
    "rest-api": "REST API",
    "react-native": "React Native",
    stripe: "Stripe",
    electron: "Electron",
    "electron-app": "Electron",
    vite: "Vite",
    prisma: "Prisma",
    supabase: "Supabase",
    "supabase-auth": "Supabase",
    "supabase-db": "Supabase",
    vercel: "Vercel",
    android: "Android",
    "android-app": "Android",
    kotlin: "Kotlin",
    flutter: "Flutter",
    dart: "Dart",
    fastapi: "FastAPI",
    expo: "Expo",
    "expo-cli": "Expo",
    "expo-go": "Expo",
    "google-cloud": "Google Cloud",
    gcp: "Google Cloud",
    c: "C",
    cpp: "C++",
    "c-plus-plus": "C++",
    git: "Git",
    // Additional slugs from actual repo topics
    cloudinary: "Cloudinary",
    "gemini-api": "Gemini",
    redis: "Redis",
    "socket-io": "Socket.io",
    socketio: "Socket.io",
    jwt: "JWT",
    oauth2: "OAuth2",
    oauth: "OAuth2",
    thymeleaf: "Thymeleaf",
    maven: "Maven",
    "spring-security": "Spring Security",
    microservices: "Microservices",
    micorservices: "Microservices", // typo in actual repo topic
  };

  for (const repo of nonFork) {
    for (const topic of repo.topics || []) {
      const slug = topic.toLowerCase();
      const display = TOPIC_DISPLAY[slug];
      if (!display) continue; // skip unknown topic slugs to keep tags clean
      topicCount[display] = (topicCount[display] || 0) + 1;
    }
  }

  // Known tech from README profile (arsh342/README.md) — adds a small weight
  // so these show up if not enough topics/languages fill the list
  const README_TECH = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "Spring Boot",
    "MongoDB",
    "MySQL",
    "Firebase",
    "Supabase",
    "AWS",
    "Google Cloud",
    "Stripe",
    "React Native",
    "Electron",
    "C",
    "C++",
    "Redis",
    "Socket.io",
    "Cloudinary",
    "Gemini",
    "Microservices",
    "Git",
  ];

  // Merge: languages by repo count, topics by repo count
  const tags = new Map<string, number>();

  // Add languages (these are primary)
  for (const [lang, count] of Object.entries(langCount)) {
    tags.set(lang, (tags.get(lang) || 0) + count * 2); // weight languages higher
  }

  // Add topics/frameworks
  for (const [topic, count] of Object.entries(topicCount)) {
    if (tags.has(topic)) {
      tags.set(topic, tags.get(topic)! + count);
    } else {
      tags.set(topic, count);
    }
  }

  // Boost README tech — these are technologies the user actually uses.
  // Add weight whether or not they were already detected from repos,
  // so they don't get buried beneath languages with many repos.
  for (const tech of README_TECH) {
    tags.set(tech, (tags.get(tech) || 0) + 3);
  }

  // Languages to skip (not interesting as tags)
  const SKIP_LANGS = new Set(["EJS", "HTML", "CSS", "Shell", "Dockerfile"]);

  // Sort by frequency, take top tags
  return [...tags.entries()]
    .filter(([name]) => !SKIP_LANGS.has(name))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 24)
    .map(([name]) => name);
}
