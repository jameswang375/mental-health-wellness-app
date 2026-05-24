# Mental Health & Wellbeing App

A full-stack mental health wellness application built with Next.js and Supabase. Users can log their daily mood, track exercise sessions, write journal entries, and explore evidence-based mental health education, all in one place.

> **Live demo:** <a href="https://mental-health-wellness-app-delta.vercel.app" target="_blank">mental-health-wellness-app-delta.vercel.app</a>

---

## Features

- **Mood tracking** — Daily check-in with a 1–10 score and optional note. Streak tracking and weekly comparisons show progress over time.
- **Exercise logging** — Browse a library of physical, breathing, CBT, and mindfulness exercises. Log sessions with duration and notes.
- **Journal** — Private journaling with optional guided prompts and full-text search across past entries.
- **Education** — Evidence-based mental health facts grouped by topic, each with peer-reviewed citations and source links.
- **Progress** — Recharts-powered mood and exercise visualizations with 7-day, 30-day, and all-time filters. Includes a mood/exercise correlation insight.
- **Weekly summary** — Dashboard card comparing this week's avg mood, exercise sessions, and journal entries against last week.
- **Data export** — Download all personal data as a CSV from the profile page.
- **Authentication** — Email/password sign-up and login, forgot password flow with PKCE-based reset, protected routes via Next.js middleware.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, Server Actions) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Deployment | Vercel |

---

## Architecture Highlights

Mental health data is among the most sensitive personal data that exists. Every architectural decision in this project was motivated by that.

- **Server Components** No data fetching happens on the client. All data is fetched in server components.
- **Server Actions** for all mutations (`logMood`, `logExercise`, `saveJournalEntry`, `deleteAccount`, etc.).
- **Row Level Security** on all user tables. Users can only read and write their own data.
- **Middleware** for route protection. Unauthenticated users are redirected before any page renders.


## Preview of Dashboard
![Dashboard](./public/app-dashboard.png)