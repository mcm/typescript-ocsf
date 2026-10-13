/** Bus Type ID values. */
export const BusTypeId = {
  /** The bus type is unknown or not reported. */
  UNKNOWN: 0,
  /** The device is attached directly on the motherboard or SoC (often referred to as 'integrated' or 'onboard'). */
  ONBOARD: 1,
  /** Peripheral Component Interconnect Express slot with 16 lanes, typically used for high‑bandwidth add‑in devices. */
  PCIE_X16: 2,
  /** Peripheral Component Interconnect Express slot with 8 lanes; common for high‑performance NICs, storage controllers, and accelerators. */
  PCIE_X8: 3,
  /** Mobile PCI Express Module (MXM) Type A form factor (compact laptop/embedded GPU module). */
  MXM_TYPE_A: 4,
  /** Mobile PCI Express Module (MXM) Type B form factor (larger laptop/embedded GPU module). */
  MXM_TYPE_B: 5,
  /** M.2 (NGFF) internal module form factor/connector exposing PCIe (and/or SATA/USB) for SSDs and add‑in modules. */
  M_2: 6,
  /** Compute Express Link (CXL), an open cache‑coherent interconnect for processors, memory expansion, and accelerators built on the PCIe physical layer. */
  CXL: 7,
  /** A bus or interface standard not covered by the defined values; the exact value is reported by the event source. */
  OTHER: 99,
} as const;

export type BusTypeId = (typeof BusTypeId)[keyof typeof BusTypeId];

/** Label mapping for BusTypeId values. */
export const BusTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Onboard",
  2: "PCIe x16",
  3: "PCIe x8",
  4: "MXM Type A",
  5: "MXM Type B",
  6: "M.2",
  7: "CXL",
  99: "Other",
};

/** Reverse mapping from label to BusTypeId value. */
export const BusTypeIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Onboard": 1,
  "PCIe x16": 2,
  "PCIe x8": 3,
  "MXM Type A": 4,
  "MXM Type B": 5,
  "M.2": 6,
  "CXL": 7,
  "Other": 99,
};
