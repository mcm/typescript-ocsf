# typescript-ocsf

TypeScript library providing Zod schemas and runtime validation for the Open Cybersecurity Schema Framework (OCSF). The TypeScript equivalent of [pydantic-ocsf](https://github.com/mcm/pydantic-ocsf).

> **Note:** This is a community/personal project and is not officially endorsed or maintained by the OCSF organization. It is an independent implementation providing TypeScript support for OCSF schemas.

## Features

- **Complete OCSF Coverage** — Support for OCSF v1.5.0, v1.6.0, and v1.7.0
- **Type-Safe Schemas** — Full TypeScript inference with Zod schemas for all events, objects, and enums
- **Schema Composition** — Extend and compose schemas (events via `.schema.extend()`, objects directly)
- **Clean Type Hints** — Explicit interfaces with type references, not massive inlined types (90% smaller files)
- **Automatic Sibling Reconciliation** — Auto-fill label attributes from their ID counterparts (e.g., `activity_name` from `activity_id`)
- **Automatic UID Pre-filling** — Automatically populate `category_uid`, `class_uid`, and `type_uid` based on event type
- **Runtime Validation** — Validate OCSF events at runtime with detailed error messages
- **Universal** — Works in Node.js and browsers

## Installation

```bash
npm install @mcm/ocsf
```

## Quick Start

```typescript
import { FileActivity } from "@mcm/ocsf/v1_7/events";
import type { z } from "zod";

// Create a FileActivity event
const event = FileActivity.parse({
  time: Date.now(),
  severity_id: 1,
  activity_id: 1, // "Create"
  metadata: {
    version: "1.7.0",
    product: {
      name: "My Security Product",
      vendor_name: "My Company",
    },
  },
  file: {
    name: "document.pdf",
    type_id: 1,
  },
  device: {
    type_id: 0,
  },
  actor: {},
});

// Import the TypeScript type directly (recommended)
import type { FileActivityType } from "@mcm/ocsf/v1_7/events";

// Or infer from the schema
type FileActivityType2 = z.infer<typeof FileActivity.schema>;

// Sibling reconciliation automatically filled activity_name
console.log(event.activity_name); // "Create"

// UIDs are automatically populated
console.log(event.category_uid); // 1
console.log(event.class_uid); // 1001
console.log(event.type_uid); // 100101
```

## Usage Examples

### Creating an Event with Type Safety

```typescript
import { FileActivity } from "@mcm/ocsf/v1_7/events";
import type { z } from "zod";

// Infer TypeScript type from schema
type FileActivityEvent = z.infer<typeof FileActivity>;

const event: FileActivityEvent = {
  time: Date.now(),
  severity_id: 1,
  activity_id: 2, // "Update"
  metadata: {
    version: "1.7.0",
    product: {
      name: "EDR Platform",
      vendor_name: "Security Corp",
    },
  },
  file: {
    name: "config.json",
    type_id: 1,
    path: "/etc/app/config.json",
  },
  device: {
    type_id: 0,
  },
  actor: {
    user: {
      name: "admin",
      uid: "1000",
    },
  },
};

// Validate and transform
const validated = FileActivity.parse(event);
```

### Validating Incoming Events

```typescript
import { FileActivity } from "@mcm/ocsf/v1_7/events";

function handleIncomingEvent(rawData: unknown) {
  try {
    const event = FileActivity.parse(rawData);
    // event is now fully typed and validated
    console.log(`File ${event.file.name} was ${event.activity_name}`);
  } catch (error) {
    console.error("Invalid event:", error);
  }
}
```

### Sibling Attribute Reconciliation

OCSF has "sibling" pairs where an ID field (e.g., `severity_id`) has a corresponding label field (e.g., `severity`). This library automatically fills the label from the ID:

```typescript
import { FileActivity } from "@mcm/ocsf/v1_7/events";

const event = FileActivity.parse({
  time: Date.now(),
  severity_id: 3, // Medium severity
  activity_id: 1, // Create activity
  // ... other required fields
});

// Labels are automatically filled
console.log(event.severity); // "Medium"
console.log(event.activity_name); // "Create"

// You can also provide both explicitly
const event2 = FileActivity.parse({
  time: Date.now(),
  severity_id: 3,
  severity: "Medium",
  activity_id: 1,
  activity_name: "Create",
  // ... other required fields
});
```

### UID Pre-filling

OCSF events have three UID fields that identify the event type. This library automatically fills them:

```typescript
import { FileActivity } from "@mcm/ocsf/v1_7/events";

const event = FileActivity.parse({
  time: Date.now(),
  severity_id: 1,
  activity_id: 5, // "Delete"
  // ... other required fields
});

// UIDs are automatically populated
console.log(event.category_uid); // 1 (System Activity)
console.log(event.class_uid); // 1001 (File System Activity)
console.log(event.type_uid); // 100105 (File System Activity: Delete)

// type_uid is calculated as: class_uid * 100 + activity_id
```

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
  metadata: {
    version: "1.7.0",
    product: {
      name: "Security Platform",
      vendor_name: "Security Corp",
    },
  },
});

