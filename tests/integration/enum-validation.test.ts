import { describe, expect, it } from "vitest";
import type { z } from "zod";
import { IncidentFinding } from "../../src/v1_7/events/incident_finding.js";
import type { FindingInfo } from "../../src/v1_7/objects/finding_info.js";

/**
 * Helper function to create a minimal valid IncidentFinding event
 * with all required fields populated to pass schema validation.
 */
function createMinimalIncidentFinding() {
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
    finding_info_list: [
      {
        title: "Test Finding",
        uid: "test-finding-1",
      } as z.infer<typeof FindingInfo>,
    ],
  };
}

describe("IncidentFinding enum validation", () => {
  it("accepts valid status_id values (1-5)", () => {
    for (const status_id of [1, 2, 3, 4, 5]) {
      const input = {
        ...createMinimalIncidentFinding(),
        status_id,
        activity_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(true);
    }
  });

  it("accepts UNKNOWN (0) from enum inheritance", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status_id: 0,
      activity_id: 1,
    };

    const result = IncidentFinding.safeParse(input);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.status_id).toBe(0);
      expect(result.data.status).toBe("Unknown");
    }
  });

  it("accepts OTHER (99) from enum inheritance", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status_id: 99,
      activity_id: 1,
    };

    const result = IncidentFinding.safeParse(input);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.status_id).toBe(99);
      expect(result.data.status).toBe("Other");
    }
  });

  it("rejects invalid status_id values", () => {
    for (const status_id of [6, 7, 8, 98, 100, 999, -1]) {
      const input = {
        ...createMinimalIncidentFinding(),
        status_id,
        activity_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(false);

      if (!result.success) {
        // Should contain an error about invalid union type
        const hasUnionError = result.error.issues.some((issue) => issue.code === "invalid_union");
        expect(hasUnionError).toBe(true);
      }
    }
  });

  it("accepts valid activity_id values (0, 1, 2, 3, 99)", () => {
    for (const activity_id of [0, 1, 2, 3, 99]) {
      const input = {
        ...createMinimalIncidentFinding(),
        activity_id,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid activity_id values", () => {
    for (const activity_id of [4, 5, 10, 100, -1]) {
      const input = {
        ...createMinimalIncidentFinding(),
        activity_id,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(false);
    }
  });

  it("accepts valid severity_id values (0-6, 99)", () => {
    for (const severity_id of [0, 1, 2, 3, 4, 5, 6, 99]) {
      const input = {
        ...createMinimalIncidentFinding(),
        severity_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid severity_id values", () => {
    for (const severity_id of [7, 8, 100, -1]) {
      const input = {
        ...createMinimalIncidentFinding(),
        severity_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(false);
    }
  });
});

describe("IncidentFinding sibling reconciliation with validated enums", () => {
  it("reconciles known status label to id", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status: "New",
      activity_id: 1,
    };

    const result = IncidentFinding.parse(input);

    expect(result.status_id).toBe(1);
    expect(result.status).toBe("New");
  });

  it("reconciles inherited Unknown (0) status label", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status: "Unknown",
      activity_id: 1,
    };

    const result = IncidentFinding.parse(input);

    expect(result.status_id).toBe(0);
    expect(result.status).toBe("Unknown");
  });

  it("reconciles inherited Other (99) status label", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status: "Other",
      activity_id: 1,
    };

    const result = IncidentFinding.parse(input);

    expect(result.status_id).toBe(99);
    expect(result.status).toBe("Other");
  });

  it("maps unknown status label to OTHER (99) when available", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status: "Custom Vendor Status",
      activity_id: 1,
    };

    const result = IncidentFinding.parse(input);

    // Should map to OTHER (99) since it exists in the enum
    expect(result.status_id).toBe(99);
    expect(result.status).toBe("Custom Vendor Status");
  });

  it("reconciles activity label to inherited enum value", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      activity_name: "Create",
      status_id: 1,
    };

    const result = IncidentFinding.parse(input);

    expect(result.activity_id).toBe(1);
    expect(result.activity_name).toBe("Create");
  });

  it("handles multiple sibling pairs with inherited enums", () => {
    // Don't use the helper to avoid default severity_id
    const input = {
      time: Date.now(),
      metadata: {
        version: "1.7.0",
        product: {
          name: "Test Product",
          vendor_name: "Test Vendor",
        },
      },
      finding_info_list: [
        {
          title: "Test Finding",
          uid: "test-finding-1",
        } as z.infer<typeof FindingInfo>,
      ],
      status: "In Progress",
      activity_name: "Update",
      severity: "High",
    };

    const result = IncidentFinding.parse(input);

    // All should be reconciled to their IDs
    expect(result.status_id).toBe(2);
    expect(result.status).toBe("In Progress");
    expect(result.activity_id).toBe(2);
    expect(result.activity_name).toBe("Update");
    expect(result.severity_id).toBe(4);
    expect(result.severity).toBe("High");
  });

  it("validates enum after sibling reconciliation", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status: "Closed",
      activity_id: 1,
    };

    // First, verify reconciliation works
    const result = IncidentFinding.parse(input);
    expect(result.status_id).toBe(5);

    // The reconciled value should pass enum validation
    expect(result.status_id).toBe(5);
  });

  it("rejects mismatched sibling pair", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status_id: 1,
      status: "Closed", // Mismatch: 1 = "New", not "Closed"
      activity_id: 1,
    };

    // reconcileSiblings should throw an error for mismatched pairs
    expect(() => IncidentFinding.parse(input)).toThrow(/does not match/);
  });

  it("preserves custom label for OTHER (99)", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      status_id: 99,
      status: "Custom Vendor-Specific Status",
      activity_id: 1,
    };

    const result = IncidentFinding.parse(input);

    expect(result.status_id).toBe(99);
    expect(result.status).toBe("Custom Vendor-Specific Status");
  });
});

