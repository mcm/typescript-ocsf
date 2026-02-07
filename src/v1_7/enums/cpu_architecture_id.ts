/** CPU Architecture ID values. */
export const CpuArchitectureId = {
  /** The CPU architecture is unknown. */
  UNKNOWN: 0,
  /** CPU uses the x86 ISA. For bitness, refer to <code>cpu_bits</code>. */
  X86: 1,
  /** CPU uses the ARM ISA. For bitness, refer to <code>cpu_bits</code>. */
  ARM: 2,
  /** CPU uses the RISC-V ISA. For bitness, refer to <code>cpu_bits</code>. */
  RISC_V: 3,
  /** The CPU architecture is not mapped. See the <code>cpu_architecture</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type CpuArchitectureId = (typeof CpuArchitectureId)[keyof typeof CpuArchitectureId];

/** Label mapping for CpuArchitectureId values. */
export const CpuArchitectureIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "x86",
  2: "ARM",
  3: "RISC-V",
  99: "Other",
};
