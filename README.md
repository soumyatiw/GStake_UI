# Stake — Landing Page UI

A pixel-perfect, fully responsive Next.js recreation of the **Stake** real estate investment platform landing page. Built with JavaScript and plain CSS Modules — no Tailwind, no UI libraries.

---

## Preview

> Replicates the Stake landing UI including:
> - Animated hero section with background overlay
> - Jigsaw puzzle property card with floating piece animations
> - Token batch price progression grid
> - Fully responsive across mobile, tablet, and desktop

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| JavaScript (no TypeScript) | Language |
| CSS Modules | Styling (no Tailwind) |
| Inter (Google Fonts) | Typography |

---

## Project Structure

```
Assignment_UI/
├── app/
│   ├── globals.css          # CSS variables, resets, global styles
│   ├── layout.js            # Root layout, Inter font import
│   └── page.js              # Main page — composes all sections
│
├── components/
│   ├── Navbar/
│   │   ├── Navbar.js        # Fixed nav with scroll effect
│   │   └── Navbar.module.css
│   │
│   ├── Hero/
│   │   ├── Hero.js          # Full-viewport hero with bg image + CTA
│   │   └── Hero.module.css
│   │
│   ├── PropertyCard/
│   │   ├── PropertyCard.js  # Jigsaw overlay card + stats counter
│   │   └── PropertyCard.module.css
│   │
│   └── PriceProgression/
│       ├── PriceProgression.js   # 6-batch token pricing grid
│       └── PriceProgression.module.css
│
└── public/
    └── assets/
        ├── bg.png           # Hero background image
        ├── Frame 1.png      # Property photo (base layer)
        ├── jigsaw.png       # Jigsaw overlay (transparent PNG)
        └── arrow.png        # Orange chevron arrows
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <https://github.com/soumyatiw/GStake_UI>
cd Assignment_UI

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Assets Setup

Place the following files inside `/public/assets/` before running the app:

| File | Usage |
|---|---|
| `bg.png` | Hero section background image |
| `Frame 1.png` | Base property photo in the jigsaw card |
| `jigsaw.png` | Transparent PNG overlay on property photo |
| `arrow.png` | Orange chevron arrows in property card |

> These assets were provided as part of the original design assignment and are not included in this repository.

---

## Components

### `Navbar`
- Fixed to top, `z-index: 100`
- Transparent on load → `rgba(15,25,35,0.95)` with `backdrop-filter: blur(10px)` on scroll
- Nav links with animated underline on hover
- Orange "Sign Up" pill button with hover scale effect
- Collapses to logo + button only on mobile

### `Hero`
- Full viewport height (`min-height: 100vh`)
- `bg.png` with dark gradient overlay
- Heading fade-up animation on mount
- "Start Earning Now" CTA button with pulse keyframe animation
- Subtle background parallax on scroll (desktop only)

### `PropertyCard`
- Two-layer image stack: `Frame 1.png` (base) + `jigsaw.png` (overlay), both `position: absolute`, `object-fit: cover`
- Two floating "popped-out" puzzle piece divs with infinite float animations
- Orange CSS chevron arrows bridging the image and text panels
- AED counter animates from 0 → 165,000 using `requestAnimationFrame` with `easeOutQuad`
- `IntersectionObserver` triggers all animations on scroll into view

### `PriceProgression`
- 6-batch token grid using CSS Grid (`repeat(6, 1fr)`)
- Active batch (Batch 4) has orange border + glowing pulse animation
- "SOLD OUT" and "ACTIVE" status pills
- Staggered fade-in on scroll (80ms delay per card)
- Responsive: 6 cols → 3 cols (tablet) → 2 cols (mobile)

---

## CSS Variables

Defined in `globals.css` and used across all modules:

```css
--color-orange: #F97316;
--color-orange-dark: #EA580C;
--color-bg-dark: #0f1923;
--color-bg-card: #1a2535;
--color-bg-card-hover: #1e2d40;
--color-text-white: #ffffff;
--color-text-muted: #94a3b8;
--color-green: #22c55e;
--font-primary: 'Inter', sans-serif;
```

---

## Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| `≥ 1280px` | Full desktop layout, max-width 1200px centered |
| `768px – 1279px` | Navbar links hidden, hero font 42px, PropertyCard stacks, grid 3-col |
| `< 768px` | Hero font 32px, single column everywhere, grid 2-col, chevrons hidden |
| `< 480px` | Hero font 28px, reduced paddings, grid 2-col tight |

---

## Animations

| Animation | Trigger | Details |
|---|---|---|
| Hero text fade-up | On mount | `opacity 0→1`, `translateY 24px→0`, 0.6s |
| CTA button pulse | Always | Scale 1→1.04→1, 2s infinite |
| Navbar bg change | Scroll | `background` transition 0.3s |
| Nav link underline | Hover | `width 0→100%` via `::after`, 0.2s |
| PropertyCard slide-in | Scroll (IO) | `opacity 0→1`, `translateY 30px→0`, 0.7s |
| AED counter | Scroll (IO) | 0→165,000 in 1.8s, easeOutQuad |
| Floating puzzle pieces | Always | `translateY 0→-7px→0`, 3s infinite |
| Batch card stagger | Scroll (IO) | 80ms delay per card, fade-in |
| Active batch glow | Always | `box-shadow` pulse, 2s infinite |
| Button ripple | Click | `::after` scale + fade, 0.4s |

> All animations respect `@media (prefers-reduced-motion: reduce)` — motion is fully disabled for users who prefer it.

---

## Assignment Brief

> 1. Replicate the landing section as closely as possible
> 2. Make it fully responsive (mobile, tablet, desktop)
> 3. Add thoughtful polish — animations, micro-interactions, hover states, etc.

---

## License

Built as a UI assignment.