describe("IncidentFinding optional enum fields", () => {
  it("accepts valid confidence_id values (0, 1, 2, 3, 99)", () => {
    for (const confidence_id of [0, 1, 2, 3, 99]) {
      const input = {
        ...createMinimalIncidentFinding(),
        confidence_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid confidence_id values", () => {
    for (const confidence_id of [4, 5, 100, -1]) {
      const input = {
        ...createMinimalIncidentFinding(),
        confidence_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(false);
    }
  });

  it("accepts valid impact_id values (0, 1, 2, 3, 4, 99)", () => {
    for (const impact_id of [0, 1, 2, 3, 4, 99]) {
      const input = {
        ...createMinimalIncidentFinding(),
        impact_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid impact_id values", () => {
    for (const impact_id of [5, 6, 100, -1]) {
      const input = {
        ...createMinimalIncidentFinding(),
        impact_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(false);
    }
  });

  it("accepts valid priority_id values (0, 1, 2, 3, 4, 99)", () => {
    for (const priority_id of [0, 1, 2, 3, 4, 99]) {
      const input = {
        ...createMinimalIncidentFinding(),
        priority_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid priority_id values", () => {
    for (const priority_id of [5, 6, 100, -1]) {
      const input = {
        ...createMinimalIncidentFinding(),
        priority_id,
        activity_id: 1,
        status_id: 1,
      };

      const result = IncidentFinding.safeParse(input);
      expect(result.success).toBe(false);
    }
  });

  it("omits optional enum fields entirely", () => {
    const input = {
      ...createMinimalIncidentFinding(),
      activity_id: 1,
      status_id: 1,
      // No confidence_id, impact_id, priority_id, verdict_id
    };

    const result = IncidentFinding.safeParse(input);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.confidence_id).toBeUndefined();
      expect(result.data.impact_id).toBeUndefined();
      expect(result.data.priority_id).toBeUndefined();
      expect(result.data.verdict_id).toBeUndefined();
    }
  });
});
