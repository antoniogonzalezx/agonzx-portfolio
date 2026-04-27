# Shared DNA — agonzx + axlab

Things both brands share. Change here = change in both.

## The `{x}` monogram

The brace-x glyph is the genetic thread. Same glyph in both brands,
different colours per palette. SVG path data (Nohemi-SemiBold curves)
shared by:

- `components/servicios/Wordmark.tsx` (path-data SVG of `agonz{x}`)
- `components/servicios/FloatingPill.tsx` (`a{x}lab` lockup)
- `components/XLabMark.tsx` (`a` + monogram + `lab`)
- `components/servicios/ServiciosDiagnostico.tsx` (favicon-style mark)
- `components/Projects.tsx` axlab card title (inline HTML)

Optical adjustment for the inline HTML form: the lowercase `x` inside
the braces is shifted `top: -0.046em` to align with the brace centre.
Always preserve this when rendering inline.

## Typography

Same stack on both brands:

| Font | Weights available | Files |
|---|---|---|
| Nohemi | 400, 500, 600, 700, 800, 900 | `/public/fonts/Nohemi-*.{woff,woff2}` |
| Safiro | 500 | `/public/fonts/safiro-medium.{woff,woff2}` |
| Martian Mono | variable | `/public/fonts/MartianMono-Variable.woff2` |

Loading: `@font-face` declarations live in `styles/globals.css`. Both
brands load from the same files.

PDF caveat: `@react-pdf/renderer` does **not** support `.woff2`. Only
`.woff` weights are usable in CV PDFs. Available WOFF weights for
Nohemi: 400, 700, 800, 900. SemiBold (600) and Medium (500) only ship
`.woff2` — the PDF falls back to Bold (700) for headings.

## Easing

```
cubic-bezier(0.16, 1, 0.3, 1)
```

Exposed as `--ease` (agonzx home) and `--s-ease` (axlab/lab page). Same
curve. Use for every transition. Never linear, never arbitrary
bouncy springs.

## Anti-slop rules

Banned across both brands. These are the patterns the AI generation
default reaches for; we override.

- **No 3-column equal-card layouts.** Use bento, asymmetric grids,
  list patterns or magazine spreads.
- **No mono uppercase eyebrows.** `01 — PROJECTS` style is dead.
- **No triple parallels.** *"For real, for fun, in progress."* reads
  template-y. Two parts beats three.
- **No corporate verbs.** elevate, leverage, unleash, seamless,
  next-gen, game-changer.
- **No exclamation marks** on success states. Sent. Not Sent!.
- **No `.00` round numbers.** `120%` over `100%`, `90%+` over `90.00%`.
- **No "John Doe" placeholder content.** Real names, real company
  names, real numbers.

## Compliance

### Current reality (no NIF, no clients yet)

Antonio is **not** registered as autónomo. Neither agonzx.dev nor
axlab.es is a commercial surface yet — no products sold, no services
contracted, no invoices issued. The legal exposure today is **low**:

- **agonzx.dev** — informational portfolio. Contact form sends an
  email to a Gmail inbox; nothing stored, nothing tracked. Not subject
  to LSSI-CE (it's not a service of the information society for profit)
  but RGPD does apply to the email address you receive.
- **axlab.es** — informational website describing services. While
  there are no actual contracts, the site is **not** commercial in the
  legal sense — it's a business card.

### Minimum responsible setup (no banners, no fees)

1. **Use cookieless analytics** so the consent-banner question
   disappears entirely:
   - [Vercel Web Analytics](https://vercel.com/analytics) (free tier,
     cookieless, recommended if you deploy on Vercel)
   - [Plausible](https://plausible.io) (€9/month, EU-hosted)
   - [Fathom](https://usefathom.com) (alternative)
2. **Add a tiny privacy notice** in each site's footer linking to a
   one-page `/privacy` (agonzx.dev) and `/privacidad` (axlab.es).
   Content can be a short paragraph: "this site doesn't use tracking
   cookies; the contact form sends an email to me directly; I don't
   share or store your data".
3. **No cookie banner needed** if you don't set non-essential
   cookies. (Strictly necessary cookies — session, CSRF — never need
   consent.)

### When you formalise (first paying client)

This is the trigger to upgrade. Once you take a euro:

1. Register as **autónomo** with Hacienda + Seguridad Social, get
   your NIF.
2. Add **Aviso Legal** to axlab.es with your full identity (NIF, fiscal
   address, registration data).
3. Add **Política de Privacidad** with concrete data-controller info.
4. Add **Política de Cookies** if you use any analytics or third-party
   embeds (forms, maps, video).
5. Update agonzx.dev's `/privacy` to the same standard.

Templates: AEPD's [official guidelines](https://www.aepd.es/guias/guia-rgpd-para-empresas.pdf)
or services like [Termly](https://termly.io). Don't copy-paste — the
data-controller details must match the actual operator.

### Fines reference (only matters once commercial)

AEPD has issued fines from €20,000–€60,000 for missing cookie banners
on commercial sites. Strictly informational personal sites with no
tracking are not the typical target. Once axlab.es starts billing
clients, the risk moves into the active range.

### Bottom line for today

You don't need a cookie banner today. Add a short privacy paragraph in
the footer of both sites and pick a cookieless analytics tool when you
want metrics. Formalise everything when you onboard the first client.

## Repo conventions

- All copy strings live in `components/data.ts` (single source of truth)
- Brand tokens live in `styles/globals.css` (agonzx) and
  `styles/servicios.css` (axlab)
- Brand components in `components/servicios/` (axlab) and
  `components/` (agonzx)
- The `/lab` route serves the axlab brand from inside the agonzx
  Next.js project — pending migration to its own deployment
