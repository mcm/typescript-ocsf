import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { toClassName, toVersionSlug } from "./naming.js";
import type {
  ParsedAttribute,
  ParsedEnum,
  ParsedEnumValue,
  ParsedEvent,
  ParsedObject,
  ParsedSchema,
  ParsedSiblingPair,
} from "./types.js";

/**
 * Parse an OCSF schema repository directory into a ParsedSchema.
 *
 * @param schemaDir - Path to the cloned ocsf-schema directory (e.g., schemas/v1.7.0/)
 * @param version - Version string, e.g. "1.7.0"
 * @returns Fully parsed schema (inheritance NOT yet resolved -- see resolver.ts)
 */
export function parseOcsfSchema(schemaDir: string, version: string): ParsedSchema {
  const dictionary = loadDictionary(schemaDir);
  const categories = loadCategories(schemaDir);
  const objects = parseObjects(schemaDir, dictionary);
  const events = parseEvents(schemaDir, dictionary, categories);
  const enums = extractSharedEnums(dictionary);

  return {
    version,
    versionSlug: toVersionSlug(version),
    objects,
    events,
    enums,
    categories,
  };
}

/** Load the dictionary.json which contains canonical attribute definitions. */
function loadDictionary(schemaDir: string): Record<string, any> {
  const dictPath = join(schemaDir, "dictionary.json");
  const raw = JSON.parse(readFileSync(dictPath, "utf-8"));
  return raw.attributes ?? {};
}

/** Load categories.json and return a map of category_name -> uid. */
function loadCategories(schemaDir: string): Map<string, number> {
  const catPath = join(schemaDir, "categories.json");
  const raw = JSON.parse(readFileSync(catPath, "utf-8"));
  const result = new Map<string, number>();
  for (const [key, val] of Object.entries(raw.attributes ?? {})) {
    result.set(key, (val as any).uid);
  }
  return result;
}

/** Parse all object JSON files in the objects/ directory. */
function parseObjects(
  schemaDir: string,
  dictionary: Record<string, any>,
): Map<string, ParsedObject> {
  const objectsDir = join(schemaDir, "objects");
  const result = new Map<string, ParsedObject>();

  for (const file of readdirSync(objectsDir).filter((f) => f.endsWith(".json"))) {
    const filePath = join(objectsDir, file);
    const raw = JSON.parse(readFileSync(filePath, "utf-8"));
    const name: string = raw.name;

    // Skip abstract base objects that start with underscore in the output
    // but still parse them for inheritance resolution
    const attributes = parseAttributes(raw.attributes ?? {}, dictionary);

    result.set(name, {
      name,
      className: toClassName(name),
      caption: raw.caption ?? "",
      description: raw.description ?? "",
      extends: raw.extends,
      attributes,
      isInCycle: false, // Set later by resolver
      references: extractReferences(attributes),
      observable: raw.observable,
      constraints: raw.constraints,
    });
  }

  return result;
}

/**
 * Parse all event JSON files recursively from the events/ directory.
 * Events are organized in subdirectories by category (system/, network/, etc.)
 * with a category base event JSON in each subdirectory.
 */
function parseEvents(
  schemaDir: string,
  dictionary: Record<string, any>,
  categories: Map<string, number>,
): Map<string, ParsedEvent> {
  const eventsDir = join(schemaDir, "events");
  const result = new Map<string, ParsedEvent>();

  // Parse base_event.json at top level
  const baseEventPath = join(eventsDir, "base_event.json");
  if (existsSync(baseEventPath)) {
    const raw = JSON.parse(readFileSync(baseEventPath, "utf-8"));
    const attributes = parseAttributes(raw.attributes ?? {}, dictionary);
    result.set("base_event", {
      name: "base_event",
      className: "BaseEvent",
      caption: raw.caption ?? "",
      description: raw.description ?? "",
      extends: undefined,
      category: raw.category ?? "other",
      categoryUid: 0,
      classUid: 0,
      attributes,
      siblingPairs: detectSiblingPairs(attributes),
      references: extractReferences(attributes),
    });
  }

  // Parse each category subdirectory
  for (const categoryDir of readdirSync(eventsDir)) {
    const categoryPath = join(eventsDir, categoryDir);
    // Skip non-directories and non-JSON files at top level
    if (!existsSync(join(categoryPath)) || categoryDir.endsWith(".json")) continue;

    try {
      const files = readdirSync(categoryPath).filter((f) => f.endsWith(".json"));
      for (const file of files) {
        const filePath = join(categoryPath, file);
        const raw = JSON.parse(readFileSync(filePath, "utf-8"));
        const name: string = raw.name;
        const category: string = raw.category ?? categoryDir;
        const categoryUid = categories.get(category) ?? 0;

        // class_uid: for category-base events (e.g., system.json), uid field
        // is the base; for leaf events (e.g., file_activity.json), uid is the
        // offset within the category. Full class_uid = categoryUid * 1000 + uid.
        // However, the OCSF schema stores class UIDs differently:
        // The event's uid field IS the offset, and the class_uid = category_uid * 1000 + uid.
        const eventUid: number = raw.uid ?? 0;
        const classUid = categoryUid * 1000 + eventUid;

        const attributes = parseAttributes(raw.attributes ?? {}, dictionary);

        result.set(name, {
          name,
          className: toClassName(name),
          caption: raw.caption ?? "",
          description: raw.description ?? "",
          extends: raw.extends,
          category,
          categoryUid,
          classUid,
          attributes,
          siblingPairs: detectSiblingPairs(attributes),
          references: extractReferences(attributes),
        });
      }
    } catch {
      // Not a directory, skip
    }
  }

  return result;
}

