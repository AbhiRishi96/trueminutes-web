# TrueMinutes website deployment handoff

Prepared: 2026-10-04. Give this file to the coding assistant working in the website repository.
All identifiers below are public configuration. This file contains no credentials.

## Objective and constraints

Deploy the existing TrueMinutes website on the owner's existing Cloudflare account using
**Workers Free + Static Assets**. Spending must remain **₹0**. Do not upgrade plans, add payment
details, purchase a domain, or enable paid products. Prefer a static build for the public website.
If the application requires server-side rendering, paid APIs, a database, or authenticated user
features, identify those requirements before choosing an additional service. Do not silently
turn the marketing website into a new hosted application backend.

Inspect the website repository's instructions, package manifest, framework, build command,
and output directory before making changes. Preserve its current design and functionality.

## Existing Cloudflare setup

| Item | Value |
| --- | --- |
| Account ID | `2f4f5ac01cb8c8c8e5bfa8cd54400237` |
| Dashboard | https://dash.cloudflare.com/2f4f5ac01cb8c8c8e5bfa8cd54400237/home |
| Account workers.dev subdomain | `trueminutes-google-oauth.workers.dev` |
| Existing OAuth Worker | `trueminutes-oauth` |
| Existing OAuth origin | https://trueminutes-oauth.trueminutes-google-oauth.workers.dev |
| Existing Google redirect URI | `https://trueminutes-oauth.trueminutes-google-oauth.workers.dev/oauth/callback` |
| Existing broker source | https://github.com/AbhiRishi96/TrueMinutes/tree/main/services/google-oauth |

The Workers Free plan was verified during setup. Recheck the current plan before deployment.
The account subdomain is an automatically supplied Cloudflare hostname, not a purchased domain.

## Recommended deployment: a separate website Worker

Create a **new** Worker named `trueminutes-website`. Its expected URL is:

`https://trueminutes-website.trueminutes-google-oauth.workers.dev`

This website Worker has not been created; use the URL returned by the actual deployment as
authoritative. Check for an existing Worker with the same name before deploying. Do not overwrite
an unrelated existing deployment. If the name conflicts, choose another website-specific name.

Keep the existing OAuth Worker independent. Website deployments must not rename it, change its
origin, alter its callback, rotate its encryption key, overwrite its secrets, apply its D1
migrations, or change its request logging. The native app and Google Web OAuth client already
depend on that exact origin.

Do not rename the account's workers.dev subdomain for branding: doing so would change the
existing OAuth hostname. A purchased custom domain can be added later as a separate task.

## Static website configuration

For a build that writes HTML/CSS/JS/images into `dist`, add this to the **website repository's**
`wrangler.jsonc`:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "trueminutes-website",
  "account_id": "2f4f5ac01cb8c8c8e5bfa8cd54400237",
  "compatibility_date": "2026-10-04",
  "workers_dev": true,
  "preview_urls": false,
  "send_metrics": false,
  "observability": { "enabled": false },
  "logpush": false,
  "assets": {
    "directory": "./dist"
  }
}
```

This is an assets-only Worker: no `main` script, D1 binding, Google client secret, or OAuth code
is needed. Adjust the output directory to the actual framework's static build output. For
example, an existing Next.js static export may use `out`; do not assume every Next.js app can
be exported without checking its server-dependent features.

For a client-side SPA that intentionally serves its application shell for unknown routes,
add `"not_found_handling": "single-page-application"` under `assets`. For a marketing site with
generated HTML pages, keep normal HTML routing and a real 404 page. Verify direct navigation
to privacy, terms, and other deep links; do not use an SPA fallback merely to hide missing pages.

Use the repository's package manager and lockfile. The native app's broker currently uses
Node 24 and Wrangler 4.147.0; Wrangler belongs in development dependencies. Use a compatible,
pinned version and preserve reproducible installs.

## Local build and deployment

On the same Mac, Wrangler has an existing login whose credential file is encrypted with a
key held in macOS Keychain. Do not read, print, copy, or commit it. A different machine needs
its own owner-approved login.

Example commands for an npm website repository:

```sh
# Only if Wrangler is not already present in the website repository:
npm install --save-dev --save-exact wrangler@4.147.0

npm ci
npm run build

# Verify the exact account; this prints account metadata, not credential values.
WRANGLER_SEND_METRICS=false npx wrangler whoami

# Validate/upload preparation without changing the remote website.
WRANGLER_SEND_METRICS=false npx wrangler deploy --dry-run

