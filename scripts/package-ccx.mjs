import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const output = resolve(root, "release/face-stabilizer.ccx");

if (!existsSync(resolve(dist, "manifest.json"))) {
  throw new Error("dist/manifest.json is missing. Run npm run build first.");
}

mkdirSync(dirname(output), { recursive: true });
rmSync(output, { force: true });

execFileSync("zip", ["-qr", output, "."], {
  cwd: dist,
  stdio: "inherit",
});

console.log(`Created ${output}`);
