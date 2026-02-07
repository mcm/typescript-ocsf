/**
 * Maps OCSF type strings to their Zod schema representation.
 *
 * The returned string is a Zod expression that will be emitted into
 * generated TypeScript source code.
 */
export function mapOcsfTypeToZod(ocsfType: string): string {
  const TYPE_MAP: Record<string, string> = {
    // Primitive types
    string_t: "z.string()",
    integer_t: "z.number().int()",
    long_t: "z.number().int()",
    boolean_t: "z.boolean()",
    float_t: "z.number()",
    double_t: "z.number()",
    json_t: "z.record(z.unknown())",
    bytestring_t: "z.string()",

    // Timestamp
    timestamp_t: "z.number().int()",

    // String subtypes (all validate as strings)
    ip_t: "z.string()",
    mac_t: "z.string()",
    email_t: "z.string()",
    url_t: "z.string()",
    hostname_t: "z.string()",
    uuid_t: "z.string()",
    subnet_t: "z.string()",
    file_name_t: "z.string()",
    file_path_t: "z.string()",
    process_name_t: "z.string()",
    username_t: "z.string()",
    file_hash_t: "z.string()",
    resource_uid_t: "z.string()",
    path_t: "z.string()",
    fingerprint_t: "z.string()",
    port_t: "z.number().int()",
    datetime_t: "z.string()",
    country_t: "z.string()",
    cidr_t: "z.string()",
  };

  return TYPE_MAP[ocsfType] ?? "z.unknown()";
}

/**
 * Maps OCSF type to a TypeScript type string (for explicit interface definitions
 * used with z.lazy() circular references).
 */
export function mapOcsfTypeToTs(ocsfType: string): string {
  const TYPE_MAP: Record<string, string> = {
    string_t: "string",
    integer_t: "number",
    long_t: "number",
    boolean_t: "boolean",
    float_t: "number",
    double_t: "number",
    json_t: "Record<string, unknown>",
    bytestring_t: "string",
    timestamp_t: "number",
    ip_t: "string",
    mac_t: "string",
    email_t: "string",
    url_t: "string",
    hostname_t: "string",
    uuid_t: "string",
    subnet_t: "string",
    file_name_t: "string",
    file_path_t: "string",
    process_name_t: "string",
    username_t: "string",
    file_hash_t: "string",
    resource_uid_t: "string",
    path_t: "string",
    fingerprint_t: "string",
    port_t: "number",
    datetime_t: "string",
    country_t: "string",
    cidr_t: "string",
  };

  return TYPE_MAP[ocsfType] ?? "unknown";
}