// Valid: Inherited base values (0=Unknown, 99=Other)
const event2 = IncidentFinding.parse({
  time: Date.now(),
  severity_id: 1,
  status_id: 0,  // "Unknown" - inherited from dictionary
  activity_id: 1,
  metadata: {
    version: "1.7.0",
    product: {
      name: "Security Platform",
      vendor_name: "Security Corp",
    },
  },
});

const event3 = IncidentFinding.parse({
  time: Date.now(),
  severity_id: 1,
  status_id: 99,  // "Other" - inherited from dictionary
  status: "Custom vendor status",
  activity_id: 1,
  metadata: {
    version: "1.7.0",
    product: {
      name: "Security Platform",
      vendor_name: "Security Corp",
    },
  },
});

// Invalid: Value not in enum
try {
  const invalid = IncidentFinding.parse({
    time: Date.now(),
    severity_id: 1,
    status_id: 999,  // ❌ ZodError: Invalid enum value
    activity_id: 1,
    metadata: {
      version: "1.7.0",
      product: {
        name: "Security Platform",
        vendor_name: "Security Corp",
      },
    },
  });
} catch (error) {
  console.error("Validation failed:", error);
}
```

**Enum Inheritance:**
- Event-specific enums inherit base values from the OCSF dictionary
- Most enums include `0: "Unknown"` and `99: "Other"` as base values
- Events can add or override specific enum values
- Validation ensures only defined enum values are accepted
- Sibling reconciliation works with validated enums (e.g., `status_id: 1` auto-fills `status: "New"`)

### Safe Parsing with Error Handling

```typescript
import { FileActivity } from "@mcm/ocsf/v1_7/events";

const result = FileActivity.safeParse(untrustedData);

if (result.success) {
  const event = result.data;
  // Process valid event
} else {
  console.error("Validation errors:", result.error.issues);
  // Handle validation failure
}
```

### Serialization

```typescript
import { FileActivity } from "@mcm/ocsf/v1_7/events";

const event = FileActivity.parse({
  // ... event data
});

// Serialize to JSON
const json = JSON.stringify(event);

// Parse JSON back to typed object
const parsed = FileActivity.parse(JSON.parse(json));
```

### Schema Composition

OCSF schemas support full Zod composition, enabling you to extend and customize schemas for your use case.

#### Extending Event Schemas

Events export a parser object with a `.schema` property that can be extended:

```typescript
import { z } from "zod";
import { HttpActivity } from "@mcm/ocsf/v1_7/events";

// Extend event schema with custom vendor fields
const ExtendedHttpActivity = HttpActivity.schema.extend({
  vendor_trace_id: z.string().optional(),
  internal_priority: z.number().int().min(1).max(10).optional(),
});

// Parse with extended schema
const event = ExtendedHttpActivity.parse({
  // ... standard OCSF fields
  metadata: {
    version: "1.7.0",
    product: { name: "Web Server", vendor_name: "ACME" },
  },
  severity_id: 1,
  time: Date.now(),
  category_uid: 4,
  class_uid: 4002,
  type_uid: 400201,
  // Custom fields
  vendor_trace_id: "trace-abc-123",
  internal_priority: 7,
});

// All Zod methods work on the schema property
const MinimalEvent = HttpActivity.schema.pick({ time: true, severity_id: true });
const PartialEvent = HttpActivity.schema.partial();
const PublicEvent = HttpActivity.schema.omit({ actor: true, device: true });
```

#### Extending Object Schemas

Objects can be extended directly:

```typescript
import { z } from "zod";
import { User } from "@mcm/ocsf/v1_7/objects";

// Extend a schema with custom fields
const ExtendedUser = User.extend({
  department: z.string().optional(),
  manager_uid: z.string().optional(),
});

type ExtendedUserType = z.infer<typeof ExtendedUser>;

// Create arrays with proper type inference
const UserList = z.object({
  users: User.array(),
  total: z.number(),
});

type UserListType = z.infer<typeof UserList>;
// users is typed as UserType[], not unknown[]!

// Pick specific fields
const UserSubset = User.pick({
  name: true,
  uid: true,
  email_addr: true,
});

// Omit fields
const UserWithoutGroups = User.omit({
  groups: true,
});

// Merge schemas
const UserWithTimestamps = User.merge(z.object({
  created_at: z.number(),
  updated_at: z.number(),
}));
```

All composition operations preserve full TypeScript type inference and IDE autocomplete support.

### Type Inference and Clean Type Hints

This library uses explicit TypeScript interfaces with type references, providing clean IDE hints and minimal type complexity:

```typescript
import type { HttpActivityType, MetadataType, ActorType } from "@mcm/ocsf/v1_7/events";

// Types use references, not massive inline structures
const metadata: MetadataType = {
  version: "1.7.0",
  product: { name: "Web Server", vendor_name: "ACME" },
};

