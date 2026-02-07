/** Detection Pattern Type ID values. */
export const DetectionPatternTypeId = {
  /** The type is not mapped. */
  UNKNOWN: 0,
  STIX: 1,
  PCRE: 2,
  SIGMA: 3,
  SNORT: 4,
  SURICATA: 5,
  YARA: 6,
  /** The detection pattern type is not mapped. See the <code>detection_pattern_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type DetectionPatternTypeId =
  (typeof DetectionPatternTypeId)[keyof typeof DetectionPatternTypeId];

/** Label mapping for DetectionPatternTypeId values. */
export const DetectionPatternTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "STIX",
  2: "PCRE",
  3: "SIGMA",
  4: "Snort",
  5: "Suricata",
  6: "YARA",
  99: "Other",
};
