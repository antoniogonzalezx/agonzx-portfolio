# axlab — studio brand

The services track. Software a medida studio for Spanish SMEs.
Internal tools, AI integrations, custom dashboards, automation.
The agonzx persona's commercial vehicle, but it stands on its own
brand identity.

## Persona

Premium, technical, cercano. Not an agency. Not "un usuario de
ChatGPT". One technical owner who builds, ships and maintains. Real
client work, real outcomes.

## Audience

- Pymes (5–50 employees) in Valdepeñas, Ciudad Real and surroundings
- Verticals: clinics, sport clubs, retail, hospitality, coworking,
  consulting
- Owner/manager profile, not IT departments
- Process pain: Excel + WhatsApp + paper

## Voice

- **Spanish (es-ES)**, informal "tú".
- Direct, sin rodeos. Pain-led. *"Las reservas llegan por teléfono,
  Instagram y Google. Los pedidos a proveedor por WhatsApp."*
- Avoid anglicisms when a Spanish word works: `automatización` over
  `workflow`, `proceso` over `pipeline`, `herramienta a medida` over
  `custom solution`.
- Pain-first, never doom. Confident, never aggressive.
- Mismo "no AI smell" rule as agonzx: no triples, no buzzwords, no
  corporate verbs.

## Tagline

> Software a medida. Un único responsable técnico.

## Palette — light editorial

Inspired by Halaska Studio, calibrated to the agonzx accent so both
brands share the same `{x}` blue.

| Token | Hex | Use |
|---|---|---|
| `--s-bg`         | `#FAFBFD` | Page background — cool near-white |
| `--s-bg-blob`    | `#F0F2F8` | Slightly deeper blob tint |
| `--s-surface`    | `#FFFFFF` | Raised card surface |
| `--s-ink`        | `#23335C` | Primary text — navy ink |
| `--s-ink-2`      | `#4E5C84` | Body text |
| `--s-ink-3`      | `#8590AB` | Captions, metadata |
| `--s-line`       | `#E5E8F0` | Dividers |
| `--s-accent`     | `#4F4FFF` | Electric blue — shared with agonzx accent (slightly more saturated for light mode) |
| `--s-accent-soft`| `#ECECFF` | Soft accent backgrounds, badge fills |

Defined in `styles/servicios.css`. **Single accent only.** Never
introduce green/orange/red. Compliance copy, error states use the
ink scale.

## Wordmark — `a{x}lab`

`a` (Nohemi text) + `{x}` (brand monogram) + `lab` (Nohemi text).
The braces wrap the central `x` glyph; the `x` inside is optically
shifted `top: -0.046em` to align with the brace centre.

Inline HTML:

```jsx
a<span style={{ color: 'var(--s-accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>lab
```

Lockup variants:
1. **Wordmark** — `a{x}lab` full lockup (hero, nav, footer, branded
   surfaces)
2. **Mark** — `{x}` alone for favicons, glass pills, avatars
3. **Compact** — `axlab` (plain text) for URLs and email handles

## Typography

Same stack as agonzx:

| Font | Weight | Use |
|---|---|---|
| Nohemi | 600 | Headings, wordmark, monumental hero |
| Safiro | 400–500 | Body, paragraphs, CTAs |
| Martian Mono | 400 | Captions, technical labels, browser-mock URLs |

Differences from agonzx in usage:
- Larger hero monumental sizes (`clamp(20vw, 22vw, 26vw)` for hero
  wordmark on /lab)
- Mono captions are slightly more present in light mode (footnote
  vibe), but **never** in uppercase eyebrows.

## CTA system

| Type | Style |
|---|---|
| Primary dark pill | bg `#0B0F14`, hover `#1E2B3C`, white text, `padding 13px 26px`, `radius 9999` |
| Outline pill | `1px solid var(--s-line)`, hover `border-color: var(--s-ink-3)` |
| Glass CTA pill (hero, footer) | `rgba(255,255,255,0.68)`, `blur(32px) saturate(200%)`, inner border, inset highlight |

Glass system shared with agonzx (different tint values per mode):

```css
backdrop-filter: blur(32px) saturate(200%);
border:          1px solid rgba(255,255,255,0.60); /* light side */
box-shadow:      0 8px 32px rgba(11,15,20,0.09),
                 inset 0 1px 0 rgba(255,255,255,0.85);
```

## Channels

- **Site (current)**: `agonzx.dev/lab` — temporary host until full
  migration
- **Site (target)**: `axlab.es` — bought, pending migration
- **Email**: `contacto@axlab.es`
- **Phone / WhatsApp Business**: `+34 711 514 735`
- **Outreach**: LinkedIn (Spanish content), Cámara de Comercio Valdepeñas,
  vertical associations

## Don'ts

- Don't speak English on axlab surfaces.
- Don't show agonzx contact info (personal email, personal phone).
- Don't use the agonzx dark palette on axlab content.
- Don't render the wordmark with the slash separator (`agonzx/lab` was
  a deprecated lockup; the brand is `a{x}lab`).
- Don't use the multi-color teal/green/orange palette of the previous
  Stack section. Single accent only.

## Migration plan (`/lab` → `axlab.es`)

1. Spin up a separate Next.js (or Astro / Remix) project on `axlab.es`
   with the `axlab` palette and components copied from
   `components/servicios/`.
2. Update `next.config.js` redirects so `agonzx.dev/lab` →
   `https://axlab.es` (301).
3. Update sitemap, JSON-LD canonical URLs, OG tags.
4. Migrate the contact email DNS so `contacto@axlab.es` is fully
   operational.
5. Add cookie / privacy policies (see `shared.md → Compliance`).
