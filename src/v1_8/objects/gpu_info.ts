import { z } from 'zod';

/**
 * The GPU information object contains attributes describing graphical processing hardware.
 *
 * OCSF Object: GPU Information
 */
export interface GpuInfoType {
  /** The attachment bus or interface standard, normalized to the caption of the bus_type_id value. In the case of 'Other', it is defined by the event source. */
  bus_type?: string;
  /** The normalized identifier of the attachment bus or interface standard. */
  bus_type_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
  /** The number of processing cores or compute units for the component. */
  cores?: number;
  /** The model name of the GPU. For example: GeForce RTX A6000, Radeon PRO W7900, or Intel Data Center GPU Max 1550. */
  model?: string;
  /** The name of the vendor of the GPU. For example: NVIDIA, AMD, or Intel. */
  vendor_name?: string;
  /** The video memory attachment mode, indicating how the VRAM hardware is integrated with the system (e.g., shared or dedicated), normalized to the caption of the vram_mode_id value. For 'Other', the exact attachment mode is defined by the event source. */
  vram_mode?: string;
  /** The normalized identifier of the video memory attachment mode. */
  vram_mode_id?: 0 | 1 | 2 | 99;
  /** The total amount of installed video RAM. */
  vram_size?: number;
}

type GpuInfoShape = {
  bus_type: z.ZodOptional<z.ZodString>;
  bus_type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<99>]>>;
  cores: z.ZodOptional<z.ZodNumber>;
  model: z.ZodOptional<z.ZodString>;
  vendor_name: z.ZodOptional<z.ZodString>;
  vram_mode: z.ZodOptional<z.ZodString>;
  vram_mode_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>>;
  vram_size: z.ZodOptional<z.ZodNumber>;
};

const GpuInfoSchema: z.ZodObject<GpuInfoShape, z.core.$strict> = z.strictObject({
  /** The attachment bus or interface standard, normalized to the caption of the bus_type_id value. In the case of 'Other', it is defined by the event source. */
  bus_type: z.string().optional(),
  /** The normalized identifier of the attachment bus or interface standard. */
  bus_type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]).optional(),
  /** The number of processing cores or compute units for the component. */
  cores: z.number().int().optional(),
  /** The model name of the GPU. For example: GeForce RTX A6000, Radeon PRO W7900, or Intel Data Center GPU Max 1550. */
  model: z.string().optional(),
  /** The name of the vendor of the GPU. For example: NVIDIA, AMD, or Intel. */
  vendor_name: z.string().optional(),
  /** The video memory attachment mode, indicating how the VRAM hardware is integrated with the system (e.g., shared or dedicated), normalized to the caption of the vram_mode_id value. For 'Other', the exact attachment mode is defined by the event source. */
  vram_mode: z.string().optional(),
  /** The normalized identifier of the video memory attachment mode. */
  vram_mode_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]).optional(),
  /** The total amount of installed video RAM. */
  vram_size: z.number().int().optional(),
});

export const GpuInfo = GpuInfoSchema;

/** Value → label mappings for each enum field of GpuInfo. */
export const GpuInfoLabels: Readonly<Record<"bus_type_id" | "vram_mode_id", Readonly<Record<number, string>>>> = {
  bus_type_id: {
    0: "Unknown",
    1: "Onboard",
    2: "PCIe x16",
    3: "PCIe x8",
    4: "MXM Type A",
    5: "MXM Type B",
    6: "M.2",
    7: "CXL",
    99: "Other",
  },
  vram_mode_id: {
    0: "Unknown",
    1: "Shared",
    2: "Dedicated",
    99: "Other",
  },
};
