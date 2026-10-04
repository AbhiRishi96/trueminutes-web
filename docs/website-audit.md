# TrueMinutes website audit and implementation

Reviewed 2026-10-04. Scope: the existing Cloudflare website, all six public pages, and the customer journey from home to product exploration, privacy, download, and setup.

## Evidence and scope

The original live site was inspected in the user's Edge browser. Screenshots are local audit evidence in `/tmp/trueminutes-web-audit/`, numbered 01–06. They include personal data and must not be published or committed. The original repository was already substantially modified; this work builds on that state and does not reset or commit unrelated work.

The product evidence was inspected in `/Users/rishi/Projects/TrueMinutes`: README product contract, project.yml deployment target, CHANGELOG 0.8.4, LocalAI/LocalModelCatalog.swift, UI/Ask/AskTrueMinutesPanel.swift, Share/ShareService.swift, and Export/PDFExportService.swift. No native app files were modified.

## Journey findings

| Step | Original health | Finding | Implemented change |
| --- | --- | --- | --- |
| 1. Home (`01-home-before.png`) | Needs improvement | Small unreadable screenshots, implementation-led copy, unsupported competitor generalizations, little tangible after-call payoff. | Outcome-led headline, coherent violet/mint typography and spacing, benefit cards, routine, use cases, clear CTAs; remove competitor comparison. |
| 2. Features (`02-features-before.png`) | Needs improvement | A long engineering catalog requires visitors to translate technical details into benefits. Detail section uses a Home image rather than meeting detail. | Six outcome-led groups, in-page links, interactive demonstration, explicit compatibility limits. |
| 3. Privacy (`03-privacy-before.png`) | Needs improvement | A General settings screenshot is labeled Privacy. Copy incorrectly conflates audio upload by Drive sync with cloud AI. Contact email is unverified. | Plain-language local/sync/OAuth data flows, browser scope, at-rest limitations, cloud opt-ins, deletion boundaries; remove unverified email. |
| 4. Download (`04-download-before.png`) | Needs improvement | The main CTA bypasses requirements and installation notes. Standard model RAM/disk requirements are absent. “All releases” links only to the latest release. | CTAs route through a download page, explicit model requirements and first-launch note, versioned DMG, true all-release link, setup steps. |
| 5. Setup (`05-docs-before.png`) | Needs improvement | Technical terms, sparse troubleshooting, contents unavailable on mobile. | Numbered setup, permissions explained, browser scope, compatibility, model preparation, troubleshooting, mobile contents. |
| 6. FAQ (`06-faq-before.png`) | Needs improvement | Missing price/hardware/offline answers; blanket platform support claims. | Questions grouped around starting, recording, and data; truthful processing-time and support limits. |

## Cross-cutting fixes

- Original personal screenshots remain at their local paths but are excluded from `out/` after every build. Output scanning fails on screenshot references, unexpected audio/database/key files, and known credential patterns.
- Product exploration is explicitly an illustrative preview with fictional data. Ask answers are prewritten, with working example transcript sources and Markdown downloads. No live AI, recordings, or hosted user accounts were added.
- Product tabs support arrow keys, Home, and End with roving tab focus and tab/panel associations. Mobile navigation moves focus inside, wraps focus, closes with Escape, and restores trigger focus.
- Improved small-text contrast, visible keyboard focus, semantic headings, and reduced-motion support. Visual/DOM/keyboard checks are not a complete WCAG compliance assessment.
- Per-page canonical URLs, sitemap, robots, structured app metadata, official app icon, and a branded 1200×630 social image.
- Static security headers: CSP, frame protection, MIME sniffing protection, referrer policy, and disabled camera/microphone/geolocation access for the website. CSP permits inline scripts required by the static Next.js export; no secret-bearing dynamic backend was introduced.
- Patched Next's transitive PostCSS through a pinned override to 8.5.28 without a framework major-version migration. Clean npm install and audit pass. A repeat build reproduced a webpack filesystem snapshot revalidation crash (`WasmHash.update(undefined)`). It matches [the upstream report](https://github.com/webpack/webpack/issues/21636). Production uses webpack’s supported memory cache to avoid that failing persistence path; two consecutive builds passed without clearing the cache. Development caching is unchanged.
- Existing Worker remains static-only, on Workers Free. Website deployment does not alter native OAuth configuration, bindings, secrets, or database.

## Research references

