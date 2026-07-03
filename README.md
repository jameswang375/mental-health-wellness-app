# Mental Health & Wellbeing App

A full-stack mental health wellness application built with Next.js and Supabase. Users can log their daily mood, track exercise sessions, write journal entries, and explore evidence-based mental health education, all in one place.

> **Live demo:** <a href="https://mental-health-wellness-app-delta.vercel.app" target="_blank">mental-health-wellness-app-delta.vercel.app</a>

---

Mental health data is among the most sensitive personal data that exists. Every architectural decision in this project was motivated by that.

- **Server Components** so no data fetching happens on the client. All data is fetched in server components.
- **Server Actions** for all mutations.
- **Row Level Security** on all user tables. Users can only read and write their own data.
- **Middleware** for route protection. Unauthenticated users are redirected before any page renders.


## Preview of Dashboard
![Dashboard](./public/app-dashboard.png)