# Deploy only after checking Workers Free and the website Worker name.
WRANGLER_SEND_METRICS=false npx wrangler deploy
```

If login is missing, ask the owner to authorize Wrangler for this account. The existing
deployment login uses `account:read`, `user:read`, and `workers_scripts:write` plus `d1:write`
for the separate OAuth service. Static website deployment does not need D1 access. Retain
Keychain-backed credential storage with `--use-keyring`; do not request broad default scopes
without a concrete need. Never paste the browser callback URL into chat: it contains a login code.

Only upload the built public asset directory. Never deploy the repository root, `.env` files,
downloaded OAuth JSON credentials, private logs, transcripts, recording files, tokens, or keys.
Remember that frontend environment variables included in JavaScript bundles are public.

## Product links and disclosures

- Current released macOS app: https://github.com/AbhiRishi96/TrueMinutes-releases/releases/tag/v0.8.4
- Stable latest-release landing page: https://github.com/AbhiRishi96/TrueMinutes-releases/releases/latest
- Release repository: https://github.com/AbhiRishi96/TrueMinutes-releases
- Current public privacy page: https://abhirishi96.github.io/TrueMinutes-releases/privacy.html
- App source: https://github.com/AbhiRishi96/TrueMinutes

Link the website's download button to the latest-release landing page, or deliberately manage
and verify a direct versioned download link. Avoid a hardcoded build that becomes stale.

Keep product claims accurate: local-first meeting storage; Google Drive sync is optional and
encrypted; audio file upload is not enabled by the current sync implementation. Google sign-in
uses a Cloudflare service that exchanges authorization codes and refresh tokens. It handles
token plaintext transiently, holds short-lived encrypted handoff results in D1, and does not
receive meeting content. D1 managed backups may retain deleted encrypted handoff ciphertext.
Do not claim that every token always remains exclusively on the device.

The newly published macOS version is 0.8.4. Its build, secret scan, and Sparkle signature were
verified; real account login/refresh and two-Mac sync were still awaiting validation at handoff.
Do not claim those end-to-end tests have passed.

Publish a truthful website privacy policy with owner-reviewed business/contact details. Do not
invent a legal entity or contact email. Keep the current Google Console privacy URL working.
Changing Google branding links or submitting verification is a separate owner-coordinated task;
it is not required merely to deploy a static website on its own Worker.

## OAuth separation: important for a web app

The existing broker implements native-app Calendar/Drive connections, not a general website
login system. Its API does not establish browser cookies or website user sessions. It is not
configured as a cross-origin browser API. Do not add permissive CORS, put Google credentials in
frontend code, reuse native refresh receipts as web sessions, or attach website users to its D1
tables. If the website needs user authentication, design that boundary as a separate task.

Leave these existing broker routes intact:

```text
GET  /health
GET  /oauth/callback
POST /v1/start
POST /v1/result/{transaction}
POST /v1/refresh
```

## If the owner later requires the same exact hostname

Workers can serve static assets alongside a Worker script, so the website could be placed on
the existing OAuth origin. This is an alternative requiring coordinated changes in the native
app repository, not the recommended independent deployment above.

That alternative must preserve OAuth routing ahead of any SPA fallback, for example using
`assets.run_worker_first` patterns for `/health`, `/oauth/*`, and `/v1/*`; preserve the broker
config, secrets, D1 binding, cron, and canonical origin. Never replace the broker configuration
with the website-only example. Verify callback, polling, refresh, and unknown-route behavior
before publishing a combined deployment. Do not implement this alternative without an explicit
request to combine the services.

## Free-tier behavior

Directly served Workers static assets have free, unlimited requests under current Cloudflare
documentation. Executing a Worker script, including SSR/API code, uses the Workers request and
CPU quotas. Free dynamic request allowance is shared across Workers in the account, so new
website backend traffic could compete with the OAuth service. Static hosting avoids that
unnecessary dynamic workload. Free limits are service ceilings, not a promise of unlimited
SSR/backend capacity. Do not upgrade to a paid plan to solve a quota problem.

Sources: [static assets billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/),
[Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

## Deployment verification and rollback

Before calling the task complete:

1. Run the website's build and relevant existing tests; scan the public output for credentials
   and inspect exactly which files will be uploaded.
2. Confirm the correct Cloudflare account and Workers Free plan, and record the deployment's
   actual public URL and Worker version ID.
3. Check HTTPS homepage, CSS/JS/images, desktop/mobile rendering, direct deep links, 404 behavior,
   privacy/terms links, and the macOS download link. Capture screenshots of the deployed site.
4. Verify `https://trueminutes-oauth.trueminutes-google-oauth.workers.dev/health` still returns
   HTTP 200 with `{"status":"ok"}`. Do not initiate real-user OAuth exchanges just to test the site.
5. Record the website Git commit and deployment ID. Report whether the website is static-only
   or executes backend code, and any validation that remains outstanding.

If a website deployment fails, roll back **only `trueminutes-website`** using that Worker's
deployment history. Do not roll back, delete, rename, or rotate anything in `trueminutes-oauth`.

For later GitHub deployment automation, first verify the correct website repository and
successful manual deployment. Store a narrowly scoped Cloudflare deployment credential only
in GitHub Actions secrets, never in a workflow body or frontend variable. Account IDs and
website URLs can be repository variables. The owner creates/authorizes any new credential.
Do not reuse or expose the native app's Google/Sparkle/signing secrets.

## Official reference links

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Static website setup](https://developers.cloudflare.com/workers/static-assets/get-started/)
- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Static asset bindings and routing](https://developers.cloudflare.com/workers/static-assets/binding/)
- [workers.dev hostname structure](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)

## Ready-to-use instruction for the website coding assistant

> Read this handoff and the website repository's instructions. Prepare and deploy the current
> TrueMinutes website to a separate `trueminutes-website` Worker on the specified existing
> Cloudflare account, staying entirely on Workers Free. Prefer the existing framework's static
> build; verify its actual output directory and routing. Preserve the deployed native OAuth
> Worker, callback, secrets, and database. Keep secrets and private files out of public assets.
> Verify the real deployed website, download/privacy links, mobile layout, and unchanged OAuth
> health endpoint. Report the public website URL, commit, deployment ID, checks, and remaining
> blockers. If owner authentication or new credentials are required, hand those steps to the owner.
