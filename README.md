# Vynspire – Modern Storytelling Platform

Vynspire is a polished blogging experience built on the App Router and Tailwind v4. It blends a bespoke light/dark design system, motion, and subtle glassmorphism to keep reading and writing feel premium across desktop, tablet, and mobile.

## ✨ Core Features

- **Immersive theming** – Dual light/dark palettes with gradient typography, frosted glass surfaces, and system-aware transitions managed via `next-themes`.
- **Responsive glass navbar** – Desktop pill navigation with scroll-in motion, plus a mobile drawer (burger + sidebar) that mirrors profile, write, auth, and theme controls.
- **Home discovery** – Gradient hero with stats, animated post cards, skeleton loaders, search with quick filters, and framer-motion entry.
- **AI-assisted writing** – Post form includes a “Generate with AI” helper that drafts outlines based on title and category, so writers can jump straight to editing.
- **Story detail polish** – Detail page prefetches metadata, gracefully falls back to AI-generated content, supports manual regeneration, and offers a “Listen to content” text-to-speech control.
- **User accounts** – Mock auth flow (login/register) with Zustand state, profile editing, name/email updates, avatar uploads with previews, and persistent storage.
- **Creation suite** – Create/Edit pages reuse the glass form shell, show contextual hero copy, and keep action buttons consistent with the main theme.
- **Feedback loops** – `sonner` toasts for auth, CRUD, and AI actions; inline loading spinners; animated empty states when filters match no posts.
- **Accessibility considerate** – Focus styles, aria labels on theme/profile toggles, responsive buttons, and speech synthesis fallback detection.

## 🚀 Getting Started

```bash
npm install
npm run dev
# then visit http://localhost:3000
```

- `npm run lint` – ESLint with TypeScript rules
- Mock data/API: see `src/lib/api/mockApi.ts`
- Global styles & tokens: `src/app/globals.css`

## 🗺️ Project Structure

- `src/app` – Route groups for auth, dashboard (create/edit/profile/detail), and the landing page.
- `src/components` – UI atoms (Button/Input/Card), layout (Navbar), posts (Card, Filter, Skeleton), providers (Theme).
- `src/lib` – Zustand stores (`authStore`, `postStore`) and mock API helpers.

## 📌 Notes & Next Ideas

- Current mock API simulates network latency; swap with a real backend when ready.
- ESLint currently flags legacy `any` usage in auth/post flows—refine types when backfilling real APIs.
- Consider adding RSS, scheduled publishing, or custom voices for the text-to-speech control.

Enjoy building and sharing with Vynspire! ✍️📖✨
