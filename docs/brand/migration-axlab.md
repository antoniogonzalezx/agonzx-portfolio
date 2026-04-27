# Migration to axlab.es

Goal: serve the studio brand from its own domain (`axlab.es`) while
keeping a single Next.js codebase + deployment.

## Strategy: rewrite, not duplicate

`axlab.es/*` rewrites internally to `/lab/*` (and `/privacidad` stays
top-level, accessible from both hosts). One Vercel deploy, one git
repo, two public domains.

| URL the visitor sees | Content served |
|---|---|
| `axlab.es`               | `/lab` (axlab homepage) |
| `axlab.es/privacidad`    | `/privacidad` |
| `agonzx.dev`             | `/` (agonzx personal portfolio) |
| `agonzx.dev/lab`         | `/lab` (legacy URL, still works) |
| `agonzx.dev/privacy`     | `/privacy` (English, agonzx) |
| `agonzx.dev/privacidad`  | `/privacidad` |

Canonical URLs are host-aware: when axlab.es serves the lab page, the
`<link rel="canonical">` and OG tags point to `https://axlab.es`.
Google sees axlab.es as the canonical home of the studio brand.

## Steps to deploy today

### 1. Push code

```
git add .
git commit -m "feat: axlab.es rewrite + multi-domain canonicals"
git push origin redesign/halaska   # or main, depending on branch
```

If your Vercel project tracks the branch you pushed, it auto-deploys.

### 2. Add `axlab.es` as a domain in Vercel

Vercel dashboard → your project → Settings → Domains.

Add:
- `axlab.es`
- `www.axlab.es` (optional — Vercel will redirect www to apex if you set it up)

Vercel will show DNS instructions. Two paths:

**Option A — DNS at your registrar (recommended for full control)**
- A record:    `axlab.es` → `76.76.21.21`
- CNAME record: `www.axlab.es` → `cname.vercel-dns.com`

(Exact values come from Vercel; copy them from the dashboard.)

**Option B — Point nameservers to Vercel**
- Set domain nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
- Vercel manages records for you

Option A keeps your registrar in charge of DNS — usually preferred.

### 3. Wait for DNS propagation

Usually 5–60 minutes. Vercel auto-provisions SSL once DNS is verified.

### 4. Verify

Once Vercel shows the green check next to `axlab.es`:
- Open `https://axlab.es` — should serve the lab page
- Open `https://axlab.es/privacidad` — should serve the privacy page
- Open `https://agonzx.dev/lab` — should still work (legacy URL)
- Check `view-source:https://axlab.es` and confirm
  `<link rel="canonical" href="https://axlab.es">`

### 5. Update DNS for `contacto@axlab.es`

Separate from the website — the email needs MX records. With your
email host (likely Hostinger):
- MX record: `axlab.es` → host's MX server
- SPF/DKIM/DMARC records as the host instructs

Confirm by sending an email to `contacto@axlab.es` from another
account.

## Optional next steps

### Force-redirect the legacy path

When `axlab.es` is fully live and indexed, add a 301 from
`agonzx.dev/lab` → `https://axlab.es` so search engines collapse the
two URLs and link equity flows to axlab.es. Add to `next.config.js`:

```js
async redirects() {
  return [
    // existing /servicios redirect…
    { source: '/lab',         destination: 'https://axlab.es',         permanent: true },
    { source: '/lab/:path*',  destination: 'https://axlab.es/:path*',  permanent: true },
  ];
}
```

Hold off until axlab.es is verified working and indexed. Otherwise
visitors see 301 → 404 if anything's misconfigured.

### Eventual full split

If axlab grows enough to deserve its own deployment (different release
cadence, separate analytics, distinct team), spin up a second Next.js
project on Vercel with the studio's content only. Until then, the
single-codebase rewrite saves you ~50% maintenance effort.

## What I need from you

To go live today:

1. **Vercel access** — confirm which Vercel project hosts agonzx.dev so
   I know which one to add `axlab.es` to.
2. **DNS access at the registrar where you bought axlab.es** — to add
   the A and CNAME records.
3. **Email host** — confirm where `contacto@axlab.es` is hosted (you
   said you created it; on Hostinger? If so, I can give you the exact
   DNS records once we know).

Reply with the access points (or screenshots of the dashboards if it's
easier) and we can finish the cutover today.
