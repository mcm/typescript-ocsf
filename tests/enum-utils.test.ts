import { describe, expect, it } from "vitest";
import { getEnumLabel, getEnumLabelOr, getEnumValue, getEnumValueOr } from "../src/enum-utils.js";
import { SeverityId, SeverityIdByLabel, SeverityIdLabels } from "../src/v1_7/enums/index.js";

describe("Enum reverse mappings", () => {
  it("should provide label-to-value mapping", () => {
    expect(SeverityIdByLabel.Low).toBe(2);
    expect(SeverityIdByLabel.Critical).toBe(5);
    expect(SeverityIdByLabel.Unknown).toBe(0);
  });

  it("should provide value-to-label mapping", () => {
    expect(SeverityIdLabels[2]).toBe("Low");
    expect(SeverityIdLabels[5]).toBe("Critical");
    expect(SeverityIdLabels[0]).toBe("Unknown");
  });

  it("should allow round-trip conversion", () => {
    const value = SeverityId.LOW;
    const label = SeverityIdLabels[value];
    const backToValue = SeverityIdByLabel[label];

    expect(backToValue).toBe(value);
    expect(label).toBe("Low");
  });
});

describe("getEnumLabel", () => {
  it("should get label for valid value", () => {
    expect(getEnumLabel(SeverityIdLabels, SeverityId.LOW)).toBe("Low");
    expect(getEnumLabel(SeverityIdLabels, SeverityId.CRITICAL)).toBe("Critical");
  });

  it("should return undefined for invalid value", () => {
    expect(getEnumLabel(SeverityIdLabels, 999)).toBeUndefined();
  });
});

describe("getEnumValue", () => {
  it("should get value for valid label", () => {
    expect(getEnumValue(SeverityIdByLabel, "Low")).toBe(2);
    expect(getEnumValue(SeverityIdByLabel, "Critical")).toBe(5);
  });

  it("should return undefined for invalid label", () => {
    expect(getEnumValue(SeverityIdByLabel, "InvalidLabel")).toBeUndefined();
  });
});

describe("getEnumLabelOr", () => {
  it("should get label for valid value", () => {
    expect(getEnumLabelOr(SeverityIdLabels, SeverityId.LOW)).toBe("Low");
  });

  it("should return default fallback for invalid value", () => {
    expect(getEnumLabelOr(SeverityIdLabels, 999)).toBe("Unknown");
  });

  it("should return custom fallback for invalid value", () => {
    expect(getEnumLabelOr(SeverityIdLabels, 999, "N/A")).toBe("N/A");
  });
});

describe("getEnumValueOr", () => {
  it("should get value for valid label", () => {
    expect(getEnumValueOr(SeverityIdByLabel, "Low")).toBe(2);
  });

  it("should return default fallback for invalid label", () => {
    expect(getEnumValueOr(SeverityIdByLabel, "InvalidLabel")).toBe(0);
  });

  it("should return custom fallback for invalid label", () => {
    expect(getEnumValueOr(SeverityIdByLabel, "InvalidLabel", -1)).toBe(-1);
  });
});
