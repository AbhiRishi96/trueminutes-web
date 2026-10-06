import { test } from "node:test";
import assert from "node:assert/strict";
import {
  fingerprint,
  parseChangelog,
  releaseMetadata,
  RELEASES_REPO,
} from "./release-contract.mjs";

function fixture(version = "1.2.3") {
  return {
    id: 123,
    draft: false,
    prerelease: false,
    tag_name: `v${version}`,
    published_at: "2026-10-04T00:00:00Z",
    assets: [
      {
        id: 456,
        name: `TrueMinutes-${version}.dmg`,
        size: 1024,
        digest: `sha256:${"a".repeat(64)}`,
        updated_at: "2026-10-04T00:00:00Z",
        browser_download_url: `https://github.com/${RELEASES_REPO}/releases/download/v${version}/TrueMinutes-${version}.dmg`,
      },
    ],
  };
}

test("new stable versions select their official DMG without inheriting signing claims", () => {
  const metadata = releaseMetadata(fixture());
  assert.equal(metadata.version, "1.2.3");
  assert.equal(metadata.notarized, null);
  assert.equal(metadata.signing, "unknown");
  assert.equal(metadata.schema, 2);
  assert.deepEqual(metadata.changelog, []);
});

test("changelog bullets are parsed from GitHub release bodies", () => {
  const notes = parseChangelog(
    "### Fixed\n- **Join island** settles into a pill\n- Mic status stays visible\n\n### Notes\n- Not notarized\n",
  );
  assert.deepEqual(notes, [
    "Join island settles into a pill",
    "Mic status stays visible",
  ]);
});

test("replacement builds change identity even when version is unchanged", () => {
  const first = fixture();
  const second = structuredClone(first);
  second.assets[0].id++;
  second.assets[0].digest = `sha256:${"b".repeat(64)}`;
  assert.notEqual(
    fingerprint(releaseMetadata(first)),
    fingerprint(releaseMetadata(second)),
  );
});

test("incomplete, prerelease, mismatched, and untrusted assets fail closed", () => {
  for (const change of [
    (r) => (r.draft = true),
    (r) => (r.prerelease = true),
    (r) => (r.tag_name = "v1.2.3-beta.1"),
    (r) => (r.assets = []),
    (r) => r.assets.push(structuredClone(r.assets[0])),
    (r) => (r.assets[0].name = "TrueMinutes-0.0.1.dmg"),
    (r) => (r.assets[0].size = 0),
    (r) => (r.assets[0].digest = null),
    (r) =>
      (r.assets[0].browser_download_url = "https://untrusted.example/app.dmg"),
  ]) {
    const release = fixture();
    change(release);
    assert.throws(() => releaseMetadata(release));
  }
});

test("signing evidence never transfers to a rebuilt 0.8.4 asset", () => {
  const release = fixture("0.8.4");
  release.assets[0].id = 608506274;
  release.assets[0].digest =
    "sha256:34b60fb4cac1d6ab341cc2e16043cd4198bb9e09c73b65aa3cfb01c5b2afbbb0";
  assert.equal(releaseMetadata(release).notarized, false);
  release.assets[0].id++;
  assert.equal(releaseMetadata(release).notarized, null);
});

test("0.8.9 signing is bound to the known asset id and digest", () => {
  const release = fixture("0.8.9");
  release.assets[0].id = 615442890;
  release.assets[0].digest =
    "sha256:894477d49e2dd321462187f67eb77f65ace3689d41e87518944a20d79a1fdfc3";
  const metadata = releaseMetadata(release);
  assert.equal(metadata.signing, "internal");
  assert.equal(metadata.notarized, false);
  release.assets[0].id++;
  assert.equal(releaseMetadata(release).signing, "unknown");
});
