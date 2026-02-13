# Implementation Plan: Enum Validation for typescript-ocsf

## Executive Summary

This plan addresses two critical issues with enum handling in typescript-ocsf:

1. **Broken enum inheritance** - Parent enum values (0=Unknown, 99=Other) are lost instead of being merged with child values
2. **Missing enum validation** - Enum fields use `z.number().int()` which accepts ANY integer, providing no type safety

After investigation, we confirmed that OCSF requires enum values to be **merged** during inheritance, preserving base values (0, 99) while allowing events to add and override specific values.

## Problem Statement

### Issue 1: Broken Enum Inheritance (CRITICAL BUG)

**Current behavior in `scripts/lib/resolver.ts` line 130:**
```typescript
enumValues: attr.enumValues ?? existing.enumValues,  // ❌ REPLACES entirely!
```

**Example: `IncidentFinding.status_id`**

OCSF schema defines:
- **Dictionary**: `{0: "Unknown", 1: "Success", 2: "Failure", 99: "Other"}`
- **incident_finding**: `{1: "New", 2: "In Progress", 3: "On Hold", 4: "Resolved", 5: "Closed"}`

**Currently generated (WRONG):**
```typescript
const STATUS_ID_LABELS: Record<number, string> = {
  1: "New",
  2: "In Progress",
  3: "On Hold",
  4: "Resolved",
  5: "Closed",
  // ❌ MISSING: 0: "Unknown", 99: "Other"
};
```

**Should generate (CORRECT):**
```typescript
const STATUS_ID_LABELS: Record<number, string> = {
  0: "Unknown",      // from dictionary (inherited)
  1: "New",          // from incident_finding (overrides "Success")
  2: "In Progress",  // from incident_finding (overrides "Failure")
  3: "On Hold",      // from incident_finding (new)
  4: "Resolved",     // from incident_finding (new)
  5: "Closed",       // from incident_finding (new)
  99: "Other",       // from dictionary (inherited)
};
```

### Issue 2: No Enum Validation

**Current implementation:**
```typescript
// In incident_finding.ts
status_id: z.number().int(),  // ❌ Accepts ANY integer (999, -1, etc.)
```

**Desired implementation:**
```typescript
status_id: z.nativeEnum(IncidentFindingStatusId),  // ✅ Only accepts valid enum values
```

**Benefits:**
- ✅ Compile-time validation - TypeScript rejects invalid values
- ✅ Runtime validation - Zod rejects invalid integers
- ✅ Better IDE experience - Autocomplete shows valid enum values
- ✅ Self-documenting code - Enum names convey meaning

## OCSF Enum Model

### How Enums Work in OCSF

OCSF uses a **three-level enum inheritance system**:

1. **Dictionary Level** — Global base enum definitions
   - Most enums define: `{0: "Unknown", 99: "Other"}` as base values
   - Example: `activity_id`, `status_id`, `severity_id`

2. **Base Event Level** — May override or extend dictionary values
   - `base_event.json` can redefine enums for all child events

3. **Child Event Level** — Adds event-specific enum values
   - Example: `incident_finding.json` defines specific status values

### Enum Merging Rules

**Critical Rule:** When a child event defines enum values, they are **MERGED** with parent values, not replaced.

**Merge Algorithm:**
1. Start with parent enum values (from dictionary or base event)
2. Add child enum values
3. Child values **override** parent values by numeric key
4. Result: Union of parent and child values, with child taking precedence for conflicts

**Example: `IncidentFinding.activity_id`**

- **Dictionary**: `{0: "Unknown", 99: "Other"}`
- **base_event**: `{0: "Unknown", 99: "Other"}` (explicit override)
- **incident_finding**: `{1: "Create", 2: "Update", 3: "Close"}`
- **Result**: `{0: "Unknown", 1: "Create", 2: "Update", 3: "Close", 99: "Other"}`

**Example: `IncidentFinding.status_id`**

