import type { ParsedAttribute, ParsedEvent, ParsedObject, ParsedSchema } from "./types.js";

/**
 * Resolve inheritance and detect cycles in a parsed OCSF schema.
 *
 * Inheritance resolution merges parent attributes into child definitions,
 * with child overrides taking precedence. This mirrors OCSF's `extends`
 * mechanism where events extend category bases and category bases extend
 * base_event.
 *
 * @param schema - The parsed schema with unresolved inheritance
 * @returns The schema with resolved inheritance and cycle annotations
 */
export function resolveSchema(schema: ParsedSchema): ParsedSchema {
  // Step 1: Resolve object inheritance
  resolveObjectInheritance(schema.objects);

  // Step 2: Resolve event inheritance
  resolveEventInheritance(schema.events, schema.objects);

  // Step 3: Detect circular reference cycles in objects
  detectCycles(schema.objects);

  // Step 4: Re-detect sibling pairs after inheritance resolution
  // (parent events define sibling pairs that children inherit)
  for (const event of schema.events.values()) {
    event.siblingPairs = detectSiblingPairsFromAttrs(event.attributes);
    event.references = extractRefs(event.attributes);
  }

  return schema;
}

/**
 * Resolve object inheritance chains.
 *
 * For each object, walk up the `extends` chain and merge attributes.
 * Child attributes override parent attributes with the same name.
 *
 * Inheritance chain example:
 *   object -> _entity -> _resource -> file
 *   Each level adds/overrides attributes.
 */
function resolveObjectInheritance(objects: Map<string, ParsedObject>): void {
  const resolved = new Set<string>();

  function resolve(name: string): void {
    if (resolved.has(name)) return;

    const obj = objects.get(name);
    if (!obj) return;

    // Resolve parent first
    if (obj.extends && objects.has(obj.extends)) {
      resolve(obj.extends);
      const parent = objects.get(obj.extends);
      if (!parent) return;

      // Merge: parent attributes first, child overrides
      const mergedAttrs = new Map<string, ParsedAttribute>();
      for (const attr of parent.attributes) {
        mergedAttrs.set(attr.name, attr);
      }
      for (const attr of obj.attributes) {
        // Child overrides: merge by spreading parent then child
        const existing = mergedAttrs.get(attr.name);
        if (existing) {
          mergedAttrs.set(attr.name, {
            ...existing,
            ...attr,
            // Preserve enum values from child if present, else parent
            enumValues: attr.enumValues ?? existing.enumValues,
            // Preserve sibling from child if present, else parent
            sibling: attr.sibling ?? existing.sibling,
          });
        } else {
          mergedAttrs.set(attr.name, attr);
        }
      }

      obj.attributes = Array.from(mergedAttrs.values());
    }

    resolved.add(name);
  }

  for (const name of objects.keys()) {
    resolve(name);
  }
}

/**
 * Resolve event inheritance chains.
 *
 * Events extend other events (e.g., file_activity extends system,
 * system extends base_event). The same merge logic applies.
 *
 * Events may also reference objects via their attributes; those
 * references are updated after inheritance resolution.
 */
function resolveEventInheritance(
  events: Map<string, ParsedEvent>,
  objects: Map<string, ParsedObject>,
): void {
  const resolved = new Set<string>();

  function resolve(name: string): void {
    if (resolved.has(name)) return;

    const event = events.get(name);
    if (!event) return;

    if (event.extends) {
      // Parent could be another event
      if (events.has(event.extends)) {
        resolve(event.extends);
        const parent = events.get(event.extends);
        if (!parent) return;

        const mergedAttrs = new Map<string, ParsedAttribute>();
        for (const attr of parent.attributes) {
          mergedAttrs.set(attr.name, attr);
        }
        for (const attr of event.attributes) {
          const existing = mergedAttrs.get(attr.name);
          if (existing) {
            mergedAttrs.set(attr.name, {
              ...existing,
              ...attr,
              enumValues: attr.enumValues ?? existing.enumValues,
              sibling: attr.sibling ?? existing.sibling,
            });
          } else {
            mergedAttrs.set(attr.name, attr);
          }
        }

        event.attributes = Array.from(mergedAttrs.values());

        // Inherit category/class UIDs if not set
        if (event.categoryUid === 0 && parent.categoryUid !== 0) {
          event.categoryUid = parent.categoryUid;
        }
      }
    }

    resolved.add(name);
  }

  for (const name of events.keys()) {
    resolve(name);
  }
}

/**
 * Detect circular reference cycles among objects.
 *
 * Uses DFS with coloring (white/gray/black) to find back edges.
 * Objects involved in cycles are marked with isInCycle = true,
 * which signals the emitter to use z.lazy() and explicit TS interfaces.
 *
 * Known OCSF cycles:
 * - process -> file -> process (via file.creator, process.file)
 * - file -> file (self-reference via file.parent_folder)
 */
function detectCycles(objects: Map<string, ParsedObject>): void {
  const WHITE = 0;
  const GRAY = 1;
  const BLACK = 2;
  const color = new Map<string, number>();
  const cycleMembers = new Set<string>();

  for (const name of objects.keys()) {
    color.set(name, WHITE);
  }

  function dfs(name: string, path: string[]): void {
    color.set(name, GRAY);
    path.push(name);

    const obj = objects.get(name);
    if (obj) {
      for (const ref of obj.references) {
        const refColor = color.get(ref);
        if (refColor === GRAY) {
          // Back edge found: mark all nodes in the cycle
          const cycleStart = path.indexOf(ref);
          for (let i = cycleStart; i < path.length; i++) {
            cycleMembers.add(path[i]);
          }
        } else if (refColor === WHITE) {
          dfs(ref, path);
        }
      }
    }

    path.pop();
    color.set(name, BLACK);
  }

  for (const name of objects.keys()) {
    if (color.get(name) === WHITE) {
      dfs(name, []);
    }
  }

  // Mark cycle members
  for (const name of cycleMembers) {
    const obj = objects.get(name);
    if (obj) {
      obj.isInCycle = true;
    }
  }
}

/** Re-detect sibling pairs from resolved attributes. */
function detectSiblingPairsFromAttrs(attributes: ParsedAttribute[]) {
  const pairs: Array<{
    idField: string;
    labelField: string;
    enumValues: Array<{ value: number; caption: string; description?: string }>;
  }> = [];

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

/** Extract unique object references from attributes. */
function extractRefs(attributes: ParsedAttribute[]): string[] {
  const refs = new Set<string>();
  for (const attr of attributes) {
    if (attr.objectType) refs.add(attr.objectType);
  }
  return Array.from(refs);
}
