/**
 * A single attribute (field) in an OCSF object or event.
 */
export interface ParsedAttribute {
  /** The attribute name (snake_case), e.g. "activity_id". */
  name: string;
  /** The OCSF type string, e.g. "string_t", "integer_t", "object_t", etc. */
  ocsfType: string;
  /** For object_t attributes, the object type name, e.g. "file", "process". */
  objectType?: string;
  /** Whether this attribute is an array. */
  isArray: boolean;
  /** Requirement level: "required", "recommended", or "optional". */
  requirement: "required" | "recommended" | "optional";
  /** Description from OCSF schema (used in JSDoc). */
  description: string;
  /** Caption from OCSF schema. */
  caption: string;
  /** Sibling label field name, if this is an _id field. */
  sibling?: string;
  /** Enum values, if this attribute has inline enum definitions. */
  enumValues?: ParsedEnumValue[];
  /** Deprecation info, if any. */
  deprecated?: { message: string; since: string };
  /** OCSF group (classification, primary, context, occurrence). */
  group?: string;
}

/**
 * A single enum value definition.
 */
export interface ParsedEnumValue {
  /** Integer value (as number). */
  value: number;
  /** Human-readable caption, e.g. "Create", "Delete". */
  caption: string;
  /** Optional description. */
  description?: string;
}

/**
 * A parsed OCSF object definition (e.g., File, User, Process).
 */
export interface ParsedObject {
  /** Schema key (snake_case), e.g. "file", "user". */
  name: string;
  /** PascalCase class name, e.g. "File", "User". */
  className: string;
  /** OCSF caption. */
  caption: string;
  /** OCSF description. */
  description: string;
  /** Parent object name (from extends), e.g. "_entity". Undefined for root. */
  extends?: string;
  /** All attributes after inheritance resolution. */
  attributes: ParsedAttribute[];
  /** Whether this object participates in a circular reference cycle. */
  isInCycle: boolean;
  /** Objects referenced by this object's attributes. */
  references: string[];
  /** Observable type ID, if any. */
  observable?: number;
  /** Constraints from schema. */
  constraints?: Record<string, string[]>;
}

/**
 * A parsed OCSF event class definition (e.g., FileActivity, DnsActivity).
 */
export interface ParsedEvent {
  /** Schema key (snake_case), e.g. "file_activity". */
  name: string;
  /** PascalCase class name, e.g. "FileActivity". */
  className: string;
  /** OCSF caption. */
  caption: string;
  /** OCSF description. */
  description: string;
  /** Parent event name (from extends), e.g. "system". */
  extends?: string;
  /** OCSF category key, e.g. "system", "network". */
  category: string;
  /** category_uid (integer). */
  categoryUid: number;
  /** class_uid (integer) -- the event's UID within its category. */
  classUid: number;
  /** All attributes after inheritance resolution. */
  attributes: ParsedAttribute[];
  /** Sibling pairs detected in this event's attributes. */
  siblingPairs: ParsedSiblingPair[];
  /** Objects referenced by this event's attributes. */
  references: string[];
}

/**
 * A sibling _id/label pair.
 */
export interface ParsedSiblingPair {
  /** The _id field name, e.g. "activity_id". */
  idField: string;
  /** The label field name, e.g. "activity_name" or "activity". */
  labelField: string;
  /** Enum values for this sibling pair. */
  enumValues: ParsedEnumValue[];
}

/**
 * A standalone enum definition (shared across multiple schemas).
 */
export interface ParsedEnum {
  /** Enum name in PascalCase, e.g. "SeverityId". */
  name: string;
  /** The originating attribute name, e.g. "severity_id". */
  attributeName: string;
  /** Caption. */
  caption: string;
  /** Enum values. */
  values: ParsedEnumValue[];
}

/**
 * The fully parsed and resolved schema for a single OCSF version.
 */
export interface ParsedSchema {
  /** OCSF version string, e.g. "1.7.0". */
  version: string;
  /** Version slug for directory names, e.g. "v1_7". */
  versionSlug: string;
  /** All parsed objects, keyed by schema name (snake_case). */
  objects: Map<string, ParsedObject>;
  /** All parsed events, keyed by schema name (snake_case). */
  events: Map<string, ParsedEvent>;
  /** Shared enum definitions. */
  enums: Map<string, ParsedEnum>;
  /** Category name -> uid mapping. */
  categories: Map<string, number>;
}
