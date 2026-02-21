# Open Gate Creative Films

A portfolio website for Open Gate Creative Films, built with Next.js and React. Features smooth scroll-based animations throughout.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/) components (Radix UI + Tailwind)

## Prerequisites

You need [Bun](https://bun.sh/) installed. If you don't have it:

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Getting Started

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Start the development server:**

   ```bash
   bun run dev
   ```

3. **Open the site:** visit [http://localhost:3000](http://localhost:3000) in your browser.

## Other Commands

```bash
bun run build   # Create a production build
bun run start   # Run the production build locally
bun run lint    # Run ESLint
```

## Project Structure

```
app/              # Pages (Next.js App Router)
components/       # React components
  ├── *.tsx       # Page-level animation components
  └── ui/         # shadcn/ui component library
lib/
  ├── utils.ts    # Utility functions (cn helper)
  └── data/       # Content data for each page
hooks/            # Custom React hooks
public/           # Static assets (images, icons)
```

## Pages

| Route        | Description                                    |
| ------------ | ---------------------------------------------- |
| `/`          | Home — scroll/keyboard-driven section animation |
| `/about`     | About — scroll-triggered image spread effect    |
| `/services`  | Services — staggered card reveal animation      |
| `/approach`  | Approach — timeline with scroll progress        |
| `/combined`  | Combined services + approach view               |
