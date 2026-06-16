type ProfileProject = {
  name: string;
  description: string;
  tech: string;
  stars: number;
  url: string;
  tags: string[];
  live?: string;
  forked?: boolean;
};

export const profile = {
  name: "Arshdeep Singh",
  username: "arsh342",
  tagline: "creating & learning",
  avatar: "https://avatars.githubusercontent.com/u/135307874?v=4",
  about:
    "Backend-focused full-stack computer science student building production-ready Java, Spring Boot, and Node.js systems across cloud platforms. Built multi-tenant logistics SaaS, AI-driven career tooling, and security-focused developer workflows, with work spanning scalable REST APIs, real-time synchronization, PostgreSQL/MongoDB/Supabase, and practical AI integration. Open to internship opportunities where I can contribute, learn, and keep shipping.",

  technicalSkills: {
    languages: ["Java", "JavaScript", "TypeScript", "Python"],
    backend: [
      "Spring Boot",
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST API Design",
      "WebSocket APIs",
      "Socket.io",
      "Sequelize",
      "Maven",
    ],
    frontend: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Vite",
      "Electron",
      "Expo",
      "Thymeleaf",
    ],
    databases: [
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Firebase",
      "Supabase",
    ],
    cloud: ["AWS", "Google Cloud", "Docker", "Vercel", "Cloudinary"],
    concepts: [
      "Microservices Architecture",
      "JWT Authentication",
      "OAuth2",
      "CI/CD",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Spring Security",
      "Stripe Integration",
      "AI/LLM Integration",
      "Security Scanning",
      "Multi-Tenant Systems",
    ],
  },

  stats: {
    repos: 21,
    followers: 4,
    contributions: 635,
    commitsThisYear: 488,
    prsThisYear: 39,
    externalPRsMerged: 7,
  },

  links: {
    github: "https://github.com/arsh342",
    linkedin: "https://www.linkedin.com/in/arsh342",
    twitter: "https://x.com/Thearshsran",
    email: "arshth134@gmail.com",
  },

  languages: [
    { name: "Python", percentage: 43 },
    { name: "SCSS", percentage: 14 },
    { name: "TypeScript", percentage: 14 },
    { name: "JavaScript", percentage: 12 },
    { name: "Java", percentage: 10 },
    { name: "HTML", percentage: 7 },
  ],

  publicRepoTags: [
    "TypeScript",
    "JavaScript",
    "Java",
    "React",
    "Next.js",
    "Spring Boot",
    "Node.js",
  ],

  mostActive: [
    { name: "CareerCompass", commits: 185 },
    { name: "dispatchCore", commits: 55 },
    { name: "Job-Application-Service", commits: 51 },
    { name: "Athena", commits: 42 },
  ],

  technicalExpertise: [
    {
      title: "AI-Assisted Security & Code Analysis Tooling",
      tags: ["TypeScript", "AST Parsing", "SAST", "Semgrep", "Supabase"],
      indicators: [
        "Builds developer tooling that detects likely AI-generated code using heuristic scoring",
        "Runs multi-engine security analysis across secrets, dependency risks, static analysis, and hallucinated API usage",
        "Ships analysis workflows through both CLI and web platform interfaces",
      ],
      evidence: [
        {
          name: "arsh342/athena",
          url: "https://github.com/arsh342/athena",
        },
      ],
    },
    {
      title: "Full-Stack Web Application Development",
      tags: [
        "React",
        "TypeScript",
        "Node.js",
        "Next.js",
        "Vite",
        "Express.js",
        "Firebase",
      ],
      indicators: [
        "Builds modern web applications using React and TypeScript with Vite tooling",
        "Implements backend services with Node.js and Java-based REST APIs",
        "Integrates multiple data persistence layers including MySQL and Firebase",
      ],
      evidence: [
        {
          name: "arsh342/careercompass",
          url: "https://github.com/arsh342/careercompass",
        },
        {
          name: "arsh342/dispatchCore",
          url: "https://github.com/arsh342/dispatchCore",
        },
      ],
    },
    {
      title: "Microservices Architecture & API Design",
      tags: ["Spring Boot", "Java 17", "OAuth2", "JWT", "REST API Design"],
      indicators: [
        "Develops Spring Boot microservices with Java 17 for distributed systems",
        "Implements OAuth2 and JWT-based authentication and authorization patterns",
        "Designs RESTful APIs following industry standard practices",
      ],
      evidence: [
        {
          name: "arsh342/Job-Application-Service",
          url: "https://github.com/arsh342/Job-Application-Service",
        },
      ],
    },
    {
      title: "Cross-Platform Application Development",
      tags: ["Electron", "React Native", "Expo", "TypeScript"],
      indicators: [
        "Builds desktop applications using web technologies with native integration",
        "Develops mobile-first experiences with React Native ecosystem",
        "Creates consistent UIs across web, mobile, and desktop platforms",
      ],
      evidence: [
        {
          name: "arsh342/tic-tac-toe-react-native",
          url: "https://github.com/arsh342/tic-tac-toe-react-native",
        },
      ],
    },
    {
      title: "AI/ML Application Integration",
      tags: ["LLM APIs", "Python", "AI Integration", "Gemini AI"],
      indicators: [
        "Integrates large language model APIs for intelligent features",
        "Builds AI-powered tools with Gemini AI and custom prompting",
        "Designs multi-agent systems for code analysis and recommendations",
      ],
      evidence: [
        {
          name: "arsh342/careercompass",
          url: "https://github.com/arsh342/careercompass",
        },
      ],
    },
    {
      title: "Authentication & Security Implementation",
      tags: ["JWT", "OAuth2", "Firebase Authentication", "BCrypt"],
      indicators: [
        "Implements JWT and session-based authentication flows",
        "Designs role-based access control for multi-user systems",
        "Integrates Firebase Auth and OAuth2 for third-party login",
      ],
      evidence: [
        {
          name: "arsh342/Job-Application-Service",
          url: "https://github.com/arsh342/Job-Application-Service",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Athena",
      description:
        "AI code provenance and security analysis platform for JavaScript/TypeScript repositories. Combines an 11-signal heuristic scorer, TypeScript AST parsing, multi-engine security scanning, GitHub repo scans, live terminal streaming, and CLI pre-commit workflows.",
      tech: "TypeScript",
      stars: 0,
      url: "https://github.com/arsh342/athena",
      live: "https://athenacode.onrender.com",
      tags: ["TypeScript", "React", "Express", "Supabase"],
    },
    {
      name: "dispatchCore",
      description:
        "Real-time multi-tenant last-mile logistics dispatcher with live fleet tracking, dispatcher and driver dashboards, gig-driver marketplace, customer tracking, Firebase live updates, MySQL/Sequelize persistence, and concurrent assignment prevention.",
      tech: "TypeScript",
      stars: 0,
      url: "https://github.com/arsh342/dispatchCore",
      live: "https://www.dispatchcore.tech",
      tags: ["React", "Node.js", "MySQL", "WebSockets"],
    },
    {
      name: "CareerCompass",
      description:
        "AI-powered career platform built with Next.js and TypeScript, integrating Gemini AI for career analysis and recommendations, Stripe for subscription payments, with secure authentication, role-based access control, and scalable REST APIs. Hackathon submission on Devpost.",
      tech: "TypeScript",
      stars: 0,
      url: "https://github.com/arsh342/careercompass",
      live: "https://careercompassai.vercel.app/",
      tags: ["Next.js", "TypeScript", "Gemini AI", "Stripe"],
    },
    {
      name: "Job-Application-Service",
      description:
        "Spring Boot microservices backend with RESTful APIs, JWT-based authentication, role separation, request validation, centralized error handling, and MongoDB schema design with indexing. Led a team project with layered controller→service→repository architecture.",
      tech: "Java",
      stars: 0,
      url: "https://github.com/arsh342/Job-Application-Service",
      tags: ["Java", "Spring Boot", "MongoDB", "JWT"],
    },
    {
      name: "CollabSpace",
      description:
        "Enterprise-grade real-time team collaboration platform with SSL/HTTPS, Socket.IO chat, Kanban task management, Redis caching (90% load reduction), Stripe payments, and 99+ tests with CI/CD pipeline.",
      tech: "JavaScript",
      stars: 0,
      url: "https://github.com/arsh342/collabspace",
      live: "https://collabspace-y7s9.onrender.com/",
      tags: ["Node.js", "Socket.IO", "Redis", "Stripe"],
    },
    {
      name: "GameVault",
      description:
        "Cross-platform mobile application built with React Native featuring 10+ board and puzzle games, modular component architecture, optimized state management, Google AdMob integration, and successfully deployed to the Play Store.",
      tech: "TypeScript",
      stars: 0,
      url: "https://github.com/arsh342/tic-tac-toe-react-native",
      live: "https://play.google.com/store/apps/details?id=com.boltexpo.tictactoe",
      tags: ["React Native", "Expo", "Zustand", "AdMob"],
    },
  ] as ProfileProject[],

  codingPatterns: {
    totalCommits: 36,
    description:
      "Peaks midweek (Wednesday) and afternoon hours (4pm); weekend-active contributor",
    byDay: [
      { day: "S", value: 0.7 },
      { day: "M", value: 0.3 },
      { day: "T", value: 0.85 },
      { day: "W", value: 1.0 },
      { day: "T", value: 0.6 },
      { day: "F", value: 0.4 },
      { day: "S", value: 0.75 },
    ],
    byTime: [
      { time: "12a", value: 0.0 },
      { time: "4a", value: 0.4 },
      { time: "8a", value: 0.5 },
      { time: "12p", value: 0.6 },
      { time: "4p", value: 1.0 },
      { time: "8p", value: 0.8 },
    ],
    label: "Weekend active",
  },

  githubActivity: [
    {
      month: "May 2026",
      events: [
        {
          type: "commits" as const,
          description: "Advanced production work on AI security tooling and logistics SaaS",
          repos: [
            { name: "athena", commits: 42 },
            { name: "dispatchCore", commits: 55 },
          ],
        },
      ],
    },
    {
      month: "Apr 2026",
      events: [
        {
          type: "repos" as const,
          description: "Created Athena, an AI code provenance and security analysis platform",
          repos: [{ name: "athena", lang: "TypeScript" }],
        },
      ],
    },
    {
      month: "Feb 2026",
      events: [
        {
          type: "commits" as const,
          description: "Created 20 commits in 4 repositories",
          repos: [
            { name: "Gemini3", commits: 7 },
            { name: "bfhl-api", commits: 6 },
            { name: "AIforBharat", commits: 5 },
            { name: "Ai-For-Bharat", commits: 2 },
          ],
        },
        {
          type: "repos" as const,
          description: "Created 4 repositories",
          repos: [
            { name: "bfhl-api", lang: "Java" },
            { name: "Gemini3", lang: "TypeScript" },
            { name: "Ai-For-Bharat", lang: "" },
            { name: "AIforBharat", lang: "TypeScript" },
          ],
        },
      ],
    },
    {
      month: "Jan 2026",
      events: [
        {
          type: "commits" as const,
          description: "Created 44 commits in 2 repositories",
          repos: [
            { name: "careercompass", commits: 38 },
            { name: "Portfolio", commits: 6 },
          ],
        },
        {
          type: "repos" as const,
          description: "Created 1 repository",
          repos: [{ name: "Portfolio", lang: "TypeScript" }],
        },
      ],
    },
    {
      month: "Dec 2025",
      events: [
        {
          type: "commits" as const,
          description: "Created 70 commits in 2 repositories",
          repos: [
            { name: "careercompass", commits: 62 },
            { name: "collabspace", commits: 8 },
          ],
        },
      ],
    },
    {
      month: "Nov 2025",
      events: [
        {
          type: "commits" as const,
          description: "Created 103 commits in 3 repositories",
          repos: [
            { name: "careercompass", commits: 85 },
            { name: "collabspace", commits: 14 },
            { name: "tic-tac-toe-react-native", commits: 4 },
          ],
        },
      ],
    },
    {
      month: "Oct 2025",
      events: [
        {
          type: "commits" as const,
          description: "Created 78 commits in 3 repositories",
          repos: [
            { name: "collabspace", commits: 22 },
            { name: "tic-tac-toe-react-native", commits: 44 },
            { name: "Job-Application-Service", commits: 12 },
          ],
        },
      ],
    },
    {
      month: "Sep 2025",
      events: [
        {
          type: "commits" as const,
          description: "Created 39 commits in 1 repository",
          repos: [{ name: "Job-Application-Service", commits: 39 }],
        },
      ],
    },
  ],

  recentInterests: [
    "AI Agents",
    "LLMs",
    "AI Code Security",
    "MCP Servers",
    "RAG",
    "Gemini",
    "OpenAI",
    "Anthropic",
    "Microservices",
    "Logistics SaaS",
    "System Design",
    "Open Source",
  ],

  interests: [
    "AI Agents & LLM tooling (OpenAI, Anthropic, Gemini AI)",
    "AI code provenance, SAST, and secure developer workflows",
    "Real-time logistics, dispatch, and multi-tenant SaaS systems",
    "MCP Servers & Model Context Protocol ecosystem",
    "Microservices architecture & system design",
    "Open source contributions & developer tooling",
  ],

  interestsCount: 10,

  domainExpertise: [
    {
      title: "Real-Time Logistics & Dispatch Platforms",
      tags: ["Multi-Tenant SaaS", "Firebase Realtime Database", "MySQL", "WebSockets"],
      indicators: [
        "Builds dispatcher, driver, customer, and platform-admin workflows for last-mile delivery",
        "Implements real-time order, location, assignment, and marketplace bid updates",
        "Designs data isolation and concurrency controls for multi-company logistics operations",
      ],
      evidence: [
        {
          name: "arsh342/dispatchCore",
          url: "https://github.com/arsh342/dispatchCore",
        },
      ],
    },
    {
      title: "Enterprise Job & Career Platform Development",
      tags: ["Spring Boot", "JWT", "OAuth2", "MySQL", "React"],
      indicators: [
        "Builds multi-tier recruitment systems with authentication and authorization flows",
        "Implements job matching and application tracking workflows",
        "Designs career guidance and job marketplace architectures",
      ],
      evidence: [
        {
          name: "arsh342/Job-Application-Service",
          url: "https://github.com/arsh342/Job-Application-Service",
        },
        {
          name: "arsh342/careercompass",
          url: "https://github.com/arsh342/careercompass",
        },
      ],
    },
    {
      title: "Real-time Collaborative Systems",
      tags: ["Socket.IO", "Redis", "Event-Driven Architecture", "Node.js"],
      indicators: [
        "Architects event-driven systems for team communication and coordination",
        "Implements WebSocket-based real-time data synchronization",
        "Designs shared workspace features with concurrent user interactions",
      ],
      evidence: [
        {
          name: "arsh342/collabspace",
          url: "https://github.com/arsh342/collabspace",
        },
      ],
    },
    {
      title: "Cross-Platform Application Development",
      tags: ["Electron", "React Native", "Expo", "TypeScript", "Vite"],
      indicators: [
        "Builds desktop applications using web technologies with native integration",
        "Develops mobile-first experiences with React Native ecosystem",
        "Creates consistent UIs across web, mobile, and desktop platforms",
      ],
      evidence: [
        {
          name: "arsh342/tic-tac-toe-react-native",
          url: "https://github.com/arsh342/tic-tac-toe-react-native",
        },
      ],
    },
    {
      title: "Production REST API Engineering",
      tags: ["Java 17", "Spring Boot 3.5", "REST API Design", "Maven"],
      indicators: [
        "Designs production-grade APIs for regulated industries like healthcare and fintech",
        "Implements modern Java-based microservices with Spring Boot 3.x",
        "Builds scalable backend services with current LTS frameworks",
      ],
      evidence: [
        {
          name: "arsh342/Job-Application-Service",
          url: "https://github.com/arsh342/Job-Application-Service",
        },
      ],
    },
  ],
};
