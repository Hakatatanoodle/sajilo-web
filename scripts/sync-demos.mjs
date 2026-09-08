#!/usr/bin/env node
/**
 * Sync the real demo websites into public/demos/.
 *
 * The demos' source of truth lives OUTSIDE this repo (sibling folders/zips in
 * the parent directory, edited by the demo author). This script copies them
 * in VERBATIM — same filenames, same folder names — so the portfolio never
 * needs code changes when a demo changes.
 *
 * If a source is missing (e.g. a fresh clone on CI), the committed copy under
 * public/demos/ is kept and the script exits 0, so builds never break.
 *
 * Usage: npm run sync-demos
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(join(dirname(fileURLToPath(import.meta.url)), ".."));
const parentDir = resolve(repoRoot, "..");
const demosDir = join(repoRoot, "public", "demos");

const DEMOS = [
  {
    slug: "sajilo-hub-store",
    label: "Sajilo HUB — Clothing Store",
    kind: "folder",
    from: join(parentDir, "sajilo_hub_clothing_store_updated"),
  },
  {
    slug: "ironforge-fitness",
    label: "IronForge Fitness",
    kind: "zip",
    from: join(parentDir, "sajiloweb_gym_website_responsive.zip"),
  },
];

console.log("Syncing demo websites into public/demos/ …\n");
let failures = 0;

for (const demo of DEMOS) {
  const dest = join(demosDir, demo.slug);

  if (!existsSync(demo.from)) {
    console.warn(
      `⚠  ${demo.slug}: source not found (${demo.from}) — keeping the committed copy.`
    );
    continue;
  }

  try {
    rmSync(dest, { recursive: true, force: true });
    mkdirSync(dest, { recursive: true });

    if (demo.kind === "folder") {
      cpSync(demo.from, dest, { recursive: true });
    } else {
      execFileSync("unzip", ["-o", "-q", demo.from, "-d", dest]);
    }
    console.log(`✓  ${demo.slug} — ${demo.label} (${demo.kind} synced)`);
  } catch (err) {
    failures += 1;
    console.error(`✗  ${demo.slug}: ${err instanceof Error ? err.message : err}`);
  }
}

if (failures > 0) process.exitCode = 1;
else console.log("\nDone. The portfolio now serves the latest demo builds.");