- **Dictionary**: `{0: "Unknown", 1: "Success", 2: "Failure", 99: "Other"}`
- **base_event**: (no override, inherits dictionary)
- **incident_finding**: `{1: "New", 2: "In Progress", 3: "On Hold", 4: "Resolved", 5: "Closed"}`
- **Result**: `{0: "Unknown", 1: "New", 2: "In Progress", 3: "On Hold", 4: "Resolved", 5: "Closed", 99: "Other"}`
  - Note: Value `1` changed from "Success" to "New" (child overrides parent)
  - Values 0 and 99 preserved from dictionary (inheritance)

### Sibling Reconciliation and OTHER (99)

The sibling reconciliation code assumes `OTHER: 99` exists for unknown labels:

```typescript
// src/sibling.ts - lines 86-89
} else {
  // Unknown label -> map to OTHER (99)
  result[idField] = 99;
}
```

This is **correct** because:
- Most OCSF enums DO have `OTHER: 99` in the dictionary
- The enum inheritance merging preserves this value
- Events can use 99 for custom/vendor-specific values

## Implementation Plan

### Phase 1: Fix Enum Inheritance (Priority: CRITICAL)

**Goal:** Make enum inheritance MERGE values instead of REPLACE them.

#### Task 1.1: Add Enum Merge Utility

**File:** `scripts/lib/resolver.ts`

Add this function before the `resolveObjectInheritance` function:

```typescript
/**
 * Merge parent and child enum values for OCSF inheritance.
 *
 * Rules:
 * - Child values override parent values by numeric key
 * - Base values (0=Unknown, 99=Other) are preserved unless explicitly overridden
 * - Result is sorted by value for deterministic output
 *
 * Example:
 *   parent: [{value: 0, caption: "Unknown"}, {value: 99, caption: "Other"}]
 *   child:  [{value: 1, caption: "New"}, {value: 2, caption: "In Progress"}]
 *   result: [{value: 0, caption: "Unknown"}, {value: 1, caption: "New"},
 *            {value: 2, caption: "In Progress"}, {value: 99, caption: "Other"}]
 */
function mergeEnumValues(
  parent: ParsedEnumValue[] | undefined,
  child: ParsedEnumValue[] | undefined,
): ParsedEnumValue[] | undefined {
  if (!parent && !child) return undefined;
  if (!parent) return child;
  if (!child) return parent;

  // Use Map to merge by numeric value
  const merged = new Map<number, ParsedEnumValue>();

  // Add all parent values
  for (const val of parent) {
    merged.set(val.value, val);
  }

  // Override/add child values (child wins on conflicts)
  for (const val of child) {
    merged.set(val.value, val);
  }

  // Convert back to array and sort by value
  return Array.from(merged.values()).sort((a, b) => a.value - b.value);
}
```

#### Task 1.2: Update Object Inheritance

**File:** `scripts/lib/resolver.ts`

Find the object inheritance merge (around line 72):

```typescript
// BEFORE:
mergedAttrs.set(attr.name, {
  ...existing,
  ...attr,
  enumValues: attr.enumValues ?? existing.enumValues,  // ❌ WRONG
  sibling: attr.sibling ?? existing.sibling,
});

// AFTER:
mergedAttrs.set(attr.name, {
  ...existing,
  ...attr,
  enumValues: mergeEnumValues(existing.enumValues, attr.enumValues),  // ✅ CORRECT
  sibling: attr.sibling ?? existing.sibling,
});
```

#### Task 1.3: Update Event Inheritance

**File:** `scripts/lib/resolver.ts`

Find the event inheritance merge (around line 130):

```typescript
// BEFORE:
mergedAttrs.set(attr.name, {
  ...existing,
  ...attr,
  enumValues: attr.enumValues ?? existing.enumValues,  // ❌ WRONG
  sibling: attr.sibling ?? existing.sibling,
});

// AFTER:
mergedAttrs.set(attr.name, {
  ...existing,
  ...attr,
  enumValues: mergeEnumValues(existing.enumValues, attr.enumValues),  // ✅ CORRECT
  sibling: attr.sibling ?? existing.sibling,
});
```

