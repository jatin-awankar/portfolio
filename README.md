# Jatin Awankar Portfolio

Personal portfolio built with Next.js App Router and a terminal-inspired UI.

![Portfolio screenshot](./public/SS.png)

**Live:** [jatinawankar.dev](https://jatinawankar.dev)  
**Resume:** [Jatin_Awankar_Resume.pdf](https://jatinawankar.dev/Jatin_Awankar_Resume.pdf)

## Overview

This project showcases:

- Hero, capabilities, project highlights, and contact sections on the home page
- A dedicated projects page with detailed project cards and changelog-style entries
- An about page with bio, contribution graph, and open-source PR activity
- A writings page that fetches Medium posts with a safe fallback dataset
- A floating terminal + status bar experience to keep the portfolio theme consistent

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Icons:** lucide-react
- **Content/Data:** local TypeScript data files + Medium RSS parsing (`rss-parser`)
- **Analytics:** `@vercel/analytics`

## Project Structure

- `/app` — routes (`/`, `/projects`, `/about`, `/writings`) and layout
- `/components/portfolio` — reusable portfolio UI and page-specific panes
- `/lib` — data sources and integrations (GitHub + Medium)
- `/public` — static assets (images, sounds, resume, OG image)

## Getting Started

### 1) Install dependencies

```bash
npm ci
```

### 2) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

This app works without secrets for most pages.

For live GitHub contribution/PR data on the About page, set:

```bash
GITHUB_TOKEN=your_github_token
```

If `GITHUB_TOKEN` is not provided, the UI gracefully falls back.

## Scripts

- `npm run dev` — start local dev server
- `npm run lint` — run ESLint
- `npm run build` — create production build
- `npm run start` — start production server

## Deployment

The app is ready for deployment on Vercel (recommended) or any Node-compatible host that supports Next.js.

## Contact

- LinkedIn: [linkedin.com/in/jatin-awankar](https://www.linkedin.com/in/jatin-awankar)
- X/Twitter: [x.com/awankar_jay](https://x.com/awankar_jay)
- Email: [jatinawankar02@gmail.com](mailto:jatinawankar02@gmail.com)