/**
 * Parse attributes from a schema definition, merging with dictionary definitions.
 *
 * Attributes in the event/object JSON may be sparse (only overriding
 * requirement or description). The dictionary provides the canonical type,
 * caption, description, sibling, and enum information.
 *
 * Handles $include directives by skipping them (profiles are resolved
 * separately by the resolver).
 */
function parseAttributes(
  rawAttrs: Record<string, any>,
  dictionary: Record<string, any>,
): ParsedAttribute[] {
  const result: ParsedAttribute[] = [];

  for (const [attrName, attrOverrides] of Object.entries(rawAttrs)) {
    // Skip $include directives
    if (attrName === "$include") continue;

    const dictDef = dictionary[attrName] ?? {};
    const merged = { ...dictDef, ...attrOverrides };

    // Determine OCSF type
    const ocsfType: string = merged.type ?? "string_t";

    // Check if this is an object reference
    let objectType: string | undefined;
    if (!ocsfType.endsWith("_t")) {
      // Non-primitive type means it's an object reference
      objectType = ocsfType;
    }

    // Parse enum values if present (merge dict enum with override enum)
    let enumValues: ParsedEnumValue[] | undefined;
    const enumDef = merged.enum;
    if (enumDef && typeof enumDef === "object") {
      enumValues = [];
      for (const [key, val] of Object.entries(enumDef)) {
        const numKey = Number.parseInt(key, 10);
        if (!Number.isNaN(numKey) && val && typeof val === "object") {
          enumValues.push({
            value: numKey,
            caption: (val as any).caption ?? String(numKey),
            description: (val as any).description,
          });
        }
      }
      // Sort by value for deterministic output
      enumValues.sort((a, b) => a.value - b.value);
    }

    result.push({
      name: attrName,
      ocsfType,
      objectType,
      isArray: merged.is_array === true,
      requirement: merged.requirement ?? "optional",
      description: stripHtml(merged.description ?? ""),
      caption: merged.caption ?? "",
      sibling: merged.sibling,
      enumValues,
      deprecated: merged["@deprecated"],
      group: merged.group,
    });
  }

  return result;
}

/** Strip HTML tags from description strings. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Detect sibling _id/label pairs in a list of attributes. */
function detectSiblingPairs(attributes: ParsedAttribute[]): ParsedSiblingPair[] {
  const pairs: ParsedSiblingPair[] = [];

  for (const attr of attributes) {
    if (attr.sibling && attr.name.endsWith("_id") && attr.enumValues) {
      pairs.push({
        idField: attr.name,
        labelField: attr.sibling,
        enumValues: attr.enumValues,
      });
    }
  }

  return pairs;
}

/** Extract object references from attributes. */
function extractReferences(attributes: ParsedAttribute[]): string[] {
  const refs: string[] = [];
  for (const attr of attributes) {
    if (attr.objectType) {
      refs.push(attr.objectType);
    }
  }
  return [...new Set(refs)];
}

/**
 * Extract shared enum definitions from the dictionary.
 * Shared enums are _id attributes that appear in many objects/events.
 */
function extractSharedEnums(dictionary: Record<string, any>): Map<string, ParsedEnum> {
  const result = new Map<string, ParsedEnum>();

  for (const [attrName, attrDef] of Object.entries(dictionary)) {
    if (attrName.endsWith("_id") && attrDef.enum && typeof attrDef.enum === "object") {
      const values: ParsedEnumValue[] = [];
      for (const [key, val] of Object.entries(attrDef.enum)) {
        const numKey = Number.parseInt(key, 10);
        if (!Number.isNaN(numKey) && val && typeof val === "object") {
          values.push({
            value: numKey,
            caption: (val as any).caption ?? String(numKey),
            description: (val as any).description,
          });
        }
      }
      values.sort((a, b) => a.value - b.value);

      if (values.length > 0) {
        const enumName = toClassName(attrName);
        result.set(attrName, {
          name: enumName,
          attributeName: attrName,
          caption: attrDef.caption ?? "",
          values,
        });
      }
    }
  }

  return result;
}
