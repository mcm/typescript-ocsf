import { describe, expect, it } from "vitest";
import { mapOcsfTypeToTs, mapOcsfTypeToZod } from "../../scripts/lib/type-map.js";

describe("mapOcsfTypeToZod", () => {
  it("maps primitive types correctly", () => {
    expect(mapOcsfTypeToZod("string_t")).toBe("z.string()");
    expect(mapOcsfTypeToZod("integer_t")).toBe("z.number().int()");
    expect(mapOcsfTypeToZod("boolean_t")).toBe("z.boolean()");
    expect(mapOcsfTypeToZod("float_t")).toBe("z.number()");
  });

  it("maps timestamp type correctly", () => {
    expect(mapOcsfTypeToZod("timestamp_t")).toBe("z.number().int()");
  });

  it("maps string subtypes correctly", () => {
    expect(mapOcsfTypeToZod("ip_t")).toBe("z.string()");
    expect(mapOcsfTypeToZod("email_t")).toBe("z.string()");
    expect(mapOcsfTypeToZod("url_t")).toBe("z.string()");
    expect(mapOcsfTypeToZod("uuid_t")).toBe("z.string()");
  });

  it("maps json_t to record", () => {
    expect(mapOcsfTypeToZod("json_t")).toBe("z.record(z.unknown())");
  });

  it("returns z.unknown() for unmapped types", () => {
    expect(mapOcsfTypeToZod("unknown_type")).toBe("z.unknown()");
    expect(mapOcsfTypeToZod("custom_t")).toBe("z.unknown()");
  });
});

describe("mapOcsfTypeToTs", () => {
  it("maps primitive types correctly", () => {
    expect(mapOcsfTypeToTs("string_t")).toBe("string");
    expect(mapOcsfTypeToTs("integer_t")).toBe("number");
    expect(mapOcsfTypeToTs("boolean_t")).toBe("boolean");
    expect(mapOcsfTypeToTs("float_t")).toBe("number");
  });

  it("maps timestamp type correctly", () => {
    expect(mapOcsfTypeToTs("timestamp_t")).toBe("number");
  });

  it("maps string subtypes correctly", () => {
    expect(mapOcsfTypeToTs("ip_t")).toBe("string");
    expect(mapOcsfTypeToTs("email_t")).toBe("string");
    expect(mapOcsfTypeToTs("url_t")).toBe("string");
  });

  it("maps json_t to Record type", () => {
    expect(mapOcsfTypeToTs("json_t")).toBe("Record<string, unknown>");
  });

  it("returns unknown for unmapped types", () => {
    expect(mapOcsfTypeToTs("unknown_type")).toBe("unknown");
    expect(mapOcsfTypeToTs("custom_t")).toBe("unknown");
  });
});
