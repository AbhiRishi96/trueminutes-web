import assert from "node:assert/strict";
import { createHash } from "node:crypto";

export const RELEASES_REPO = "AbhiRishi96/TrueMinutes-releases";
export const RELEASE_API = `https://api.github.com/repos/${RELEASES_REPO}/releases/latest`;

// Evidence is bound to the exact asset, never inherited by another version/build.
const VERIFIED_SIGNING = {
  "608506274:sha256:34b60fb4cac1d6ab341cc2e16043cd4198bb9e09c73b65aa3cfb01c5b2afbbb0":
    {
      signing: "internal",
      notarized: false,
    },
};

export function releaseMetadata(release) {
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
  return {
    schema: 1,
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
    ...signing,
  };
}

export function fingerprint(metadata) {
  return createHash("sha256").update(JSON.stringify(metadata)).digest("hex");
}

export async function latestRelease() {
  const response = await fetch(RELEASE_API, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(process.env.GH_TOKEN
        ? { Authorization: `Bearer ${process.env.GH_TOKEN}` }
        : {}),
    },
    signal: AbortSignal.timeout(30_000),
  });
  assert.equal(response.status, 200, `Release API: HTTP ${response.status}`);
  return releaseMetadata(await response.json());
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
