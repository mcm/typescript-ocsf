import { describe, expect, it } from "vitest";
import { type UidConfig, prefillUids } from "../../src/uid.js";

const FILE_ACTIVITY_UID: UidConfig = {
  categoryUid: 1, // System Activity
  classUid: 1001, // File Activity
};

describe("prefillUids", () => {
  it("fills category_uid when absent", () => {
    const result = prefillUids({ activity_id: 1 }, FILE_ACTIVITY_UID);
    expect(result.category_uid).toBe(1);
  });

  it("fills class_uid when absent", () => {
    const result = prefillUids({ activity_id: 1 }, FILE_ACTIVITY_UID);
    expect(result.class_uid).toBe(1001);
  });

  it("calculates type_uid as class_uid * 100 + activity_id", () => {
    const result = prefillUids({ activity_id: 1 }, FILE_ACTIVITY_UID);
    expect(result.type_uid).toBe(100101);
  });

  it("preserves user-provided category_uid", () => {
    const result = prefillUids({ activity_id: 1, category_uid: 999 }, FILE_ACTIVITY_UID);
    expect(result.category_uid).toBe(999);
  });

  it("preserves user-provided class_uid", () => {
    const result = prefillUids({ activity_id: 1, class_uid: 9999 }, FILE_ACTIVITY_UID);
    expect(result.class_uid).toBe(9999);
  });

  it("preserves user-provided type_uid", () => {
    const result = prefillUids({ activity_id: 1, type_uid: 888888 }, FILE_ACTIVITY_UID);
    expect(result.type_uid).toBe(888888);
  });

  it("does not calculate type_uid when activity_id is absent", () => {
    const result = prefillUids({}, FILE_ACTIVITY_UID);
    expect(result.type_uid).toBeUndefined();
    expect(result.category_uid).toBe(1);
    expect(result.class_uid).toBe(1001);
  });

  it("handles activity_id=0 (UNKNOWN) correctly", () => {
    const result = prefillUids({ activity_id: 0 }, FILE_ACTIVITY_UID);
    expect(result.type_uid).toBe(100100); // 1001 * 100 + 0
  });
});
