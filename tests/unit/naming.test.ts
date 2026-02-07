import { describe, expect, it } from "vitest";
import { toClassName, toEnumMember, toFileName, toVersionSlug } from "../../scripts/lib/naming.js";

describe("toClassName", () => {
  it("converts snake_case to PascalCase", () => {
    expect(toClassName("file_activity")).toBe("FileActivity");
    expect(toClassName("user")).toBe("User");
    expect(toClassName("security_finding")).toBe("SecurityFinding");
  });

  it("treats acronyms as regular words", () => {
    expect(toClassName("dns_activity")).toBe("DnsActivity");
    expect(toClassName("http_activity")).toBe("HttpActivity");
    expect(toClassName("tls_activity")).toBe("TlsActivity");
    expect(toClassName("api_activity")).toBe("ApiActivity");
  });

  it("strips leading underscores", () => {
    expect(toClassName("_entity")).toBe("Entity");
    expect(toClassName("_resource")).toBe("Resource");
    expect(toClassName("_dns")).toBe("Dns");
  });
});

describe("toEnumMember", () => {
  it("converts captions to UPPER_SNAKE_CASE", () => {
    expect(toEnumMember("Create")).toBe("CREATE");
    expect(toEnumMember("Set Attributes")).toBe("SET_ATTRIBUTES");
    expect(toEnumMember("Get Security")).toBe("GET_SECURITY");
    expect(toEnumMember("Regular File")).toBe("REGULAR_FILE");
  });

  it("handles special characters", () => {
    expect(toEnumMember("TLS/SSL")).toBe("TLS_SSL");
  });

  it("prefixes numeric starts with V_", () => {
    expect(toEnumMember("3DES")).toBe("V_3DES");
  });
});

describe("toVersionSlug", () => {
  it("converts version to slug", () => {
    expect(toVersionSlug("1.7.0")).toBe("v1_7");
    expect(toVersionSlug("1.5.0")).toBe("v1_5");
    expect(toVersionSlug("1.6.0")).toBe("v1_6");
  });
});

describe("toFileName", () => {
  it("converts PascalCase to snake_case", () => {
    expect(toFileName("FileActivity")).toBe("file_activity");
    expect(toFileName("DnsActivity")).toBe("dns_activity");
    expect(toFileName("User")).toBe("user");
  });
});
