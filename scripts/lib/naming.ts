/**
 * Convert snake_case OCSF name to PascalCase TypeScript name.
 *
 * All segments are treated as regular words -- no special acronym handling.
 * This ensures deterministic, predictable output:
 *   file_activity -> FileActivity
 *   dns_activity  -> DnsActivity  (NOT DNSActivity)
 *   http_activity -> HttpActivity (NOT HTTPActivity)
 *   _entity       -> Entity       (leading underscores stripped)
 *
 * @param snakeName - The OCSF schema name (snake_case)
 * @returns PascalCase name
 */
export function toClassName(snakeName: string): string {
  // Strip leading underscores (used for abstract base objects like _entity)
  const cleaned = snakeName.replace(/^_+/, "");
  return cleaned
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
    .join("");
}

/**
 * Convert a caption string to an UPPER_SNAKE_CASE enum member name.
 *
 * Examples:
 *   "Create"          -> "CREATE"
 *   "Set Attributes"  -> "SET_ATTRIBUTES"
 *   "Get Security"    -> "GET_SECURITY"
 *   "Unknown"         -> "UNKNOWN"
 *   "Other"           -> "OTHER"
 *   "Regular File"    -> "REGULAR_FILE"
 *
 * @param caption - The OCSF enum caption
 * @returns UPPER_SNAKE_CASE member name
 */
export function toEnumMember(caption: string): string {
  let name = caption
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();

  // Ensure starts with letter
  if (name && /^[0-9]/.test(name)) {
    name = `V_${name}`;
  }

  return name || "UNKNOWN";
}

/**
 * Convert a version string to a directory slug.
 *
 * "1.7.0" -> "v1_7"  (patch version dropped for brevity)
 *
 * @param version - OCSF version string like "1.7.0"
 * @returns Directory slug like "v1_7"
 */
export function toVersionSlug(version: string): string {
  const [major, minor] = version.split(".");
  return `v${major}_${minor}`;
}

/**
 * Convert a PascalCase name to a snake_case file name (without extension).
 *
 * "FileActivity" -> "file_activity"
 * "DnsActivity"  -> "dns_activity"
 *
 * @param className - PascalCase name
 * @returns snake_case file name
 */
export function toFileName(className: string): string {
  return className
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
}