#### Task 1.4: Regenerate Schemas

```bash
npm run generate
```

This will regenerate all event and object files with correctly merged enum values.

#### Task 1.5: Verify Fix

Check that `src/v1_7/events/incident_finding.ts` now has:

```typescript
const STATUS_ID_LABELS: Record<number, string> = {
  0: "Unknown",      // ✅ Now present!
  1: "New",
  2: "In Progress",
  3: "On Hold",
  4: "Resolved",
  5: "Closed",
  99: "Other",       // ✅ Now present!
};
```

### Phase 2: Add Enum Validation

**Goal:** Use Zod enum validation instead of plain `z.number().int()`.

#### Task 2.1: Update Event Emitter

**File:** `scripts/lib/event-emitter.ts`

Modify the Zod type generation for enum fields (around line 125):

```typescript
// Current logic:
let zodType: string;
if (attr.objectType) {
  // ... object reference logic ...
} else {
  zodType = mapOcsfTypeToZod(attr.ocsfType);  // Returns "z.number().int()" for integer_t
}

// NEW logic:
let zodType: string;
if (attr.objectType) {
  // ... object reference logic ...
} else if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith('_id')) {
  // This is an enum field - generate inline enum type
  const literals = attr.enumValues.map(v => `z.literal(${v.value})`).join(', ');
  zodType = `z.union([${literals}])`;
} else {
  zodType = mapOcsfTypeToZod(attr.ocsfType);
}
```

**Alternative approach (generate named enum types):**

Instead of inline literals, generate event-specific enum types and import them:

```typescript
// Generate: src/v1_7/enums/incident_finding_status_id.ts
export const IncidentFindingStatusId = {
  UNKNOWN: 0,
  NEW: 1,
  IN_PROGRESS: 2,
  ON_HOLD: 3,
  RESOLVED: 4,
  CLOSED: 5,
  OTHER: 99,
} as const;

// Then in event schema:
import { IncidentFindingStatusId } from '../enums/incident_finding_status_id.js';

status_id: z.nativeEnum(IncidentFindingStatusId)
```

**Recommendation:** Use the **named enum approach** for better developer experience (autocomplete, reusability).

#### Task 2.2: Generate Event-Specific Enum Files

**File:** `scripts/generate.ts`

After generating global enums, generate event-specific enums:

```typescript
// For each event
for (const [eventName, event] of schema.events) {
  for (const attr of event.attributes) {
    // Only generate enum if:
    // 1. Has enum values
    // 2. Is an _id field
    // 3. Values differ from global enum (or no global enum exists)
    if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith('_id')) {
      const globalEnum = schema.enums.get(attr.name);
      const needsEventEnum = !globalEnum ||
        !enumValuesEqual(attr.enumValues, globalEnum.values);

      if (needsEventEnum) {
        const content = emitExactEnumFile(
          event.className,
          attr.name,
          attr.enumValues
        );
        const fileName = `${toFileName(event.className)}_${toFileName(attr.name)}.ts`;
        writeFileSync(join(enumsDir, fileName), content);
      }
    }
  }
}

function enumValuesEqual(a: ParsedEnumValue[], b: ParsedEnumValue[]): boolean {
  if (a.length !== b.length) return false;
  const aMap = new Map(a.map(v => [v.value, v.caption]));
  const bMap = new Map(b.map(v => [v.value, v.caption]));

  for (const [key, val] of aMap) {
    if (bMap.get(key) !== val) return false;
  }
  return true;
}
```

#### Task 2.3: Update Enum Emitter

**File:** `scripts/lib/enum-emitter.ts`

Add a new function for exact enum generation:

