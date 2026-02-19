# Portfolio — Arshdeep Singh

Personal developer portfolio built with Next.js, featuring real-time GitHub data, an in-site resume, and a dark minimal aesthetic.

## Tech Stack

- **Framework** — Next.js 16, React 19, TypeScript
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Data** — GitHub REST API + Search API (real-time)

## Features

- **Live GitHub Data** — repos, languages, contribution graph, coding patterns, activity timeline, and trending interests fetched from the GitHub API
- **Contribution Heatmap** — full-year GitHub-style graph + mini monthly graph in the hero
- **Projects** — cards with live links, auto-detected tech tags from repo languages, topics, and READMEs
- **Skills & Expertise** — technical/domain expertise with evidence links
- **Resume** — styled in-site resume page at `/resume` with PDF download
- **Loading Screen** — pixelated avatar with accent palette and blinking animation
- **Error Pages** — 404/500 screens with negative matrix digit art
- **Favicon** — accent-tinted avatar generated via sharp

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your GITHUB_TOKEN (fine-grained PAT)

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable       | Description                               |
| -------------- | ----------------------------------------- |
| `GITHUB_TOKEN` | GitHub fine-grained personal access token |

## Project Structure

```
src/
├── app/              # Pages & API routes
│   ├── page.tsx      # Home page
│   ├── resume/       # Resume page
│   ├── api/github/   # GitHub data API route
│   └── ...           # Error pages, layout, globals
├── components/       # UI components
│   ├── Hero.tsx      # Nav, avatar, stats, mini contribution graph
│   ├── About.tsx     # Bio section
│   ├── TechStack.tsx # Technical skills grid
│   ├── Projects.tsx  # Project cards
│   ├── Insights.tsx  # Stats, languages, contribution graph, repo tags
│   ├── Skills.tsx    # Technical & domain expertise
│   ├── CodingPatterns.tsx  # Activity charts, interests, timeline
│   ├── Footer.tsx    # Links, pixelated avatar
│   ├── LoadingScreen.tsx   # Pixel avatar loading
│   ├── ErrorScreen.tsx     # Matrix digit error display
│   └── ui/           # Reusable UI primitives
├── data/profile.ts   # Fallback profile data
├── hooks/            # useGitHubData hook
├── lib/github.ts     # GitHub API fetching & computation
scripts/
└── generate-favicon.mjs  # Accent-tinted favicon generator
```

## Scripts

| Command                             | Description                           |
| ----------------------------------- | ------------------------------------- |
| `npm run dev`                       | Start dev server                      |
| `npm run build`                     | Production build                      |
| `npm run start`                     | Start production server               |
| `node scripts/generate-favicon.mjs` | Regenerate favicon from GitHub avatar |

## License

MIT
