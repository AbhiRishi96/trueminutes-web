# TrueMinutes Web

The static marketing website for TrueMinutes, a local-first meeting notes app for Apple silicon Mac.

Next.js 15 App Router, React, TypeScript, Tailwind CSS 4, and Cloudflare Workers Static Assets. No hosted accounts, AI API calls, meeting uploads, analytics, or database.

## Develop and verify

```bash
npm ci
npm run dev
```

For the production artifact:

```bash
npm run build
npm run typecheck
npm run check:static
npm audit --audit-level=moderate
```

Build writes `out/`. `prepare-static.mjs` excludes the original personal screenshots and checks the public asset boundary. `check:static` validates the public pages, internal links, anchors, metadata, sitemap, examples, and 404 output.

To preview the actual static export, including Cloudflare headers:

```bash
WRANGLER_SEND_METRICS=false npx wrangler dev --port 3011 --inspector-port 9231
```

Do not run `next build` and `next dev` simultaneously: both use `.next/`. Production builds use the supported in-memory webpack cache to avoid a reproducible Next 15 filesystem snapshot failure. Development caching is unchanged. `npm run start` previews the static export through Wrangler.

## Product content

- Release metadata: generated `public/release.json`, consumed by `src/lib/site.ts`. Every build fetches the latest stable official GitHub release, verifies the DMG's size and SHA-256, and stores release notes plus a short recent changelog history for the download page. No manual version or DMG bump is needed.
- Product preview: `ProductDemo` / `ProductPreview`, with fictional data from `src/lib/mock-data.ts`.
- Ask sample downloads: `public/examples/`; update these alongside the sample answers.
- Social image: `public/brand/social-card.png`. Regenerate with `node scripts/generate-social.mjs`.
- Audit, sources, and remaining owner decisions: `docs/website-audit.md`.

Original `public/screenshots/` assets contain personal meeting data. Keep them local; never upload them manually. They are excluded from every production build.

## Deploy

Read `cloudflare-website-deployment-handoff.md`. Use only `trueminutes-website`, the existing account, and Workers Free. Preserve `trueminutes-oauth` and its hostname, secrets, and database.

```bash
npm run build
npm run typecheck
npm run check:static
WRANGLER_SEND_METRICS=false npx wrangler whoami
npm run deploy:dry
WRANGLER_SEND_METRICS=false npx wrangler deploy
```

Verify the deployed pages, HTTP 404, assets, headers, official download, and the independent OAuth `/health` endpoint.

## Automatic release updates

Production deploys run on the **TrueMinutes self-hosted macOS runner** (`trueminutes`, labels `self-hosted` + `macOS`) from private repo `AbhiRishi96/TrueMinutes`, workflow **Sync marketing website**. That job checks out this public website repo, rebuilds `release.json` from `AbhiRishi96/TrueMinutes-releases`, and deploys Worker `trueminutes-website` only.

It starts when:

- **Release Sparkle update** on TrueMinutes succeeds (`workflow_run`)
- A GitHub Release is published or edited on TrueMinutes-releases (optional `WEBSITE_SYNC_TOKEN` dispatch)
- Twice-hourly schedule on TrueMinutes
- Manual **workflow_dispatch** on TrueMinutes

Canonical workflow files live in `docs/ci/`. GitHub-hosted Actions on this public repo stay as a fallback and **skip deploy** unless `CLOUDFLARE_API_TOKEN` is set here. Prefer adding that token on **TrueMinutes** (not this public repo) so the self-hosted runner can deploy. Never copy Wrangler's local OAuth token into GitHub or commit a credential.

GitHub personal-account runners are per-repository. The existing `trueminutes` runner is registered on TrueMinutes, so website production CI lives there instead of registering a second runner on this repo.

Signing evidence is bound to exact known asset ID and digest pairs in `scripts/release-contract.mjs`. New or replaced assets default to “not verified” and release-specific install guidance; they never inherit an old signing/notarization claim. This automation verifies GitHub artifact integrity, not Apple notarization or native app behavior.

Commands:

```bash
npm run test:release
npm run release:probe     # Compare latest release with the public website
npm run release:verify    # Ensure out/release.json is still the latest before deployment
npm run check:live -- https://trueminutes-website.trueminutes-google-oauth.workers.dev
```

When moving domains, set the repository variable `WEBSITE_ORIGIN` to the new HTTPS origin alongside the domain migration. It drives build metadata, polling, and post-deploy checks. Until then it defaults to the staging address.

## Custom domain migration

Set the public origin at build time:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run check:static
```

Use an HTTPS origin without a path. This updates canonicals, sitemap, robots, Open Graph URLs, and structured data. Add the custom domain only to the website Worker; do not rename the account's workers.dev subdomain or the native OAuth Worker. Verify domain ownership, DNS, HTTPS, and redirects independently before switching traffic.

## Routes

`/`, `/features/`, `/tour/`, `/download/`, `/docs/`, `/privacy/`, `/faq/`, `/robots.txt`, `/sitemap.xml`, and a custom 404 page.
