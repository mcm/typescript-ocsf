import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * OCSF versions to download.
 * Each entry maps a version tag to the directory name used locally.
 */
const OCSF_VERSIONS: Array<{ version: string; tag: string }> = [
  { version: "1.5.0", tag: "v1.5.0" },
  { version: "1.6.0", tag: "v1.6.0" },
  { version: "1.7.0", tag: "v1.7.0" },
];

const SCHEMA_REPO = "https://github.com/ocsf/ocsf-schema.git";
const SCHEMAS_DIR = resolve(__dirname, "..", "schemas");

/**
 * Download OCSF schema by cloning the repo at the given tag.
 * This gives us the raw schema files (events/, objects/, dictionary.json, etc.)
 * which the parser knows how to read.
 */
function downloadVersion(version: string, tag: string): void {
  const versionDir = join(SCHEMAS_DIR, `v${version}`);

  if (existsSync(versionDir)) {
    console.log(`  [skip] v${version} already exists at ${versionDir}`);
    return;
  }

  console.log(`  [clone] v${version} from ${SCHEMA_REPO} @ ${tag}`);
  mkdirSync(versionDir, { recursive: true });

  execSync(`git clone --depth 1 --branch ${tag} ${SCHEMA_REPO} ${versionDir}`, { stdio: "pipe" });

  console.log(`  [done] v${version}`);
}

function main(): void {
  console.log(`Downloading OCSF schemas to ${SCHEMAS_DIR}\n`);
  mkdirSync(SCHEMAS_DIR, { recursive: true });

  let failures = 0;
  for (const { version, tag } of OCSF_VERSIONS) {
    try {
      downloadVersion(version, tag);
    } catch (err) {
      console.error(`  [FAIL] v${version}: ${err}`);
      failures++;
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} download(s) failed.`);
    process.exit(1);
  }

  console.log("\nAll schemas downloaded successfully.");
}

main();
