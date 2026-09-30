# TrueMinutes Web

Marketing site for [TrueMinutes](https://github.com/AbhiRishi96/TrueMinutes) — bot-free meeting intelligence for Apple silicon macOS.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Synthetic product UI (no live meeting screenshots)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Any Node host that runs `next start`, or export/static-compatible hosts:

1. Set Node 20+.
2. `npm ci && npm run build`
3. Start with `npm start`, or connect the repo to Vercel / Netlify / Cloudflare Pages with Next.js preset.
4. Optional: set site URL in `src/lib/site.ts` (`SITE.url`) for canonical metadata.

## Download link

Configured in `src/lib/site.ts`:

- DMG: `TrueMinutes-0.8.1.dmg` on `TrueMinutes-releases`
- Fallback: GitHub releases latest page

## Pages

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/features` | Feature detail |
| `/privacy` | Privacy model |
| `/download` | DMG + setup |
| `/docs` | Install & permissions |
| `/faq` | FAQ |
