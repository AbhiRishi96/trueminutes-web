import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve("out");
const release = JSON.parse(await readFile(join(root, "release.json"), "utf8"));
const origin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://trueminutes-website.trueminutes-google-oauth.workers.dev";
const pages = ["", "features", "tour", "download", "docs", "privacy", "faq"];
let links = 0;
for (const page of pages) {
  const route = `/${page ? `${page}/` : ""}`;
  const html = await readFile(join(root, page, "index.html"), "utf8");
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${route}: one h1`,
  );
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `${route}: description`,
  );
  assert.ok(
    html.includes(`rel="canonical" href="${origin}${route}"`),
    `${route}: canonical`,
  );
  assert.ok(html.includes('id="main"'), `${route}: skip destination`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href, `${origin}${route}`);
    const path = decodeURIComponent(url.pathname);
    let file = join(root, path);
    const info = await stat(file).catch(() => null);
    if (info?.isDirectory()) file = join(file, "index.html");
    else if (!info && !/\.[a-z0-9]+$/i.test(path))
      file = join(file, "index.html");
    assert.ok(file.startsWith(`${root}/`), `${route}: asset within output`);
    assert.ok(await stat(file).catch(() => null), `${route}: missing ${href}`);
    if (url.hash && file.endsWith(".html")) {
      const target =
        file === join(root, page, "index.html")
          ? html
          : await readFile(file, "utf8");
      assert.ok(
        target.includes(`id="${url.hash.slice(1)}"`),
        `${route}: missing anchor ${href}`,
      );
    }
    links++;
  }
}
const home = await readFile(join(root, "index.html"), "utf8");
assert.match(home, /"@type":"SoftwareApplication"/);
for (const file of [
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "brand/social-card.png",
  "examples/owners.md",
  "examples/decision.md",
  "examples/follow-up.md",
]) {
  assert.ok((await stat(join(root, file))).size > 0, `${file}: present`);
}
assert.equal(
  await stat(join(root, "screenshots")).catch(() => null),
  null,
  "No personal screenshots in output",
);
const download = await readFile(join(root, "download/index.html"), "utf8");
assert.ok(
  download.includes(`href="${release.downloadUrl}"`),
  "Download matches release metadata",
);
assert.ok(
  download.replace(/<!--.*?-->/gs, "").includes(`Download v${release.version}`),
  "Visible version matches download",
);
assert.ok(
  home.includes(`"softwareVersion":"${release.version}"`),
  "Structured version matches release",
);
assert.ok(
  Array.isArray(release.changelog),
  "Release metadata includes changelog",
);
assert.ok(
  Array.isArray(release.history) && release.history.length > 0,
  "Release metadata includes version history",
);
assert.ok(
  download.includes('id="changelog"'),
  "Download page exposes changelog section",
);
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const page of pages)
  assert.ok(sitemap.includes(`${origin}/${page ? `${page}/` : ""}`));
console.log(
  `PASS: ${pages.length} pages, ${links} internal links/assets, metadata, anchors, sitemap, examples, 404, and privacy boundary.`,
);
