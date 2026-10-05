import assert from "node:assert/strict";
import { createHash } from "node:crypto";

export const RELEASES_REPO = "AbhiRishi96/TrueMinutes-releases";
export const RELEASE_API = `https://api.github.com/repos/${RELEASES_REPO}/releases/latest`;
export const RELEASES_LIST_API = `https://api.github.com/repos/${RELEASES_REPO}/releases?per_page=12`;
/** Keep recent history on the download page without dumping every old release. */
export const CHANGELOG_HISTORY_LIMIT = 8;

// Evidence is bound to the exact asset, never inherited by another version/build.
const VERIFIED_SIGNING = {
  "608506274:sha256:34b60fb4cac1d6ab341cc2e16043cd4198bb9e09c73b65aa3cfb01c5b2afbbb0":
    {
      signing: "internal",
      notarized: false,
    },
  "609290204:sha256:0e858979984258fbabd5592d180671b7d2f0f570cf1f805062d2e28818e5ba87":
    {
      signing: "internal",
      notarized: false,
    },
  "611468282:sha256:25f77be57f7ca94734b0d6ac41ba2b03d35329737d33b9b4b2804dbee0b725e4":
    {
      signing: "internal",
      notarized: false,
    },
  "612200681:sha256:45029500dbfef4bf407eb945a0a46475785bc84850ae00fdaa69a4662a52d9f8":
    {
      signing: "internal",
      notarized: false,
    },
  "612676092:sha256:76d67e5eadd25e2fd0d1dc0eec3bc30d8259d0816e61281905ccc5735a3ff3cb":
    {
      signing: "internal",
      notarized: false,
    },
};

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GH_TOKEN
    ? { Authorization: `Bearer ${process.env.GH_TOKEN}` }
    : {}),
};

