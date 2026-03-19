# [X] agonzx — Portfolio

> Antonio González · iOS Engineer · Code Vibing

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> **Note**: ReactBits components are included directly in `components/reactbits/`.
> No CLI install needed — all source files are bundled in the project.
> If you get peer dependency warnings, use `npm install --legacy-peer-deps`.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Fonts**: N27 (display) + Safiro Medium (body) — custom webfonts in `/public/fonts/`
- **Components**: [ReactBits](https://reactbits.dev) — animated UI components
- **3D**: Three.js + react-three-fiber (for Lanyard card)
- **Deploy**: Vercel

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0B0F14` | Primary background |
| `--accent` | `#3DF2E0` | Primary accent (cyan/turquoise) |
| `--white` | `#E8ECF0` | Text primary |
| `--text-2` | `#8A95A8` | Text secondary |
| `--text-3` | `#4A556A` | Text muted |

## ReactBits Integration Guide

After running `npm run setup-reactbits`, the components will be downloaded to your project. Here's where each one goes:

### 1. Hero Background — Grainient
**File**: `components/Hero.tsx`
```tsx
import Grainient from '@/reactbits/Backgrounds/Grainient/Grainient';

// Replace <GrainientPlaceholder /> with:
<Grainient
  speed={0.5}
  colors={['#0B0F14', '#0E1219', '#1A2230', '#3DF2E0']}
  noiseIntensity={1.2}
  style={{ position: 'absolute', inset: 0, zIndex: 0 }}
/>
```

### 2. Hero Subtitle — RotatingText
**File**: `components/Hero.tsx`
```tsx
import RotatingText from '@/reactbits/TextAnimations/RotatingText/RotatingText';

// Replace <RotatingTextPlaceholder /> with:
<RotatingText
  texts={['Code Vibing', 'Code Anything', 'Ship Fast', 'Build Better', 'Stay Curious']}
  mainClassName="rotating-text"
  staggerFrom="last"
  staggerDuration={0.025}
  rotationInterval={3000}
/>
```

### 3. Experience Cards — ScrollStack + SpotlightCard
**File**: `components/Experience.tsx`
```tsx
import { ScrollStack, ScrollStackItem } from '@/reactbits/Components/ScrollStack/ScrollStack';
import SpotlightCard from '@/reactbits/Components/SpotlightCard/SpotlightCard';

<ScrollStack>
  {EXPERIENCE.map((exp, i) => (
    <ScrollStackItem key={i}>
      <SpotlightCard spotlightColor="rgba(61, 242, 224, 0.1)">
        <ExpCard {...exp} />
      </SpotlightCard>
    </ScrollStackItem>
  ))}
</ScrollStack>
```

### 4. Project Cards — SpotlightCard
**File**: `components/Projects.tsx`
```tsx
import SpotlightCard from '@/reactbits/Components/SpotlightCard/SpotlightCard';

// Wrap each project card:
<SpotlightCard spotlightColor="rgba(61, 242, 224, 0.1)">
  ...existing card content...
</SpotlightCard>
```

### 5. Tech Stack — VariableProximity + LogoLoop
**File**: `components/Stack.tsx`
```tsx
import VariableProximity from '@/reactbits/TextAnimations/VariableProximity/VariableProximity';
import LogoLoop from '@/reactbits/Animations/LogoLoop/LogoLoop';

// The current ProximityWall is a manual implementation.
// You can replace it with VariableProximity for the variable font version,
// or keep the current one which works great.

// Add logo loop below the wall:
<LogoLoop logos={TECH_LOGOS} speed={30} />
```

### 6. About — ProfileCard
**File**: `components/About.tsx`
```tsx
import ProfileCard from '@/reactbits/Components/ProfileCard/ProfileCard';

// Replace the photo placeholder with:
<ProfileCard
  name="Antonio González"
  title="iOS Engineer"
  handle="agonzx"
  avatarUrl="/avatar.jpg"
  ...
/>
```

### 7. Glass Effects — GlassSurface
**File**: Any component
```tsx
import GlassSurface from '@/reactbits/Components/GlassSurface/GlassSurface';

// Wrap any element with iOS 26-style glass:
<GlassSurface>
  ...content...
</GlassSurface>
```

### 8. Lanyard 3D Card
**File**: Create `components/LanyardCard.tsx`
```tsx
import Lanyard from '@/reactbits/Components/Lanyard/Lanyard';

// This requires Three.js + react-three-fiber + rapier
// Place it in the hero or about section:
<Lanyard
  // Front face: [X] logo
  // Back face: ANTONIO GONZÁLEZ
  // Both in N27 font
  // Customize the texture in the Lanyard component source
/>
```

## Project Structure

```
agonzx-portfolio/
├── app/
│   ├── layout.tsx          # Root layout (metadata, fonts)
│   └── page.tsx            # Main page (composes sections)
├── components/
│   ├── data.ts             # All site content (single source of truth)
│   ├── Nav.tsx             # Navigation bar
│   ├── Hero.tsx            # Hero section (Grainient + RotatingText)
│   ├── About.tsx           # About section (ProfileCard)
│   ├── Experience.tsx      # Experience (ScrollStack + SpotlightCard)
│   ├── Projects.tsx        # Projects grid (SpotlightCard)
│   ├── Stack.tsx           # Tech stack (VariableProximity + LogoLoop)
│   ├── Contact.tsx         # Contact section
│   ├── Footer.tsx          # Footer
│   ├── FluidCursor.tsx     # Glass-style cursor
│   └── SectionHeader.tsx   # Reusable section header
├── public/
│   ├── fonts/              # N27 + Safiro webfonts
│   └── logos/              # Tech logos for LogoLoop (add SVGs here)
├── styles/
│   └── globals.css         # Global styles, CSS vars, font-face
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

## Domain

Recommended: **agonzx.dev** (~14€/year)

## Notes

- All content is in `components/data.ts` — edit there to update text, links, etc.
- Font files are in `public/fonts/` — N27 for display, Safiro for body
- The fluid cursor is disabled on touch devices automatically
- Glass effects use `backdrop-filter` which requires modern browsers
- The Lanyard component needs Three.js — it's the heaviest dependency
- All ReactBits components come with 4 variants (JS-CSS, JS-TW, TS-CSS, TS-TW)
