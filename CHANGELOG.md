# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2026-02-15

### Fixed
- **OCSF `object` Type Handling** - Fixed validation for OCSF `object` type fields (e.g., `unmapped`, `xattributes`)
  - Added proper type mapping for OCSF `object` type to `z.record(z.string(), z.unknown())`
  - Previously fell through to `z.unknown()` which didn't provide proper structure validation
  - Fields like `unmapped` and `xattributes` now correctly accept arbitrary key-value pairs
  - Affects 252 event schemas and 6 object schemas across all OCSF versions (v1.5.0, v1.6.0, v1.7.0)
  - All 91 tests continue to pass

### Technical Details
- Updated type mappings in `scripts/lib/type-map.ts`:
  - `mapOcsfTypeToZod("object")` → `"z.record(z.string(), z.unknown())"`
  - `mapOcsfTypeToTs("object")` → `"Record<string, unknown>"`
  - `mapOcsfTypeToZodTypeName("object")` → `"z.ZodRecord<z.ZodString, z.ZodUnknown>"`
- Updated parser to treat `object` as primitive type (not object reference)
- Regenerated all affected schemas to use inline `z.record()` instead of `OcsfObject` reference
- Removed unnecessary `OcsfObject` imports from generated files

## [0.3.0] - 2026-02-14

### Added
- **pydantic-ocsf Style Architecture** - Complete rewrite of type system using explicit interfaces
  - TypeScript interfaces now use type references instead of inlining nested types
  - Events export parser objects with `.parse()`, `.safeParse()`, and `.schema` properties
  - Objects export schemas directly (unchanged behavior)
  - Enables full schema composition for events via `.schema.extend()`, `.pick()`, `.omit()`, etc.

### Changed
- **Type Generation** - Schemas no longer use explicit `z.ZodType<T>` annotations
  - Preserves all Zod schema methods (`.extend()`, `.pick()`, `.omit()`, `.partial()`, etc.)
  - TypeScript inference still works correctly
  - **Breaking**: `z.infer<typeof Event>` → `z.infer<typeof Event.schema>` for events

- **File Size Reduction** - Source files are 90% smaller
  - Example: `account_change.ts` reduced from 2,621 lines to 267 lines
  - Type references used instead of massive inline type definitions
  - Dramatically improves TypeScript compilation speed and IDE performance

