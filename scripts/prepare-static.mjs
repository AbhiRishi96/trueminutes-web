import { rm, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
// Preserve original captures locally, but never publish the private meeting screenshots.
await rm("out/screenshots", { recursive: true, force: true });
const forbidden = [
  /\/screenshots\//,
  /support@trueminutes\.app/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /AIza[0-9A-Za-z_-]{35}/,
  /gh[pousr]_[0-9A-Za-z]{30,}/,
];
let count = 0;
async function inspect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await inspect(path);
    else {
      if (
        /(?:\.env|\.pem|\.key|\.sqlite|\.db|\.caf|\.wav|\.mp3|\.zip|\.map)$/.test(
          entry.name,
        )
      )
        throw new Error(`Unexpected public asset: ${path}`);
      if (/\.(?:html|txt|js|json|xml|css)$/.test(entry.name)) {
        const text = await readFile(path, "utf8");
        if (forbidden.some((pattern) => pattern.test(text)))
          throw new Error(`Forbidden content in public output: ${path}`);
      }
      count++;
    }
  }
}
await inspect("out");
console.log(`Verified ${count} public assets; personal screenshots excluded.`);
