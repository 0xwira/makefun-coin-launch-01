// main.ts — hands in the launch record for the makefun-coin-launch-01 entry.
//
// Copies LAUNCH.json (which names the pump.fun coin's mint and the signature
// of the transaction that created it) from this repository directory to the
// output directory, byte for byte. No dependencies; Node.js >= 22 standard
// library only.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// An empty env var is treated as unset, so a stray MAKEFUN_OUTPUT_DIR=""
// in the environment can never redirect the copy into the working tree.
function envDir(value: string | undefined, fallback: string): string {
  return value !== undefined && value.trim() !== "" ? value : fallback;
}

const repoDir: string = envDir(
  process.env.MAKEFUN_BOT_DIR,
  dirname(fileURLToPath(import.meta.url)),
);
const outputDir: string = envDir(process.env.MAKEFUN_OUTPUT_DIR, "/output");

const source: string = join(repoDir, "LAUNCH.json");
if (!existsSync(source)) {
  throw new Error(`LAUNCH.json not found in repository directory: ${repoDir}`);
}

mkdirSync(outputDir, { recursive: true });
const target: string = join(outputDir, "LAUNCH.json");
copyFileSync(source, target);
console.log(`Copied ${source} -> ${target}`);
