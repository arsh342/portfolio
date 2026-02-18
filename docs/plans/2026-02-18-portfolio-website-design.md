# Portfolio Website — Design & Implementation Plan

**Date:** 2026-02-18
**Author:** Arsh (@arsh342)
**Aesthetic:** SkillSync-inspired dark theme with copper/amber accents

---

## 🎯 Project Overview

A personal portfolio website inspired by the [SkillSync](https://app.skillsync.wiki/profile/arsh342) aesthetic — dark background, monospaced typography, amber/copper accent palette, data-driven sections with visual flair. Built with **Next.js 14 (App Router)** + **Tailwind CSS** + **Framer Motion**.

---

## 📋 Profile Data (Sourced)

### Identity

- **Name:** Arsh
- **GitHub:** [github.com/arsh342](https://github.com/arsh342)
- **LinkedIn:** [linkedin.com/in/arshsingh342](https://www.linkedin.com/in/arshsingh342)
- **Twitter/X:** [@Thearshsran](https://twitter.com/Thearshsran)
- **Email:** arshth134@gmail.com
- **Tagline:** "creating & learning"
- **Repos:** 21 | **Followers:** 4 | **Contributions (year):** 635 | **Commits (this year):** 488 | **PRs:** 39
- **External PRs Merged:** 7

### About

Builds full-stack applications with TypeScript as the primary language, focusing on React-based solutions for web and mobile platforms. Developed a cross-platform notes application with React, TypeScript, Vite, and Electron, integrating Firebase Authentication. Created a React Native mobile game for Android using Expo, featuring single-player and two-player modes. Built enterprise-grade REST APIs with Java and Spring Boot, including a production API for Bajaj Finserv Health. Implemented microservices architecture with Spring Boot for job portal systems, incorporating JWT and OAuth2 authentication.

### Technical Expertise (5 domains)

1. **Full-Stack Web Application Development** — React, TypeScript, Node.js, Vite, MySQL, Firebase
2. **Microservices Architecture & API Design** — Spring Boot, Java 17, OAuth2, JWT, MySQL
3. **Cross-Platform Application Development** — Electron, React Native, Expo, TypeScript
4. **AI/ML Application Integration** — LLM APIs, Python, AI Integration
5. **Authentication & Security Implementation** — JWT, OAuth2, Firebase Authentication

### Featured Projects

| Project                                                               | Description                                                                      | Tech       | Stars |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------- | ----- |
| [TicketBookingSystem](https://github.com/arsh342/TicketBookingSystem) | SkyRoute — console-based ticket booking for planes, trains, buses                | Java       | ⭐1   |
| [Moonbrew](https://github.com/arsh342/Moonbrew)                       | Modern web app with Next.js + Firebase auth                                      | JavaScript | ⭐1   |
| [cookbook](https://github.com/arsh342/cookbook)                       | Modern recipe sharing platform with React + Firebase                             | HTML       | ⭐1   |
| [bfhl-api](https://github.com/arsh342/bfhl-api)                       | Production REST API — Bajaj Finserv Health qualifier (Java 17 + Spring Boot 3.5) | Java       | —     |
| [Gemini3](https://github.com/arsh342/Gemini3)                         | AI-powered application                                                           | TypeScript | —     |
| [Ai-For-Bharat](https://github.com/arsh342/Ai-For-Bharat)             | AI for Bharat initiative                                                         | TypeScript | —     |

### Languages (in public repos)

- TypeScript, JavaScript, Java, React, Spring Boot
- Python (43%), SCSS (14%), TypeScript (14%)

### Recent Interests

- Python, AI agents, LLMs, Appwrite

### Coding Patterns

- Peaks midweek (Wednesday) and afternoon hours (4pm)
- Weekend-active contributor
- 36 commits recent

### Most Active Repos

- careercompass (185 commits)
- Job-Application-Service (51)
- tic-tac-toe-react-native (48)
- collabspace (44)

### Links

- Twitter: https://twitter.com/Thearshsran
- LinkedIn: https://www.linkedin.com/in/arshsingh342
- GitHub: https://github.com/arsh342
- Email: arshth134@gmail.com

---

## 🎨 Design System

### Aesthetic Direction

**SkillSync-inspired dark terminal/developer aesthetic:**

- Deep dark backgrounds (#0a0a0a, #111111, #1a1a1a)
- Copper/amber accent color (#c97e3a / #d4863a) — matches SkillSync's signature orange
- Monospaced + sans-serif typography pairing
- Uppercase section headers with letter-spacing (like SkillSync's "ABOUT", "SKILLS", "PROJECTS")
- Card-based layouts with subtle borders
- Data visualization elements (contribution bars, skill badges)
- Minimal, information-dense design

### Color Palette

```
--bg-primary:    #0a0a0a    (deep black)
--bg-secondary:  #111111    (card background)
--bg-tertiary:   #1a1a1a    (elevated surfaces)
--border:        #2a2a2a    (subtle borders)
--border-hover:  #3a3a3a    (hover borders)
--text-primary:  #e5e5e5    (main text)
--text-secondary:#888888    (muted text)
--text-muted:    #555555    (very muted)
--accent:        #c97e3a    (copper/amber — SkillSync orange)
--accent-hover:  #d4943e    (lighter copper)
--accent-glow:   #c97e3a20  (subtle glow)
```

### Typography

- **Headings / Labels:** `JetBrains Mono` or `IBM Plex Mono` — monospaced, technical feel
- **Body:** `Inter` or `IBM Plex Sans` — clean readability
- **Section headers:** ALL CAPS with `letter-spacing: 0.15em`

### Layout Principles

- Single-column centered layout (max-width ~900px) like SkillSync
- Section dividers with centered labels
- Cards with `border: 1px solid #2a2a2a` + `border-radius: 8px`
- Badge/pill components for technologies
- Contribution heatmap-style visualizations

---

## 📐 Page Sections (Single Page)

1. **Hero / Profile Header**
   - Avatar, name, username, tagline
   - Stats row: Repos · Followers · Commits · PRs
   - Social links (GitHub, LinkedIn, Twitter)

2. **About**
   - Centered section header "ABOUT"
   - Bio text in card

3. **Insights**
   - Stats cards: commits, PRs this year
   - Most active repos with bar visualization
   - Languages in public repos (pill badges)

4. **Skills / Technical Expertise**
   - Tabbed: Technical Expertise (5) | Domain Expertise
   - Expandable items with indicators, evidence links
   - Tech badges per skill

5. **Projects**
   - Project cards with name, description, tech, stars
   - Link to GitHub repo

6. **Coding Patterns**
   - Activity heatmap-style bars (by day, by time)
   - Recent interests badges

7. **Links / Contact**
   - Social links row
   - Contact email

8. **Footer**
   - Minimal footer with "Based on open source activity"

---

## 🛠️ Tech Stack

| Layer     | Choice                                | Reason                          |
| --------- | ------------------------------------- | ------------------------------- |
| Framework | Next.js 14 (App Router)               | SSR, performance, Vercel deploy |
| Styling   | Tailwind CSS 3                        | Utility-first, rapid iteration  |
| Animation | Framer Motion                         | Smooth reveal animations        |
| Icons     | Lucide React                          | Clean, consistent SVG icons     |
| Fonts     | Google Fonts (JetBrains Mono + Inter) | SkillSync-style typography      |
| Deploy    | Vercel                                | Zero-config Next.js hosting     |

---

## ✅ Implementation Task List

### Phase 1: Project Setup

- [x] Task 1.1 — Initialize Next.js 14 project with TypeScript + Tailwind
- [x] Task 1.2 — Configure Tailwind theme (colors, fonts, custom utilities)
- [x] Task 1.3 — Set up Google Fonts (JetBrains Mono + Inter)
- [x] Task 1.4 — Create base layout with global styles
- [x] Task 1.5 — Install dependencies (framer-motion, lucide-react)

### Phase 2: Core Components

- [x] Task 2.1 — `SectionHeader` component (centered, uppercase, letter-spaced)
- [x] Task 2.2 — `Badge` / `Pill` component (tech tags)
- [x] Task 2.3 — `Card` component (dark bg, border, rounded)
- [x] Task 2.4 — `StatCard` component (number + label)
- [x] Task 2.5 — `BarChart` component (horizontal bars for activity)
- [x] Task 2.6 — `ProjectCard` component
- [x] Task 2.7 — `SkillAccordion` component (expandable)

### Phase 3: Page Sections

- [x] Task 3.1 — Hero section (avatar, name, stats, socials)
- [x] Task 3.2 — About section
- [x] Task 3.3 — Insights section (stats + activity bars + language badges)
- [x] Task 3.4 — Skills section (tabbed: Technical / Domain)
- [x] Task 3.5 — Projects section (grid of project cards)
- [x] Task 3.6 — Coding Patterns section (day/time bars + interests)
- [x] Task 3.7 — Links / Footer section

### Phase 4: Polish & SEO

- [x] Task 4.1 — Framer Motion scroll-reveal animations
- [x] Task 4.2 — Responsive design (mobile-first)
- [x] Task 4.3 — SEO meta tags, Open Graph, favicon
- [x] Task 4.4 — Accessibility audit (contrast, alt text, keyboard nav)
- [x] Task 4.5 — Performance optimization (font loading, image optimization)

### Phase 5: Deploy

- [ ] Task 5.1 — Vercel deployment setup
- [ ] Task 5.2 — Custom domain configuration (optional)

---

## 📁 File Structure

```
Portfolio/
├── .agents/skills/          # Agent skills (existing)
├── docs/plans/              # Design docs
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with fonts + metadata
│   │   ├── page.tsx         # Main portfolio page
│   │   └── globals.css      # Global styles + Tailwind
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Insights.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── CodingPatterns.tsx
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       ├── SectionHeader.tsx
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── StatCard.tsx
│   │       ├── BarChart.tsx
│   │       ├── ProjectCard.tsx
│   │       └── SkillAccordion.tsx
│   └── data/
│       └── profile.ts       # All profile data centralized
├── public/
│   └── avatar.jpg           # Profile avatar
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── tsconfig.json
```

---

_Design approved — proceeding to implementation._
