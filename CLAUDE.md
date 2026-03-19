# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start dev server at http://localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
npm start      # Start production server
```

No test framework is configured.

## Architecture

**Stack:** Next.js 14 (App Router) + TypeScript, React 18, Three.js/R3F for 3D, Motion for animations, Lenis for smooth scrolling.

**Single-page layout:** `app/page.tsx` composes all sections in order. Navigation uses anchor-based scrolling (`#hero`, `#about`, etc.) with CSS `scroll-snap-type: y mandatory` for full-page snapping.

**Content:** All site content (bio, experience, projects, tech stack) is centralized in `components/data.ts`. This is the single source of truth — update this file to change displayed content.

**Styling approach:**
- CSS variables defined in `styles/globals.css` (colors: `--bg`, `--accent`, `--white`; easing: `--ease`)
- Inline styles for dynamic/component-level values
- Custom webfonts: Nohemi (headings), Safiro (body), Martian Mono (code) — loaded from `/public/fonts/`
- Breakpoints: 1100px, 900px, 700px, 450px

**Animations:**
- Parallax scrolling in Hero via `requestAnimationFrame`
- `IntersectionObserver` for reveal animations in Experience
- Dynamic imports (`next/dynamic`) for heavy components: `LiquidEther`, `RotatingText`
- `FluidCursor` is disabled on touch devices automatically

**3D:** GLB model (`/public/lanyard/card.glb`) is loaded via webpack asset rule in `next.config.js`. React Three Fiber + Rapier physics used in Lanyard component.

**ReactBits:** Animated UI components (SpotlightCard, LiquidEther, RotatingText, etc.) are bundled directly in `components/reactbits/` — not installed as an npm package.

**Images:** Remote images from AWS S3 are whitelisted in `next.config.js`. Company/tech logos are SVGs in `/public/logos/`.

**No environment variables** are needed — the portfolio is fully static.
