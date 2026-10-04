import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fingerprint, latestRelease } from "./release-contract.mjs";

const origin = (process.argv[2] ?? "http://localhost:3011").replace(/\/$/, "");
const routes = [
  "/",
  "/features/",
  "/privacy/",
  "/download/",
  "/docs/",
  "/faq/",
];
const assets = new Set([
  "/brand/social-card.png",
  "/robots.txt",
  "/sitemap.xml",
  "/examples/owners.md",
  "/examples/decision.md",
  "/examples/follow-up.md",
  "/release.json",
]);
const checks = [];
for (const route of routes) {
  const response = await fetch(`${origin}${route}`);
  assert.equal(response.status, 200, `${route}: HTTP 200`);
  const html = await response.text();
  const local = await readFile(join("out", route, "index.html"), "utf8");
  assert.equal(
    createHash("sha256").update(html).digest("hex"),
    createHash("sha256").update(local).digest("hex"),
    `${route}: exact current build`,
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.ok(
    response.headers
      .get("content-security-policy")
      ?.includes("frame-ancestors 'none'"),
  );
  for (const match of html.matchAll(
    /(?:src|href)="([^"#]+\.(?:css|js|png|woff2))"/g,
  )) {
    if (match[1].startsWith("/")) assets.add(match[1]);
  }
  checks.push({
    route,
    status: response.status,
    matchesBuild: true,
    securityHeaders: true,
  });
}
const results = await Promise.all(
  [...assets].map(async (path) => {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, `${path}: asset loads`);
    assert.ok(
      (await response.arrayBuffer()).byteLength > 0,
      `${path}: nonempty`,
    );
    return { path, status: response.status };
  }),
);
for (const path of [
  "/not-a-page/",
  "/screenshots/meetings-library.png",
  "/screenshots/settings.png",
]) {
  assert.equal(
    (await fetch(`${origin}${path}`)).status,
    404,
    `${path}: genuine 404`,
  );
}
if (origin.startsWith("https://")) {
  const policy = await fetch(
    "https://abhirishi96.github.io/TrueMinutes-releases/privacy.html",
  );
  assert.equal(policy.status, 200, "Published privacy policy works");
  const release = await latestRelease();
  const deployed = await fetch(`${origin}/release.json`);
  assert.equal(deployed.status, 200);
  assert.equal(
    fingerprint(await deployed.json()),
    fingerprint(release),
    "Deployed release matches GitHub",
  );
  const download = await fetch(release.downloadUrl, { method: "HEAD" });
  assert.equal(download.status, 200, "Official DMG resolves");
  const health = await fetch(
    "https://trueminutes-oauth.trueminutes-google-oauth.workers.dev/health",
  );
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok" });
}
await mkdir("artifacts/website-qa", { recursive: true });
await writeFile(
  `artifacts/website-qa/${origin.startsWith("https:") ? "live" : "local"}-checks.json`,
  JSON.stringify(
    {
      origin,
      pages: checks,
      assets: results,
      notFound: true,
      personalScreenshotsExcluded: true,
    },
    null,
    2,
  ),
);
console.log(
  `PASS ${origin}: ${routes.length} exact-build pages, ${assets.size} assets, security headers, 404s, and excluded personal screenshots${origin.startsWith("https:") ? ", release/download/privacy links, OAuth health" : ""}.`,
);