/** Strip markdown noise into short plain bullets for the website. */
export function parseChangelog(body, { limit = 12 } = {}) {
  if (typeof body !== "string" || !body.trim()) return [];
  const lines = [];
  let skipSection = false;
  for (const raw of body.split(/\r?\n/)) {
    const heading = raw.match(/^\s*#{1,6}\s+(.*)$/);
    if (heading) {
      skipSection = /^(notes|known issues)\b/i.test(heading[1].trim());
      continue;
    }
    if (skipSection) continue;
    const bullet = raw.match(/^\s*[-*]\s+(.*)$/);
    if (!bullet) continue;
    let text = bullet[1]
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    if (!text || /^see changelog/i.test(text)) continue;
    lines.push(text);
    if (lines.length >= limit) break;
  }
  if (lines.length) return lines;
  const fallback = body
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return fallback ? [fallback.slice(0, 220)] : [];
}

export function releaseMetadata(release, { includeHistory = false } = {}) {
  assert.equal(release.draft, false, "Release must be published");
  assert.equal(release.prerelease, false, "Release must be stable");
  assert.ok(Number.isSafeInteger(release.id), "Release ID is required");
  assert.match(
    release.tag_name,
    /^v\d+\.\d+\.\d+$/,
    "Expected a stable version tag",
  );
  assert.ok(
    Number.isFinite(Date.parse(release.published_at)),
    "Publication time is required",
  );
  const version = release.tag_name.slice(1);
  const name = `TrueMinutes-${version}.dmg`;
  const assets = release.assets.filter((asset) => asset.name === name);
  assert.equal(
    assets.length,
    1,
    "Exactly one version-matching DMG is required",
  );
  const asset = assets[0];
  assert.ok(Number.isSafeInteger(asset.id), "Asset ID is required");
  assert.ok(
    Number.isSafeInteger(asset.size) && asset.size > 0,
    "DMG must be nonempty",
  );
  assert.match(
    asset.digest,
    /^sha256:[a-f0-9]{64}$/,
    "GitHub must supply a SHA-256 digest",
  );
  const downloadUrl = `https://github.com/${RELEASES_REPO}/releases/download/${release.tag_name}/${name}`;
  assert.equal(
    asset.browser_download_url,
    downloadUrl,
    "DMG must belong to the official release",
  );
  const signing = VERIFIED_SIGNING[`${asset.id}:${asset.digest}`] ?? {
    signing: "unknown",
    notarized: null,
  };
  const changelog = parseChangelog(release.body);
  const metadata = {
    schema: 2,
    repository: RELEASES_REPO,
    releaseId: release.id,
    version,
    tag: release.tag_name,
    publishedAt: release.published_at,
    releaseUrl: `https://github.com/${RELEASES_REPO}/releases/tag/${release.tag_name}`,
    assetId: asset.id,
    assetUpdatedAt: asset.updated_at,
    assetSize: asset.size,
    assetDigest: asset.digest,
    downloadUrl,
    changelog,
    ...signing,
  };
  if (includeHistory) {
    metadata.history = [];
  }
  return metadata;
}

export function historyEntry(release) {
  assert.equal(release.draft, false, "History release must be published");
  assert.equal(release.prerelease, false, "History release must be stable");
  assert.match(
    release.tag_name,
    /^v\d+\.\d+\.\d+$/,
    "Expected a stable version tag",
  );
  const version = release.tag_name.slice(1);
  return {
    version,
    tag: release.tag_name,
    publishedAt: release.published_at,
    releaseUrl: `https://github.com/${RELEASES_REPO}/releases/tag/${release.tag_name}`,
    changelog: parseChangelog(release.body, { limit: 8 }),
  };
}

/** Fingerprint identity for deploy probe — exclude history length drift from list pagination. */
export function fingerprint(metadata) {
  const core = {
    schema: metadata.schema,
    repository: metadata.repository,
    releaseId: metadata.releaseId,
    version: metadata.version,
    tag: metadata.tag,
    publishedAt: metadata.publishedAt,
    releaseUrl: metadata.releaseUrl,
    assetId: metadata.assetId,
    assetUpdatedAt: metadata.assetUpdatedAt,
    assetSize: metadata.assetSize,
    assetDigest: metadata.assetDigest,
    downloadUrl: metadata.downloadUrl,
    changelog: metadata.changelog ?? [],
    signing: metadata.signing,
    notarized: metadata.notarized,
  };
  return createHash("sha256").update(JSON.stringify(core)).digest("hex");
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: githubHeaders,
    signal: AbortSignal.timeout(30_000),
  });
  assert.equal(response.status, 200, `Release API: HTTP ${response.status}`);
  return response.json();
}

export async function latestRelease() {
  const latest = await fetchJson(RELEASE_API);
  const metadata = releaseMetadata(latest, { includeHistory: true });
  const list = await fetchJson(RELEASES_LIST_API);
  assert.ok(Array.isArray(list), "Release list must be an array");
  const history = [];
  for (const release of list) {
    if (release.draft || release.prerelease) continue;
    if (!/^v\d+\.\d+\.\d+$/.test(release.tag_name ?? "")) continue;
    try {
      history.push(historyEntry(release));
    } catch {
      continue;
    }
    if (history.length >= CHANGELOG_HISTORY_LIMIT) break;
  }
  if (!history.length) {
    history.push({
      version: metadata.version,
      tag: metadata.tag,
      publishedAt: metadata.publishedAt,
      releaseUrl: metadata.releaseUrl,
      changelog: metadata.changelog,
    });
  }
  metadata.history = history;
  return metadata;
}

export async function verifyDownload(metadata) {
  const response = await fetch(metadata.downloadUrl, {
    signal: AbortSignal.timeout(120_000),
  });
  assert.equal(response.status, 200, "Official DMG must resolve");
  assert.ok(response.body, "DMG response must have a body");
  const hash = createHash("sha256");
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.byteLength;
    assert.ok(size <= metadata.assetSize, "DMG exceeds declared size");
    hash.update(chunk);
  }
  assert.equal(size, metadata.assetSize, "DMG size must match GitHub");
  assert.equal(
    `sha256:${hash.digest("hex")}`,
    metadata.assetDigest,
    "DMG SHA-256 must match GitHub",
  );
}