// Hover over variables in your IDE to see clean, referenced types
// Not 900-line inlined type definitions!
const activity: HttpActivityType = HttpActivity.parse({
  metadata,
  severity_id: 1,
  time: Date.now(),
  category_uid: 4,
  class_uid: 4002,
  type_uid: 400201,
});

// Type inference works multiple ways:
type T1 = HttpActivityType;                        // Direct import (recommended)
type T2 = z.infer<typeof HttpActivity.schema>;     // From schema
type T3 = typeof activity;                         // From parsed value
```

**Benefits:**
- 90% smaller source files (267 lines vs 2,621 lines)
- Clean IDE hover hints with type references
- Faster TypeScript compilation
- No TypeScript server crashes from huge types

## Version-Specific Imports

### Importing from Specific OCSF Versions

```typescript
// Import from v1.7.0 (latest)
import { FileActivity } from "@mcm/ocsf/v1_7/events";
import { File } from "@mcm/ocsf/v1_7/objects";
import { ActivityId } from "@mcm/ocsf/v1_7/enums";

// Import from v1.6.0
import { FileActivity } from "@mcm/ocsf/v1_6/events";

// Import from v1.5.0
import { FileActivity } from "@mcm/ocsf/v1_5/events";
```

### Default Import (Latest Version)

```typescript
// Imports from v1.7.0 by default
import { FileActivity } from "@mcm/ocsf";
```

### Namespace-Specific Imports

```typescript
// Import all events from a version
import * as Events from "@mcm/ocsf/v1_7/events";
const event = Events.FileActivity.parse(data);

// Import all objects
import * as Objects from "@mcm/ocsf/v1_7/objects";
const file = Objects.File.parse(data);

// Import all enums
import * as Enums from "@mcm/ocsf/v1_7/enums";
console.log(Enums.ActivityId.enum.Create); // 1
```

## API Reference

The library exports Zod schemas organized by version and namespace:

```
@mcm/ocsf
├── v1_7/
│   ├── events/       # All event classes (FileActivity, ProcessActivity, etc.)
│   ├── objects/      # All object classes (File, Process, Actor, etc.)
│   └── enums/        # All enumeration schemas (ActivityId, SeverityId, etc.)
├── v1_6/
│   └── ...
└── v1_5/
    └── ...
```

Each schema is a Zod schema that can be used for:

- `.parse(data)` — Parse and validate (throws on error)
- `.safeParse(data)` — Parse and validate (returns result object)
- `z.infer<typeof Schema>` — Extract TypeScript type

Full TypeDoc documentation coming soon.

## Migration to v0.3.0

**Breaking Changes:**

1. **Event Schema Extension**
   - Before: `FileActivity.extend()` ❌ (didn't work)
   - After: `FileActivity.schema.extend()` ✅

2. **Type Inference**
   - Before: `type T = z.infer<typeof FileActivity>`
   - After (recommended): `import type { FileActivityType } from "@mcm/ocsf/v1_7/events"`
   - After (alternative): `type T = z.infer<typeof FileActivity.schema>`

3. **Object Schema Extension** (no change)
   - Still works: `User.extend({ custom: z.string() })`

**Non-Breaking:**
- `.parse()` and `.safeParse()` work exactly the same
- Object composition unchanged
- All sibling reconciliation and UID prefilling unchanged

## Development

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/mcm/typescript-ocsf.git
cd typescript-ocsf

# Install dependencies
npm install

# Download OCSF schemas
npm run download

# Generate TypeScript schemas
npm run generate

# Build the library
npm run build

# Run tests
npm run test
```

## Scripts

- `npm run download` — Download OCSF schemas from the official repository (v1.5.0, v1.6.0, v1.7.0)
- `npm run generate` — Generate Zod schemas from OCSF JSON schemas
- `npm run build` — Build the library for distribution (ESM and CommonJS)
- `npm run test` — Run all tests (unit and integration)
- `npm run test:watch` — Run tests in watch mode
- `npm run test:coverage` — Run tests with coverage report
- `npm run typecheck` — Type-check the codebase without building
- `npm run lint` — Lint code with Biome
- `npm run lint:fix` — Lint and auto-fix issues
- `npm run format` — Format code with Biome

## License

Apache 2.0

## Links

- [OCSF Website](https://ocsf.io/)
- [OCSF GitHub](https://github.com/ocsf/ocsf-schema)
- [OCSF Documentation](https://schema.ocsf.io/)
- [pydantic-ocsf](https://github.com/mcm/pydantic-ocsf) — Python equivalent using Pydantic
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) — TypeScript-first schema validation

## Contributing

Contributions are welcome! Please open an issue or pull request on GitHub.

## About

This library is part of the OCSF ecosystem, providing TypeScript developers with type-safe, validated OCSF event handling. It mirrors the functionality of pydantic-ocsf for Python, bringing the same level of type safety and runtime validation to the TypeScript/JavaScript ecosystem.
