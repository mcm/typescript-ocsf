# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.2.0]: https://github.com/mcm/typescript-ocsf/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/mcm/typescript-ocsf/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/mcm/typescript-ocsf/releases/tag/v0.1.0
