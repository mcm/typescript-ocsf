import { describe, expect, it } from "vitest";
import { mergeEnumValues } from "../../scripts/lib/resolver.js";

describe("mergeEnumValues", () => {
  it("returns undefined when both parent and child are undefined", () => {
    const result = mergeEnumValues(undefined, undefined);
    expect(result).toBeUndefined();
  });

  it("returns parent when child is undefined", () => {
    const parent = [
      { value: 0, caption: "Unknown" },
      { value: 99, caption: "Other" },
    ];
    const result = mergeEnumValues(parent, undefined);
    expect(result).toBe(parent);
  });

  it("returns child when parent is undefined", () => {
    const child = [
      { value: 1, caption: "New" },
      { value: 2, caption: "In Progress" },
    ];
    const result = mergeEnumValues(undefined, child);
    expect(result).toBe(child);
  });

  it("merges parent and child enum values, preserving both", () => {
    const parent = [
      { value: 0, caption: "Unknown" },
      { value: 99, caption: "Other" },
    ];
    const child = [
      { value: 1, caption: "New" },
      { value: 2, caption: "In Progress" },
      { value: 3, caption: "Closed" },
    ];

    const result = mergeEnumValues(parent, child);

    expect(result).toHaveLength(5);
    expect(result?.map((v) => v.value)).toEqual([0, 1, 2, 3, 99]);
    expect(result?.[0].caption).toBe("Unknown");
    expect(result?.[4].caption).toBe("Other");
  });

  it("child values override parent values with same numeric key", () => {
    const parent = [
      { value: 0, caption: "Unknown" },
      { value: 1, caption: "Success" },
      { value: 2, caption: "Failure" },
      { value: 99, caption: "Other" },
    ];
    const child = [
      { value: 1, caption: "New" },
      { value: 2, caption: "In Progress" },
    ];

    const result = mergeEnumValues(parent, child);

    expect(result).toHaveLength(4);
    expect(result?.map((v) => v.value)).toEqual([0, 1, 2, 99]);
    // Child values override parent
    expect(result?.[1].caption).toBe("New");
    expect(result?.[2].caption).toBe("In Progress");
    // Parent values preserved
    expect(result?.[0].caption).toBe("Unknown");
    expect(result?.[3].caption).toBe("Other");
  });

  it("child can override base values (0 and 99)", () => {
    const parent = [
      { value: 0, caption: "Unknown" },
      { value: 99, caption: "Other" },
    ];
    const child = [
      { value: 0, caption: "Custom Unknown" },
      { value: 99, caption: "Custom Other" },
    ];

    const result = mergeEnumValues(parent, child);

    expect(result).toHaveLength(2);
    expect(result?.[0].caption).toBe("Custom Unknown");
    expect(result?.[1].caption).toBe("Custom Other");
  });

  it("result is sorted by numeric value", () => {
    const parent = [
      { value: 99, caption: "Other" },
      { value: 0, caption: "Unknown" },
    ];
    const child = [
      { value: 5, caption: "Five" },
      { value: 2, caption: "Two" },
    ];

    const result = mergeEnumValues(parent, child);

    expect(result?.map((v) => v.value)).toEqual([0, 2, 5, 99]);
  });

  it("preserves description field when merging", () => {
    const parent = [
      {
        value: 0,
        caption: "Unknown",
        description: "The status is unknown",
      },
    ];
    const child = [
      {
        value: 1,
        caption: "New",
        description: "A new incident",
      },
    ];

    const result = mergeEnumValues(parent, child);

    expect(result?.[0].description).toBe("The status is unknown");
    expect(result?.[1].description).toBe("A new incident");
  });

  it("child description overrides parent description", () => {
    const parent = [
      {
        value: 1,
        caption: "Success",
        description: "Operation succeeded",
      },
    ];
    const child = [
      {
        value: 1,
        caption: "New",
        description: "A new status",
      },
    ];

    const result = mergeEnumValues(parent, child);

    expect(result).toHaveLength(1);
    expect(result?.[0].caption).toBe("New");
    expect(result?.[0].description).toBe("A new status");
  });

  it("handles empty arrays correctly", () => {
    const parent: Array<{ value: number; caption: string }> = [];
    const child = [{ value: 1, caption: "One" }];

    const result = mergeEnumValues(parent, child);

    expect(result).toHaveLength(1);
    expect(result?.[0].caption).toBe("One");
  });

  it("handles realistic OCSF scenario: IncidentFinding.status_id", () => {
    // Dictionary defines base values
    const dictionary = [
      { value: 0, caption: "Unknown" },
      { value: 1, caption: "Success" },
      { value: 2, caption: "Failure" },
      { value: 99, caption: "Other" },
    ];

    // incident_finding overrides with specific values
    const incidentFinding = [
      { value: 1, caption: "New" },
      { value: 2, caption: "In Progress" },
      { value: 3, caption: "On Hold" },
      { value: 4, caption: "Resolved" },
      { value: 5, caption: "Closed" },
    ];

    const result = mergeEnumValues(dictionary, incidentFinding);

    // Should have 0, 1-5, 99 (7 values)
    expect(result).toHaveLength(7);
    expect(result?.map((v) => v.value)).toEqual([0, 1, 2, 3, 4, 5, 99]);

    // Check merged/overridden values
    expect(result?.[0].caption).toBe("Unknown"); // from dict
    expect(result?.[1].caption).toBe("New"); // overridden
    expect(result?.[2].caption).toBe("In Progress"); // overridden
    expect(result?.[3].caption).toBe("On Hold"); // new
    expect(result?.[4].caption).toBe("Resolved"); // new
    expect(result?.[5].caption).toBe("Closed"); // new
    expect(result?.[6].caption).toBe("Other"); // from dict
  });
});
