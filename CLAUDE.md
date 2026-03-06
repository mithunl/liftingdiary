# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Docs-First Requirement

Before generating any code, **always read the relevant file(s) in the `/docs` directory first**. Every feature, component, or change must be grounded in the design and requirements documented there. Do not make assumptions or proceed from general knowledge alone when a relevant doc exists.

Current docs:
- `docs/ui.md` — UI design specifications and component guidelines

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Stack

- **Next.js 16** with the App Router (`src/app/`)
- **React 19**
- **TypeScript** (strict mode, `@/*` maps to `./src/*`)
- **Tailwind CSS v4** (configured via `@import "tailwindcss"` in `globals.css`, no `tailwind.config` file)

## Architecture

This is a fresh `create-next-app` scaffold — only the default boilerplate exists so far. The app has not been built out yet.

- `src/app/layout.tsx` — root layout with Geist font variables and global CSS
- `src/app/page.tsx` — home page (currently the default Next.js starter page)
- `src/app/globals.css` — global styles including Tailwind import and CSS custom properties for light/dark theming (`--background`, `--foreground`)

CSS theme tokens (`--background`, `--foreground`) are defined in `globals.css` and exposed as Tailwind colors via `@theme inline`. Dark mode uses `prefers-color-scheme: dark`.
