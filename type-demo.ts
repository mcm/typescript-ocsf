/**
 * Type Hints & Schema Extension Demo
 *
 * This file demonstrates the improvements with Pydantic-style explicit interfaces.
 *
 * 🎯 TO SEE THE MAGIC:
 * 1. Open this file in VS Code
 * 2. Hover over variables below marked with 👈
 * 3. Notice clean type references instead of 2,621-line inline types!
 */

import { z } from 'zod';
import { FileActivity } from './src/v1_7/events/file_activity.js';
import { HttpActivity } from './src/v1_7/events/http_activity.js';

// ============================================================================
// ✅ TYPE HINTS - Clean References (Not Massive Inline Types!)
// ============================================================================

// 👈 Hover over 'activity' - see HttpActivityType (not 900 lines of inlined types!)
const activity = HttpActivity.parse({
  metadata: {
    version: "1.7.0",
    product: {
      name: "Web Server",
      vendor_name: "ACME",
    },
  },
  severity_id: 1,
  time: Date.now(),
  category_uid: 4,
  class_uid: 4002,
  type_uid: 400201,
  http_request: {
    url: {
      text: "https://example.com",
    },
  },
});

// 👈 Hover over activity.metadata - see MetadataType (clean reference!)
console.log(activity.metadata.version);

// 👈 Hover over activity.http_request - see HttpRequestType (reference!)
console.log(activity.http_request?.url?.text);

// ============================================================================
// ✅ SCHEMA EXTENSION - Now Possible via .schema Property!
// ============================================================================

// ❌ BEFORE: FileActivity.extend() - ERROR! ZodPipe doesn't have .extend()
// ✅ AFTER: FileActivity.schema.extend() - Works perfectly!

const ExtendedFileActivity = FileActivity.schema.extend({
  // Add custom vendor fields
  vendor_trace_id: z.string().optional(),
  internal_priority: z.number().int().min(1).max(10).optional(),
  custom_tags: z.array(z.string()).optional(),
});

// Parse with the extended schema
const extendedFile = ExtendedFileActivity.parse({
  metadata: {
    version: "1.7.0",
    product: {
      name: "File Monitor",
      vendor_name: "Security Co",
    },
  },
  severity_id: 2,
  time: Date.now(),
  category_uid: 1,
  class_uid: 1001,
  type_uid: 100101,
  activity_id: 1,
  file: {
    name: "document.pdf",
    type_id: 1,
  },
  device: {
    type_id: 0,
  },
  actor: {},
  // 🎉 Custom fields work!
  vendor_trace_id: "trace-abc-123",
  internal_priority: 7,
  custom_tags: ["monitored", "sensitive"],
});

console.log("Extended file activity:", extendedFile);
console.log("  Custom trace ID:", extendedFile.vendor_trace_id);
console.log("  Internal priority:", extendedFile.internal_priority);
console.log("  Custom tags:", extendedFile.custom_tags);

// ============================================================================
// ✅ OTHER SCHEMA METHODS - Pick, Omit, Partial, etc.
// ============================================================================

// Create a minimal schema with only specific fields
const MinimalFileActivity = FileActivity.schema.pick({
  time: true,
  severity_id: true,
  activity_id: true,
  file: true,
});

// Make all fields optional
const PartialHttpActivity = HttpActivity.schema.partial();

// Omit sensitive fields
const PublicFileActivity = FileActivity.schema.omit({
  actor: true,
  device: true,
});

console.log("Schema methods work: pick, omit, partial, etc. ✅");

// ============================================================================
// ✅ SIBLING RECONCILIATION - Still Works Automatically!
// ============================================================================

const autoFilled = FileActivity.parse({
  metadata: {
    version: "1.7.0",
    product: {
      name: "File Monitor",
      vendor_name: "Security Co",
    },
  },
  time: Date.now(),
  severity_id: 3, // Medium
  activity_id: 2, // Read
  file: {
    name: "data.json",
    type_id: 1,
  },
  device: {
    type_id: 0,
  },
  actor: {},
  // 🎉 activity_name and severity auto-filled from IDs!
  // 🎉 category_uid, class_uid, type_uid auto-filled!
});

console.log("\nAuto-filled values:");
console.log("  activity_name:", autoFilled.activity_name); // "Read"
console.log("  severity:", autoFilled.severity); // "Medium"
console.log("  category_uid:", autoFilled.category_uid); // 1
console.log("  class_uid:", autoFilled.class_uid); // 1001
console.log("  type_uid:", autoFilled.type_uid); // 100102

// ============================================================================
// 📊 BEFORE vs AFTER
// ============================================================================

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 IMPROVEMENTS:

✅ File Size: 2,621 lines → 267 lines (90% reduction!)
✅ Type Hints: Clean references like "MetadataType" instead of 900-line inline types
✅ Schema Extension: .schema.extend() now works for events 🎉
✅ Schema Methods: .pick(), .omit(), .partial() all work
✅ IDE Performance: No more TypeScript server crashes from huge types
✅ Backward Compatible: .parse() and .safeParse() work exactly the same

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 HOW TO SEE THE IMPROVEMENTS:

1. Hover over 'activity' variable (line 23) - see HttpActivityType
2. Hover over 'activity.metadata' - see MetadataType (not 50 inline fields!)
3. Try extending: FileActivity.schema.extend({ custom: z.string() })
4. Compare file sizes:
   - git show feat/enum-validation-refine:src/v1_7/events/account_change.ts | wc -l
   - wc -l src/v1_7/events/account_change.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