### Fixed
- **Event Schema Extension** - Events can now be extended via `.schema` property
  - Previous versions: `FileActivity.extend()` ❌ caused type errors (ZodPipe doesn't have .extend())
  - Now: `FileActivity.schema.extend({ custom: z.string() })` ✅ works perfectly
  - All Zod composition methods now work for events

- **IDE Type Hints** - Hover tooltips now show clean type references
  - Before: 900-line inlined type definitions
  - After: Clean references like `MetadataType`, `ActorType`, etc.
  - Prevents TypeScript language server crashes from huge types

### Breaking Changes

**For Events Only:**

1. **Schema Extension Access**
   ```typescript
   // Before (didn't work anyway):
   const Extended = FileActivity.extend({ custom: z.string() })  // ❌ Type error

   // After:
   const Extended = FileActivity.schema.extend({ custom: z.string() })  // ✅ Works!
   ```

2. **Type Inference** (multiple options available)
   ```typescript
   // Recommended (direct import):
   import type { FileActivityType } from "@mcm/ocsf/v1_7/events";

   // Alternative (infer from schema):
   type T = z.infer<typeof FileActivity.schema>;  // Note: .schema property

   // No longer works:
   type T = z.infer<typeof FileActivity>;  // ❌ FileActivity is parser object, not schema
   ```

3. **Object Schemas** (no breaking changes)
   ```typescript
   // Still works exactly the same:
   const ExtendedUser = User.extend({ custom: z.string() });
   type T = z.infer<typeof User>;
   ```

**Non-Breaking:**
- `.parse()` and `.safeParse()` work identically for both events and objects
- Sibling reconciliation unchanged
- UID pre-filling unchanged
- All validation behavior preserved

### Migration Guide

**Upgrading from 0.2.x:**

1. **Update type imports (events only):**
   ```typescript
   // Before:
   type T = z.infer<typeof FileActivity>;

   // After (option 1 - recommended):
   import type { FileActivityType } from "@mcm/ocsf/v1_7/events";

   // After (option 2):
   type T = z.infer<typeof FileActivity.schema>;
   ```

2. **Update schema extensions (events only):**
   ```typescript
   // Before (didn't work):
   const Extended = HttpActivity.extend({ ... });  // ❌ Type error

   // After:
   const Extended = HttpActivity.schema.extend({ ... });  // ✅ Works!
   ```

3. **Object usage unchanged** - No migration needed for object schemas

**Testing your migration:**
- Run TypeScript compiler: `npx tsc --noEmit`
- Search for `z.infer<typeof.*Activity>` patterns in events
- Search for `\.extend\(\)` on event schemas (not object schemas)

### Performance Improvements

- **90% smaller source files** - Faster IDE loading and TypeScript compilation
- **Faster type checking** - Type references instead of recursive inline expansion
- **Better IDE responsiveness** - No more TypeScript server crashes from huge types
- **Smaller declaration files** - `.d.ts` files use references, not full type expansion

### Technical Details

**Architecture Change:**
```typescript
// Objects (direct export - unchanged):
export interface UserType { name: string; ... }
export const User = z.strictObject({ name: z.string(), ... });

// Events (parser object - NEW):
export interface HttpActivityType {
  metadata: MetadataType;  // Reference, not inline!
  time: number;
  // ...
}
const HttpActivitySchema = z.strictObject({
  metadata: Metadata,  // Zod schema reference
  time: z.number(),
  // ...
});
export const HttpActivity = {
  parse: (data) => HttpActivitySchema.parse(preprocess(data)),
  safeParse: (data) => { /* ... */ },
  schema: HttpActivitySchema,  // Expose for composition
};
```

This pydantic-ocsf style architecture separates:
- Type definitions (TypeScript interfaces with references)
- Runtime validation (Zod schemas)
- Preprocessing logic (sibling reconciliation, UID prefilling)

All 752 schemas regenerated across OCSF v1.5.0, v1.6.0, and v1.7.0.

### Internal Changes

- `scripts/lib/event-emitter.ts`: Generate parser objects instead of direct schema exports
- `scripts/lib/object-emitter.ts`: Generate explicit interfaces with type references
- Removed `z.ZodType<T>` type annotations to preserve Zod methods
- All generated files use type imports: `import type { ... } from '...'`

## [0.2.0] - 2025-02-12

### Added
- **Schema Composition Support** - All OCSF schemas now support full Zod composition methods:
  - `.array()` - Create arrays with proper type inference
  - `.extend()` - Add custom fields to schemas
  - `.pick()` - Select specific fields
  - `.omit()` - Exclude specific fields
  - `.merge()` - Combine schemas
- New integration test suite for schema composition (`tests/integration/type-composition.test.ts`)
- Comprehensive type inference validation across all composition scenarios

### Changed
- **BREAKING (Internal)**: Schema generation now uses `z.infer<typeof Schema>` for type definitions instead of explicit TypeScript interfaces
  - **User Impact**: None - exported names remain the same, runtime behavior unchanged
  - **Benefit**: Full TypeScript type inference through composition operations
- Recursive objects now use getter pattern (Zod's recommended approach) instead of `z.lazy()` for self-references
- Event schemas use direct object references instead of `z.lazy()` wrappers
- Removed ~30,000 lines of redundant explicit interface definitions

### Fixed
- **Type Inference in Composition** - Fixed critical issue where composing schemas with `.array()`, `.extend()`, etc. resulted in `unknown` types instead of properly inferred types
  - Example: `User.array()` now correctly infers `UserType[]` instead of `unknown[]`
  - Enables proper IDE autocomplete and type checking for composed schemas
- Type information now preserved through all Zod composition operations

### Technical Details
- Schemas now export as: `export const User = z.object({...}); export type UserType = z.infer<typeof User>;`
- Recursive schemas use getters: `get parent() { return Process.optional(); }`
- All 887 generated schema files updated across OCSF v1.5.0, v1.6.0, and v1.7.0
- Zero breaking changes to public API - fully backward compatible

## [0.1.1] - 2025-02-11

### Fixed
- Incorrect exports in package.json

## [0.1.0] - 2025-02-11

### Added
- Initial release
- Complete OCSF schema coverage for v1.5.0, v1.6.0, and v1.7.0
- Type-safe Zod schemas for all events, objects, and enums
- Automatic sibling reconciliation (ID/label pairs)
- Automatic UID pre-filling (category_uid, class_uid, type_uid)
- Runtime validation with detailed error messages
- Universal support (Node.js and browsers)
- Full TypeScript inference
- ESM and CommonJS dual output

[0.3.1]: https://github.com/mcm/typescript-ocsf/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/mcm/typescript-ocsf/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/mcm/typescript-ocsf/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/mcm/typescript-ocsf/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mcm/typescript-ocsf/releases/tag/v0.1.0
