# agonzx — personal brand

The personal track. Senior iOS engineer at UserTesting, ex-XING. Public
face for hiring conversations, indie work, technical reputation.

## Persona

A senior iOS engineer who pairs daily with AI agents (Claude Code,
Codex, Cursor) but owns the result personally. Embedded in product, not
just shipping tickets. Quiet, specific, dry humour. No buzzwords.

## Audience

- Hiring managers at product companies (Revolut, Spotify, N26, Linear)
- Tech recruiters scanning for senior iOS
- Other engineers — open source, conversation
- Eventual indie app users

## Voice

- **English** as default. Spanish only inside `/lab` (axlab) context.
- Sentence case. **Never** SCREAMING CAPS for headlines or section
  titles. Never `Title Case On Every Word` either.
- Specific over general. "Apply rates ↑120% on a marketplace at 20M
  users", not "improved KPIs significantly".
- Drop AI-tells: triple parallels (*"X, Y and Z"*), corporate verbs
  (*elevate, leverage, unleash, seamless, next-gen*), exclamation marks
  on success states.
- Sentence fragments are fine when they serve. *"In progress."*

## Palette — dark mode

Brand surfaces live on navy. Single accent (electric blue). One reserved
cinematographic teal `--accent-glow` used sparingly (one element max
per section).

| Token | Hex | Use |
|---|---|---|
| `--bg`         | `#0B0F1A` | Primary background |
| `--bg2`        | `#11182A` | Slightly elevated bg |
| `--card`       | `#121A2E` | Card surfaces |
| `--elev`       | `#1A2340` | Hover elevation |
| `--accent`     | `#6B6BFF` | Primary accent (electric blue) |
| `--accent-g`   | `rgba(107,107,255,0.22)` | Accent glow ring |
| `--accent-s`   | `rgba(107,107,255,0.08)` | Accent soft fill |
| `--accent-glow`| `#4FFFE0` | Reserved cinematic teal — atmosphere only |
| `--white`      | `#E8ECF7` | Primary text |
| `--t2`         | `#A8B3D1` | Body text |
| `--t3`         | `#6B7599` | Captions, muted |
| `--brd`        | `rgba(255,255,255,0.08)` | Dividers |

Defined in `styles/globals.css`. **Never** introduce a second saturated
accent. Multi-color glow violates the rule.

## Wordmark — `agonz{x}`

The signature. Render with the brand `Wordmark` SVG component
(`components/servicios/Wordmark.tsx`) or as inline HTML:

```jsx
agonz<span style={{ color: 'var(--accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>
```

The lowercase `x` inside the braces is shifted `top: -0.046em` so the
optical centre aligns with the brace centre.

Lockup variants:
1. **Wordmark** — `agonz{x}` for headers, hero, CV, footer
2. **Mark** — `{x}` alone for favicons, avatar shapes, monogram uses
3. **Compact** — `agonzx` (no braces) for plain text contexts (URLs,
   email signatures, mailto handles)

## Typography

| Font | Weight | Use |
|---|---|---|
| Nohemi | 600 (SemiBold) | Headings, wordmark, name |
| Nohemi | 400 (Regular) | Subtitles, role line |
| Safiro | 500 (Medium) | Body, paragraphs, CTAs |
| Martian Mono | 400 | Reserved. Use sparingly — section indices,
  technical labels. **Never** for eyebrows. |

Files in `/public/fonts/`. PDFs use the `.woff` variants (`@react-pdf`
does not support `.woff2`).

## Channels

- **Site**: `agonzx.dev` (this repo, dark home)
- **CV**: `agonzx.dev/cv` (paper-light, agonz{x} brand)
- **LinkedIn**: `linkedin.com/in/antoniogonzalezvaldepenas`
- **GitHub**: `github.com/antoniogonzalezx`
- **Email**: `antoniogonzalezvaldepenas.jobs@gmail.com`

## Don'ts

- Don't use the agonzx wordmark on axlab content. They are different
  brands.
- Don't speak Spanish in agonzx surfaces (except quoted brand names).
- Don't use teal/cyan as a primary accent. Reserved for atmospheric
  flourishes only.
- Don't show contact info that belongs to axlab (the lab phone,
  contacto@axlab.es).
