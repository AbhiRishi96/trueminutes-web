import assert from "node:assert/strict";
import { appendFile, readFile, writeFile } from "node:fs/promises";
import {
  fingerprint,
  latestRelease,
  verifyDownload,
} from "./release-contract.mjs";

const mode = process.argv[2] ?? "sync";
assert.ok(
  ["sync", "probe", "verify"].includes(mode),
  "Unknown release sync mode",
);
const metadata = await latestRelease();
if (mode === "verify") {
  const built = JSON.parse(await readFile("out/release.json", "utf8"));
  assert.equal(
    fingerprint(built),
    fingerprint(metadata),
    "Release changed during build; do not deploy stale output",
  );
  console.log(`PASS: built release ${metadata.tag} is still current`);
} else {
  let changed = true;
  if (mode === "probe") {
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://trueminutes-website.trueminutes-google-oauth.workers.dev";
    const response = await fetch(new URL("/release.json", origin), {
      signal: AbortSignal.timeout(30_000),
    });
    if (response.status === 200) {
      changed = fingerprint(await response.json()) !== fingerprint(metadata);
    } else {
      assert.equal(
        response.status,
        404,
        "Cannot check deployed release; abort rather than overwrite blindly",
      );
    }
    if (process.env.GITHUB_OUTPUT)
      await appendFile(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  }
  if (mode === "sync" || changed) {
    await verifyDownload(metadata);
    await writeFile(
      "public/release.json",
      `${JSON.stringify(metadata, null, 2)}\n`,
    );
  }
  console.log(
    `${mode}: ${metadata.tag}, asset ${metadata.assetId}, changed=${changed}`,
  );
}
