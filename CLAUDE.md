# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 + React 19 website for "Open Gate Creative Films" — a portfolio/showcase site built around scroll-based animations. Uses Bun as the package manager.

## Commands

```bash
bun run dev       # Start dev server (port 3000)
bun run build     # Production build
bun run start     # Run production server
bun run lint      # ESLint
```

No test framework is configured.

## Architecture

### Pages (App Router)

Each route has a dedicated page component that renders a single animation component:

- `/` → `HomeAnimation` — wheel/keyboard scroll navigation between sections with 2200ms cubic easing
- `/about` → `AboutSpread` — scroll-triggered image spread effect (clustered → spread positions)
- `/services` → `ServicesCards` — sequential card reveal with staggered `requestAnimationFrame` timing
- `/approach` → `ApproachTimeline` — timeline with scroll-progress-mapped animations (4 steps)
- `/combined` → `CombinedExperience` — integrated services + approach view

### Data Layer

Page content lives in `lib/data/{page}.ts` files (home, about, services, approach). Animation components import data from these files rather than hardcoding content.

### Animation Patterns

All animations use raw `requestAnimationFrame` loops — no animation libraries. Two main patterns:

1. **Wheel/keyboard navigation** (HomeAnimation): Event listeners trigger animated transitions with cubic easing functions
2. **Scroll progress** (AboutSpread, ApproachTimeline, ServicesCards): Scroll position mapped to a 0–1 progress value that drives CSS transforms

Easing functions (cubic-ease-in-out, ease-out-cubic) are defined inline within components.

### UI Components

59 shadcn/ui components exist in `components/ui/` (configured as "new-york" style). Most are unused by the main pages but available for extension.

## Key Configuration

- **Path alias:** `@/*` maps to the project root
- **TypeScript:** Strict mode, ES6 target
- **CSS:** Tailwind v4 with OkLCH color variables, dark mode via CSS `:dark` selector
- **Next.js config:** `typescript.ignoreBuildErrors: true`, image optimization disabled (`unoptimized: true`)
- **shadcn/ui:** Configured in `components.json` — uses Radix UI primitives, lucide-react icons
