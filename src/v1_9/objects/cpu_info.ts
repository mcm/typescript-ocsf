import { z } from 'zod';

/**
 * The CPU information object contains attributes describing a physical CPU package installed in the device.
 *
 * OCSF Object: CPU Information
 */
export interface CpuInfoType {
  /** The number of processing cores or compute units for the component. */
  cores?: number;
  /** The CPU architecture, normalized to the caption of the cpu_architecture_id value. In the case of Other, it is defined by the source. */
  cpu_architecture?: string;
  /** The normalized identifier of the CPU architecture. */
  cpu_architecture_id?: 0 | 1 | 2 | 3 | 99;
  /** The number of bits used by the CPU for memory addressing. */
  cpu_bits?: number;
  /** The model name of the CPU. For example: Intel Xeon Gold 6348, AMD EPYC 7763, or Apple M3 Max. */
  model?: string;
  /** The nominal clock speed of the unit, expressed in megahertz. */
  speed_mhz?: number;
  /** The name of the vendor of the CPU. For example: Intel, AMD, or Apple. */
  vendor_name?: string;
}

type CpuInfoShape = {
  cores: z.ZodOptional<z.ZodNumber>;
  cpu_architecture: z.ZodOptional<z.ZodString>;
  cpu_architecture_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<99>]>>;
  cpu_bits: z.ZodOptional<z.ZodNumber>;
  model: z.ZodOptional<z.ZodString>;
  speed_mhz: z.ZodOptional<z.ZodNumber>;
  vendor_name: z.ZodOptional<z.ZodString>;
};

const CpuInfoSchema: z.ZodObject<CpuInfoShape, z.core.$strict> = z.strictObject({
  /** The number of processing cores or compute units for the component. */
  cores: z.number().int().optional(),
  /** The CPU architecture, normalized to the caption of the cpu_architecture_id value. In the case of Other, it is defined by the source. */
  cpu_architecture: z.string().optional(),
  /** The normalized identifier of the CPU architecture. */
  cpu_architecture_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(99)]).optional(),
  /** The number of bits used by the CPU for memory addressing. */
  cpu_bits: z.number().int().optional(),
  /** The model name of the CPU. For example: Intel Xeon Gold 6348, AMD EPYC 7763, or Apple M3 Max. */
  model: z.string().optional(),
  /** The nominal clock speed of the unit, expressed in megahertz. */
  speed_mhz: z.number().int().optional(),
  /** The name of the vendor of the CPU. For example: Intel, AMD, or Apple. */
  vendor_name: z.string().optional(),
});

export const CpuInfo = CpuInfoSchema;

/** Value → label mappings for each enum field of CpuInfo. */
export const CpuInfoLabels: Readonly<Record<"cpu_architecture_id", Readonly<Record<number, string>>>> = {
  cpu_architecture_id: {
    0: "Unknown",
    1: "x86",
    2: "ARM",
    3: "RISC-V",
    99: "Other",
  },
};
