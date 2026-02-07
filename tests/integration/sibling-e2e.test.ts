import { describe, expect, it } from "vitest";

/**
 * Helper function to create a minimal valid FileActivity event
 * with all required fields populated to pass schema validation.
 */
function createMinimalEvent() {
  return {
    time: Date.now(),
    severity_id: 1,
    metadata: {
      version: "1.7.0",
      product: {
        name: "Test Product",
        vendor_name: "Test Vendor",
      },
    },
    actor: {},
    device: { type_id: 0 },
    file: {
      name: "test.txt",
      type_id: 1,
    },
  };
}

describe("FileActivity sibling + UID integration (end-to-end)", () => {
  it("1. Auto-fills activity_name from activity_id", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 1,
    };

    const result = FileActivity.parse(input);

    expect(result.activity_id).toBe(1);
    expect(result.activity_name).toBe("Create");
  });

  it("2. Auto-fills all UIDs (category_uid, class_uid, type_uid)", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 2,
    };

    const result = FileActivity.parse(input);

    // UIDs should be auto-filled by prefillUids
    expect(result.category_uid).toBe(1);
    expect(result.class_uid).toBe(1001);
    expect(result.type_uid).toBe(100102); // class_uid * 100 + activity_id
  });

  it("3. Preserves extra/unmapped fields", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 3,
      custom_field: "custom_value",
      another_field: 123,
    };

    const result = FileActivity.parse(input);

    // FileActivity uses .passthrough() so extra fields are preserved
    expect((result as Record<string, unknown>).custom_field).toBe("custom_value");
    expect((result as Record<string, unknown>).another_field).toBe(123);
    expect(result.activity_id).toBe(3);
    expect(result.activity_name).toBe("Update");
  });

  it("4. Rejects mismatched sibling pairs", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 1,
      activity_name: "Delete", // Mismatch: 1 = "Create", not "Delete"
    };

    // reconcileSiblings throws an error for mismatched pairs
    // safeParse will catch this and return { success: false }
    // However, because it's thrown in preprocessing, it actually throws
    expect(() => FileActivity.safeParse(input)).toThrow(
      "activity_id=1 (Create) does not match activity_name='Delete'",
    );
  });

  it("5. Serialization includes both ID and label", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 2,
    };

    const result = FileActivity.parse(input);

    // Serialize and deserialize to verify both fields persist
    const serialized = JSON.stringify(result);
    const deserialized = JSON.parse(serialized);

    expect(deserialized.activity_id).toBe(2);
    expect(deserialized.activity_name).toBe("Read");
  });

  it("6. Multiple sibling pairs handled independently", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 4,
      severity_id: 3,
      status_id: 1,
    };

    const result = FileActivity.parse(input);

    // All three sibling pairs should be reconciled
    expect(result.activity_id).toBe(4);
    expect(result.activity_name).toBe("Delete");
    expect(result.severity_id).toBe(3);
    expect(result.severity).toBe("Medium");
    expect(result.status_id).toBe(1);
    expect(result.status).toBe("Success");
  });

  it("7. Custom label preserved for OTHER (99)", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 99,
      activity_name: "Custom Activity",
    };

    const result = FileActivity.parse(input);

    expect(result.activity_id).toBe(99);
    expect(result.activity_name).toBe("Custom Activity");
  });

  it("8. Auto-fills activity_id from known label", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_name: "Rename",
    };

    const result = FileActivity.parse(input);

    expect(result.activity_id).toBe(5);
    expect(result.activity_name).toBe("Rename");
  });

  it("9. User-provided UIDs take precedence", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_id: 1,
      category_uid: 999,
      class_uid: 888,
      type_uid: 777,
    };

    const result = FileActivity.parse(input);

    // User-provided UIDs should NOT be overwritten
    expect(result.category_uid).toBe(999);
    expect(result.class_uid).toBe(888);
    expect(result.type_uid).toBe(777);
  });

  it("10. Case-insensitive label matching", async () => {
    const { FileActivity } = await import("../../src/v1_7/events/file_activity.js");

    const input = {
      ...createMinimalEvent(),
      activity_name: "encrypt", // lowercase
    };

    const result = FileActivity.parse(input);

    expect(result.activity_id).toBe(10);
    expect(result.activity_name).toBe("Encrypt"); // Normalized to canonical form
  });
});
