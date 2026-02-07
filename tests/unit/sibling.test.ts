import { describe, expect, it } from "vitest";
import { type SiblingPair, reconcileSiblings } from "../../src/sibling.js";

const TEST_LABELS: Record<number, string> = {
  0: "Unknown",
  1: "Create",
  2: "Read",
  3: "Update",
  4: "Delete",
  99: "Other",
};

const TEST_PAIRS: readonly SiblingPair[] = [
  { idField: "activity_id", labelField: "activity", labels: TEST_LABELS },
];

describe("reconcileSiblings", () => {
  // Scenario 1: Valid ID + Matching label -> Both kept, canonical casing
  it("keeps both when ID and label are consistent", () => {
    const result = reconcileSiblings({ activity_id: 1, activity: "create" }, TEST_PAIRS);
    expect(result.activity_id).toBe(1);
    expect(result.activity).toBe("Create"); // Canonical casing
  });

  // Scenario 2: Valid ID + Mismatched label -> Error
  it("throws error when ID and label are inconsistent", () => {
    expect(() => reconcileSiblings({ activity_id: 1, activity: "Delete" }, TEST_PAIRS)).toThrow(
      /does not match/,
    );
  });

  // Scenario 3: Valid ID (99/OTHER) + Any label -> Custom label preserved
  it("preserves custom label for OTHER (99)", () => {
    const result = reconcileSiblings(
      { activity_id: 99, activity: "Custom Scan Operation" },
      TEST_PAIRS,
    );
    expect(result.activity_id).toBe(99);
    expect(result.activity).toBe("Custom Scan Operation");
  });

  // Scenario 4: Valid ID + Missing label -> Label extrapolated
  it("extrapolates label from valid ID", () => {
    const result = reconcileSiblings({ activity_id: 1 }, TEST_PAIRS);
    expect(result.activity_id).toBe(1);
    expect(result.activity).toBe("Create");
  });

  // Scenario 5: Missing ID + Known label -> ID extrapolated
  it("extrapolates ID from known label", () => {
    const result = reconcileSiblings({ activity: "Delete" }, TEST_PAIRS);
    expect(result.activity_id).toBe(4);
    expect(result.activity).toBe("Delete");
  });

  // Scenario 6: Missing ID + Unknown label -> ID=99, label preserved
  it("maps unknown label to OTHER (99)", () => {
    const result = reconcileSiblings({ activity: "Custom Vendor Action" }, TEST_PAIRS);
    expect(result.activity_id).toBe(99);
    expect(result.activity).toBe("Custom Vendor Action");
  });

  // Scenario 7: Neither present -> Both absent
  it("leaves both absent when neither provided", () => {
    const result = reconcileSiblings({}, TEST_PAIRS);
    expect(result.activity_id).toBeUndefined();
    expect(result.activity).toBeUndefined();
  });

  // Edge case: Case-insensitive label matching
  it("matches labels case-insensitively", () => {
    const result = reconcileSiblings({ activity: "CREATE" }, TEST_PAIRS);
    expect(result.activity_id).toBe(1);
    expect(result.activity).toBe("Create"); // Canonical
  });

  // Edge case: Multiple sibling pairs
  it("handles multiple sibling pairs independently", () => {
    const multiPairs: readonly SiblingPair[] = [
      { idField: "activity_id", labelField: "activity", labels: TEST_LABELS },
      {
        idField: "severity_id",
        labelField: "severity",
        labels: { 0: "Unknown", 1: "Informational", 2: "Low" },
      },
    ];
    const result = reconcileSiblings({ activity_id: 1, severity_id: 2 }, multiPairs);
    expect(result.activity).toBe("Create");
    expect(result.severity).toBe("Low");
  });
});
