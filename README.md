# typescript-ocsf

TypeScript library providing Zod schemas and runtime validation for the Open Cybersecurity Schema Framework (OCSF). The TypeScript equivalent of [pydantic-ocsf](https://github.com/mcm/pydantic-ocsf).

> **Note:** This is a community/personal project and is not officially endorsed or maintained by the OCSF organization. It is an independent implementation providing TypeScript support for OCSF schemas.

## Features

- **Complete OCSF Coverage** — Support for OCSF v1.5.0, v1.6.0, and v1.7.0
- **Type-Safe Schemas** — Full TypeScript inference with Zod schemas for all events, objects, and enums
- **Schema Composition** — Extend and compose schemas with `.array()`, `.extend()`, `.pick()`, `.omit()`, `.merge()`
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

// TypeScript knows the full type
type FileActivityType = z.infer<typeof FileActivity>;

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

OCSF schemas support full Zod composition, enabling you to extend and customize schemas for your use case:

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
