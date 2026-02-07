import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  emitEnumsBarrel,
  emitEventsBarrel,
  emitObjectsBarrel,
  emitTopLevelIndex,
  emitVersionBarrel,
} from "./lib/barrel-emitter.js";
import { emitEnumFile, emitEventEnumFile } from "./lib/enum-emitter.js";
import { emitEventFile } from "./lib/event-emitter.js";
import { toFileName } from "./lib/naming.js";
import { emitObjectFile } from "./lib/object-emitter.js";
import { parseOcsfSchema } from "./lib/parser.js";
import { resolveSchema } from "./lib/resolver.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VERSIONS = [
  { version: "1.5.0", slug: "v1_5" },
  { version: "1.6.0", slug: "v1_6" },
  { version: "1.7.0", slug: "v1_7" },
];

const LATEST_SLUG = "v1_7";

const ROOT = resolve(__dirname, "..");
const SRC_DIR = join(ROOT, "src");
const SCHEMAS_DIR = join(ROOT, "schemas");

function main(): void {
  console.log("typescript-ocsf code generation\n");

  for (const { version, slug } of VERSIONS) {
    console.log(`\n=== Generating ${version} (${slug}) ===`);

    const schemaDir = join(SCHEMAS_DIR, `v${version}`);
    if (!existsSync(schemaDir)) {
      console.error(`  Schema not found: ${schemaDir}. Run 'npm run download' first.`);
      process.exit(1);
    }

    // Parse
    console.log("  Parsing schema...");
    let schema = parseOcsfSchema(schemaDir, version);

    // Resolve
    console.log("  Resolving inheritance and detecting cycles...");
    schema = resolveSchema(schema);

    const versionDir = join(SRC_DIR, slug);
    const objectsDir = join(versionDir, "objects");
    const eventsDir = join(versionDir, "events");
    const enumsDir = join(versionDir, "enums");

    // Clean and create directories
    for (const dir of [objectsDir, eventsDir, enumsDir]) {
      if (existsSync(dir)) rmSync(dir, { recursive: true });
      mkdirSync(dir, { recursive: true });
    }

    // Emit enums (shared)
    console.log(`  Emitting ${schema.enums.size} shared enums...`);
    for (const enumDef of schema.enums.values()) {
      const fileName = `${toFileName(enumDef.name)}.ts`;
      writeFileSync(join(enumsDir, fileName), emitEnumFile(enumDef));
    }

    // Emit per-event enums (activity_id overrides)
    for (const event of schema.events.values()) {
      for (const attr of event.attributes) {
        if (
          attr.name === "activity_id" &&
          attr.enumValues &&
          attr.enumValues.length > 2 // More than just UNKNOWN + OTHER
        ) {
          const content = emitEventEnumFile(event.className, attr.name, attr.enumValues);
          const fileName = `${toFileName(event.className)}_activity_id.ts`;
          writeFileSync(join(enumsDir, fileName), content);
        }
      }
    }

    // Emit objects (ALL objects, including abstract ones)
    const allObjectsList = Array.from(schema.objects.values());
    const publicObjects = allObjectsList.filter((obj) => !obj.name.startsWith("_"));
    console.log(`  Emitting ${allObjectsList.length} objects (${publicObjects.length} public)...`);
    for (const obj of allObjectsList) {
      const content = emitObjectFile(obj, schema.objects, slug);
      const fileName = `${toFileName(obj.className)}.ts`;
      writeFileSync(join(objectsDir, fileName), content);
    }

    // Emit events
    const publicEvents = Array.from(schema.events.values()).filter((evt) => evt.classUid > 0);
    console.log(`  Emitting ${publicEvents.length} events...`);
    for (const event of publicEvents) {
      const content = emitEventFile(event, schema.objects, slug);
      const fileName = `${toFileName(event.className)}.ts`;
      writeFileSync(join(eventsDir, fileName), content);
    }

    // Emit barrel files
    console.log("  Emitting barrel files...");
    writeFileSync(join(objectsDir, "index.ts"), emitObjectsBarrel(schema));
    writeFileSync(join(eventsDir, "index.ts"), emitEventsBarrel(schema));
    writeFileSync(join(enumsDir, "index.ts"), emitEnumsBarrel(schema));
    writeFileSync(join(versionDir, "index.ts"), emitVersionBarrel(schema));

    console.log(`  Done: ${publicObjects.length} objects, ${publicEvents.length} events`);
  }

  // Top-level index.ts
  writeFileSync(join(SRC_DIR, "index.ts"), emitTopLevelIndex(LATEST_SLUG));

  console.log("\nGeneration complete.");
}

main();