```typescript
/**
 * Emit an enum file with EXACT values from the schema (no forced 0/99).
 * Used for event-specific enum overrides.
 */
export function emitExactEnumFile(
  eventClassName: string,
  attrName: string,
  values: ParsedEnumValue[],
): string {
  const enumName = `${eventClassName}${toPascalCaseAttr(attrName)}`;
  const lines: string[] = [];

  // JSDoc
  lines.push(`/** ${eventClassName} ${attrName} values. */`);

  // Const object with EXACT values from schema
  lines.push(`export const ${enumName} = {`);
  for (const val of values) {
    const member = toEnumMember(val.caption);
    if (val.description) {
      lines.push(`  /** ${val.description} */`);
    }
    lines.push(`  ${member}: ${val.value},`);
  }
  lines.push("} as const;");
  lines.push("");

  // Type alias
  lines.push(`export type ${enumName} = (typeof ${enumName})[keyof typeof ${enumName}];`);
  lines.push("");

  // Label mapping
  lines.push(`export const ${enumName}Labels: Record<number, string> = {`);
  for (const val of values) {
    lines.push(`  ${val.value}: ${JSON.stringify(val.caption)},`);
  }
  lines.push("};");
  lines.push("");

  return lines.join("\n");
}

function toPascalCaseAttr(attrName: string): string {
  return attrName
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}
```

**Important:** Keep the existing `emitEventEnumFile()` for backward compatibility, but deprecate it in favor of `emitExactEnumFile()`.

#### Task 2.4: Update Object Emitter

**File:** `scripts/lib/object-emitter.ts`

Apply the same enum validation logic as events:

```typescript
// In the schema field generation loop:
let zodType: string;
if (attr.objectType) {
  // ... object reference logic ...
} else if (attr.enumValues && attr.enumValues.length > 0 && attr.name.endsWith('_id')) {
  // Generate inline enum validation
  const literals = attr.enumValues.map(v => `z.literal(${v.value})`).join(', ');
  zodType = `z.union([${literals}])`;
} else {
  zodType = mapOcsfTypeToZod(attr.ocsfType);
}
```

### Phase 3: Testing

#### Task 3.1: Unit Tests for Enum Merging

**File:** `tests/unit/enum-merging.test.ts` (NEW)

```typescript
import { describe, it, expect } from 'vitest';

describe('Enum inheritance merging', () => {
  it('merges parent and child enum values', () => {
    // Simulate: parent has 0 and 99, child has 1, 2, 3
    const parent = [
      { value: 0, caption: 'Unknown' },
      { value: 99, caption: 'Other' },
    ];
    const child = [
      { value: 1, caption: 'New' },
      { value: 2, caption: 'In Progress' },
      { value: 3, caption: 'Closed' },
    ];

    const result = mergeEnumValues(parent, child);

    expect(result).toHaveLength(5);
    expect(result.map(v => v.value)).toEqual([0, 1, 2, 3, 99]);
    expect(result[0].caption).toBe('Unknown');
    expect(result[4].caption).toBe('Other');
  });

  it('child values override parent values', () => {
    const parent = [
      { value: 1, caption: 'Success' },
      { value: 2, caption: 'Failure' },
    ];
    const child = [
      { value: 1, caption: 'New' },        // Override
      { value: 2, caption: 'In Progress' }, // Override
    ];

    const result = mergeEnumValues(parent, child);

    expect(result[0].caption).toBe('New');
    expect(result[1].caption).toBe('In Progress');
  });
});
```

#### Task 3.2: Integration Tests for Enum Validation

**File:** `tests/integration/enum-validation.test.ts` (NEW)

```typescript
import { describe, it, expect } from 'vitest';
import { IncidentFinding } from '../../src/v1_7/events/incident_finding.js';

describe('IncidentFinding enum validation', () => {
  it('accepts valid status_id values (1-5)', () => {
    for (const status_id of [1, 2, 3, 4, 5]) {
      const result = IncidentFinding.safeParse({
        time: Date.now(),
        severity_id: 1,
        status_id,
        activity_id: 1,
        metadata: {
          version: '1.7.0',
          product: { name: 'Test', vendor_name: 'Test' },
        },
        finding_info: { title: 'Test' },
      });

      expect(result.success).toBe(true);
    }
  });

  it('accepts UNKNOWN (0) and OTHER (99)', () => {
    // These should be present due to enum inheritance
    for (const status_id of [0, 99]) {
      const result = IncidentFinding.safeParse({
        time: Date.now(),
        severity_id: 1,
        status_id,
        activity_id: 1,
        metadata: {
          version: '1.7.0',
          product: { name: 'Test', vendor_name: 'Test' },
        },
        finding_info: { title: 'Test' },
      });

      expect(result.success).toBe(true);
    }
  });

  it('rejects invalid status_id values', () => {
    const result = IncidentFinding.safeParse({
      time: Date.now(),
      severity_id: 1,
      status_id: 999,  // Invalid
      activity_id: 1,
      metadata: {
        version: '1.7.0',
        product: { name: 'Test', vendor_name: 'Test' },
      },
      finding_info: { title: 'Test' },
    });

    expect(result.success).toBe(false);
  });

  it('performs sibling reconciliation with inherited enum values', () => {
    const result = IncidentFinding.parse({
      time: Date.now(),
      severity_id: 1,
      status_id: 0,  // UNKNOWN
      activity_id: 1,
      metadata: {
        version: '1.7.0',
        product: { name: 'Test', vendor_name: 'Test' },
      },
      finding_info: { title: 'Test' },
    });

    // Label should be auto-filled
    expect(result.status).toBe('Unknown');
  });
});
```

#### Task 3.3: Update Existing Tests

**File:** `tests/integration/sibling-e2e.test.ts`

Update tests that might be affected by enum inheritance changes:

```typescript
// Add test for OTHER (99) behavior
it('maps unknown label to OTHER (99) when available', () => {
  const result = IncidentFinding.parse({
    time: Date.now(),
    severity_id: 1,
    status: "Custom Vendor Status",  // Unknown label
    activity_id: 1,
    metadata: {
      version: '1.7.0',
      product: { name: 'Test', vendor_name: 'Test' },
    },
    finding_info: { title: 'Test' },
  });

  // Should map to OTHER (99) since it exists in the enum
  expect(result.status_id).toBe(99);
  expect(result.status).toBe("Custom Vendor Status");
});
```

### Phase 4: Documentation

#### Task 4.1: Update README

**File:** `README.md`

Add section on enum handling:

```markdown
### Working with Enums

OCSF enum fields are fully validated with proper inheritance:

```typescript
import { IncidentFinding } from "@mcm/ocsf/v1_7/events";

// Valid: Standard enum values (1-5)
const event1 = IncidentFinding.parse({
  time: Date.now(),
  severity_id: 1,
  status_id: 1,  // "New"
  activity_id: 1,
  // ...
});

// Valid: Inherited base values (0=Unknown, 99=Other)
const event2 = IncidentFinding.parse({
  time: Date.now(),
  severity_id: 1,
  status_id: 0,  // "Unknown" - inherited from dictionary
  activity_id: 1,
  // ...
});

const event3 = IncidentFinding.parse({
  time: Date.now(),
  severity_id: 1,
  status_id: 99,  // "Other" - inherited from dictionary
  status: "Custom vendor status",
  activity_id: 1,
  // ...
});

// Invalid: Value not in enum
const invalid = IncidentFinding.parse({
  time: Date.now(),
  severity_id: 1,
  status_id: 999,  // ❌ ZodError: Invalid enum value
  activity_id: 1,
  // ...
});
```

**Enum Inheritance:**
- Event-specific enums inherit base values from the OCSF dictionary
- Most enums include `0: "Unknown"` and `99: "Other"` as base values
- Events can add or override specific enum values
- Validation ensures only defined enum values are accepted
```

#### Task 4.2: Update CHANGELOG

**File:** `CHANGELOG.md`

```markdown
## [0.3.0] - TBD

### Fixed
- **CRITICAL: Enum Inheritance** - Fixed broken enum value inheritance in schema generation
  - Parent enum values (0=Unknown, 99=Other) are now correctly merged with child values
  - Previously, child enums REPLACED parent enums, losing base values
  - Example: `IncidentFinding.status_id` now correctly includes values 0, 1-5, and 99
  - Affects ALL events/objects that define custom enum values
  - Root cause: `resolver.ts` used `??` operator instead of merging enum values

### Added
- **Enum Validation** - Enum fields now use proper Zod enum validation
  - Runtime validation ensures only valid enum values are accepted
  - Type inference: enum fields are typed as literal unions (e.g., `1 | 2 | 3 | 4 | 5`)
  - Better error messages for invalid enum values
  - Example: `status_id: 999` now throws ZodError instead of passing validation

### Changed
- **Schema Generation** - Event and object schemas now validate enum fields
  - Enum fields use `z.union([z.literal(...), ...])` instead of `z.number().int()`
  - **Breaking**: Code passing invalid enum values will now fail validation
  - **Impact**: Only affects code that was already violating OCSF specification
  - Migration: Ensure enum values are within defined ranges

### Migration Guide

If you see new ZodErrors after upgrading:

1. **Check enum values**: Ensure all enum fields use valid OCSF values
2. **Use inherited values**: Remember that 0 (Unknown) and 99 (Other) are usually valid
3. **Update tests**: Tests asserting invalid enum values will need updates

Example:
```typescript
// Before (invalid but accepted):
{ status_id: 999 }  // No such value in OCSF

// After (use valid value):
{ status_id: 99, status: "Custom Status" }  // Use OTHER for custom values
```
```

## Implementation Timeline

| Phase | Tasks | Estimated Time | Priority |
|-------|-------|----------------|----------|
| Phase 1: Fix Enum Inheritance | 1.1-1.5 | 2 hours | CRITICAL |
| Phase 2: Add Enum Validation | 2.1-2.4 | 6 hours | HIGH |
| Phase 3: Testing | 3.1-3.3 | 4 hours | HIGH |
| Phase 4: Documentation | 4.1-4.2 | 2 hours | MEDIUM |
| **Total** | | **14 hours** | |

## Risks and Mitigations

### Risk 1: Regeneration Changes Many Files

**Risk:** Phase 1 (enum inheritance fix) will regenerate all event/object files with corrected enum values.

**Mitigation:**
- Review git diff carefully before committing
- Focus testing on events with custom enum values
- Run full test suite to catch regressions

### Risk 2: Breaking Changes for Invalid Usage

**Risk:** Users passing invalid enum values will see new ZodErrors.

**Mitigation:**
- This is actually a fix - they were violating OCSF spec
- Document migration path in CHANGELOG
- Use semantic versioning: bump to 0.3.0 (minor)
- Consider deprecation warnings in 0.2.x before hard break

### Risk 3: Performance Impact

**Risk:** Enum validation might be slower than `z.number().int()`.

**Mitigation:**
- Zod union validation is fast (Set-based lookup)
- Run benchmarks to measure impact
- Expected overhead: <5% based on Zod benchmarks

### Risk 4: Edge Cases in Enum Merging

**Risk:** Some enums might have unusual inheritance patterns not covered by merge logic.

**Mitigation:**
- Test extensively with real OCSF schemas
- Review OCSF spec for edge cases
- Add logging during generation to detect anomalies

## Success Criteria

✅ **Phase 1 (Enum Inheritance) Success:**
1. `IncidentFinding.status_id` has values 0, 1, 2, 3, 4, 5, 99
2. `FileActivity.activity_id` has values 0, 1-14, 99
3. All events with enum overrides have correct merged values
4. No regressions in existing test suite

✅ **Phase 2 (Enum Validation) Success:**
1. Enum fields use union or nativeEnum validation
2. Invalid enum values rejected at runtime
3. Type inference shows literal unions
4. IDE autocomplete works for enum values

✅ **Phase 3 (Testing) Success:**
1. All new tests pass
2. Test coverage ≥90% for enum-related code
3. Integration tests verify end-to-end behavior

✅ **Phase 4 (Documentation) Success:**
1. README clearly explains enum behavior
2. CHANGELOG documents breaking changes
3. Migration guide helps users upgrade

## Verification Steps

After completing all phases:

1. **Regenerate all schemas:**
   ```bash
   npm run generate
   ```

2. **Run full test suite:**
   ```bash
   npm run test
   npm run typecheck
   ```

3. **Verify specific events:**
   ```bash
   # Check IncidentFinding has correct enum values
   grep -A20 "STATUS_ID_LABELS" src/v1_7/events/incident_finding.ts

   # Should show: 0, 1, 2, 3, 4, 5, 99
   ```

4. **Test enum validation:**
   ```typescript
   import { IncidentFinding } from '@mcm/ocsf/v1_7/events';

   // Should pass
   IncidentFinding.parse({ status_id: 0, ... });
   IncidentFinding.parse({ status_id: 1, ... });
   IncidentFinding.parse({ status_id: 99, ... });

   // Should fail
   IncidentFinding.parse({ status_id: 999, ... });
   ```

5. **Review generated files:**
   - Check that enum files have correct values
   - Verify imports are correct
   - Ensure no circular dependencies

## Rollback Plan

If issues are discovered after deployment:

1. **Revert Phase 2** (enum validation) but keep Phase 1 (inheritance fix):
   - Enum values will be correct but validation permissive
   - Users can still pass invalid values (backward compatible)

2. **Full revert:**
   - Git revert all changes
   - Regenerate schemas from old code
   - Document issues for future fix

## References

- OCSF Schema Repository: https://github.com/ocsf/ocsf-schema
- OCSF v1.7.0 Schema: https://github.com/ocsf/ocsf-schema/tree/v1.7.0
- Zod Documentation: https://zod.dev/
- Zod Native Enum: https://zod.dev/?id=native-enums
- Zod Unions: https://zod.dev/?id=unions

## Appendix: Files to Modify

### Phase 1: Enum Inheritance Fix
- ✏️ `scripts/lib/resolver.ts` - Add mergeEnumValues(), update inheritance logic
- ♻️ `src/v1_7/events/*.ts` - All event files (regenerated)
- ♻️ `src/v1_7/objects/*.ts` - All object files (regenerated)
- ♻️ `src/v1_6/**/*.ts` - All v1.6 files (regenerated)
- ♻️ `src/v1_5/**/*.ts` - All v1.5 files (regenerated)

### Phase 2: Enum Validation
- ✏️ `scripts/lib/event-emitter.ts` - Add enum validation logic
- ✏️ `scripts/lib/object-emitter.ts` - Add enum validation logic
- ✏️ `scripts/lib/enum-emitter.ts` - Add emitExactEnumFile()
- ✏️ `scripts/generate.ts` - Generate event-specific enums
- ♻️ `src/v1_7/events/*.ts` - All event files (regenerated)
- ♻️ `src/v1_7/objects/*.ts` - All object files (regenerated)
- ➕ `src/v1_7/enums/*_*_id.ts` - Event-specific enum files (new)

### Phase 3: Testing
- ➕ `tests/unit/enum-merging.test.ts` - New unit tests
- ➕ `tests/integration/enum-validation.test.ts` - New integration tests
- ✏️ `tests/integration/sibling-e2e.test.ts` - Update existing tests

### Phase 4: Documentation
- ✏️ `README.md` - Add enum documentation
- ✏️ `CHANGELOG.md` - Document changes
- ✏️ `ENUM_VALIDATION_SPEC.md` - Update spec with final implementation

**Legend:** ✏️ Modified | ♻️ Regenerated | ➕ New

---

**Plan Status:** Ready for Implementation
**Estimated Effort:** 14 hours
**Breaking Changes:** Minimal (only for invalid usage)
**OCSF Versions Affected:** 1.5.0, 1.6.0, 1.7.0
**Priority:** CRITICAL (correctness bug) + HIGH (validation missing)