- [Granola](https://www.granola.ai/): immediate explanation of meeting outcomes, product examples, and before/during/after framing. Also demonstrates that “bot-free” alone is not a unique competitor differentiator.
- [Raycast](https://www.raycast.com/): prominent Mac download, consistent product presentation, and a clear feature story.
- [MacWhisper](https://www.macwhisper.com/): useful reference for local Mac transcription and official-download trust.
- [Next.js metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) and [ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response): native metadata and build-time share image generation.
- [Cloudflare static headers](https://developers.cloudflare.com/workers/static-assets/headers/): static response headers without adding a backend.

## Owner decisions before broad public distribution

These are outside the website implementation:

1. Confirm a monitored public support address. The existing `support@trueminutes.app` could not be verified, so the site does not promise that mailbox works.
2. Finalize operator/contact details and legal/privacy documents. The app's own policy identifies pending legal review. This website's privacy explanation is not a substitute for that work.
3. Apple notarization is still absent in 0.8.4. The site discloses it; changing the native signing/distribution pipeline is a separate task.
4. Complete the signed live provider matrix, real-account Google refresh, and two-Mac sync qualification before making universal compatibility or end-to-end reliability claims.
5. When moving domains, rebuild with `NEXT_PUBLIC_SITE_URL=https://your-domain` so canonicals, sitemap, social metadata, and structured data agree. Keep the native OAuth hostname and Google Console privacy URL working.

Conversion improvement is a design hypothesis, not a measured uplift. No analytics were added without a product/privacy decision; no customer counts, testimonials, or performance statistics were invented.

## Final deployment and verification

Deployed to [the existing staging website](https://trueminutes-website.trueminutes-google-oauth.workers.dev/) with Cloudflare version `e097de33-559b-480f-8e2d-e1962e57e9ba`. This is a working-tree deployment based on `3096519a790d63302ab0e5fc827e96166016ebba`, not a clean committed revision. Existing dirty work was preserved. No real-domain or native OAuth changes were made.

- Production build, TypeScript check, static export check (6 pages and 219 links/assets), and `git diff --check` pass. npm audit reports zero vulnerabilities.
- `node scripts/check-live.mjs https://trueminutes-website.trueminutes-google-oauth.workers.dev` passes: all six HTML pages match the local build byte-for-byte; 25 assets load; security headers, genuine 404s, and exclusion of personal screenshot URLs are verified. The published privacy page, latest 0.8.4 release, DMG download, and existing OAuth health endpoint respond successfully.
- Browser inspection covers desktop (1466px), mobile (390px), all six mobile pages without horizontal overflow, demo tabs and keyboard navigation, meeting selection and transcripts, search and its empty state, sample Ask sources, mobile menu focus/Escape, and FAQ disclosures. No website-origin console errors were observed; unrelated extension errors were excluded. Export example files were verified over HTTP; completed browser download handling was not separately qualified.
- Final deployed screenshots and machine-readable checks are saved under ignored `artifacts/website-qa/`. These screenshots contain only fictional demo data. Original private before screenshots remain local and are not deliverables.

All six journey steps now pass the inspected content, navigation, and responsive checks. This is not a claim of complete accessibility compliance, measured conversion improvement, native app qualification, or legal approval.

## Release automation follow-up

Published release automation and the reviewed website source in `d2282fdb00d7d6669d12e022a551c0814f7a81a0`. Deployed the release-aware site locally with the existing Wrangler login as Cloudflare version `d47dd718-0aa0-4da3-8a70-b809c728597d`. Live checks pass six exact-build pages and 26 assets, including generated `/release.json`. A subsequent probe reports `changed=false`.

The latest stable official release selects the version and DMG automatically at build time. The DMG is streamed and verified against GitHub's declared size and SHA-256 digest. Asset IDs/digests detect replacement builds under the same app version. Incomplete, prerelease, mismatched, or untrusted assets fail closed. Four focused Node tests, production build, type checking, static output, and pre-deploy release verification pass. Signing evidence applies only to the exact verified 0.8.4 asset; future assets receive unverified-status guidance rather than inheriting a stale claim.

GitHub workflow checks run twice per hour, with manual/push and optional repository-dispatch triggers. [The unchanged-release dispatch run](https://github.com/AbhiRishi96/trueminutes-web/actions/runs/37178481867) passed and skipped deployment. [The initial push run](https://github.com/AbhiRishi96/trueminutes-web/actions/runs/37178439944) passed release tests/comparison and failed explicitly at the missing `CLOUDFLARE_API_TOKEN` gate. Unattended cloud deployment remains blocked until the owner configures that repository secret; no local OAuth credential was transferred to GitHub. README documents setup, schedule limits, and domain migration variables.

No native release workflow, app code, OAuth Worker, database, or domain was changed. Existing unrelated local helper/component changes remain uncommitted.
