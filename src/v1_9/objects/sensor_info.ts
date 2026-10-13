import { z } from 'zod';

/**
 * The Sensor Information object describes a control point sensor that emits data, or originates detections. It can be part of an endpoint or agent running on an OS, a SaaS application, a network device, a Cyber Threat Intelligence (CTI) system, or other detection and enforcement technologies.
 *
 * OCSF Object: Sensor Information
 */
export interface SensorInfoType {
  /** The name of the entity. */
  name?: string;
  /** The unique identifier of the entity. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The technology or sensor layer that emitted the data, normalized to the caption of sensor_layer_id. When sensor_layer_id is 99 (Other), this attribute must contain the source-specific label. */
  sensor_layer?: string;
  /** The normalized identifier of the sensor layer that emitted the data. For example, use this to classify the detection surface (e.g., IPS sensor, endpoint agent, email gateway). When the type is not listed, use 99 (Other) and populate sensor_layer with the source-specific label. */
  sensor_layer_id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 99;
}

type SensorInfoShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  sensor_layer: z.ZodOptional<z.ZodString>;
  sensor_layer_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<99>]>;
};

const SensorInfoSchema: z.ZodObject<SensorInfoShape, z.core.$strict> = z.strictObject({
  /** The name of the entity. */
  name: z.string().optional(),
  /** The unique identifier of the entity. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The technology or sensor layer that emitted the data, normalized to the caption of sensor_layer_id. When sensor_layer_id is 99 (Other), this attribute must contain the source-specific label. */
  sensor_layer: z.string().optional(),
  /** The normalized identifier of the sensor layer that emitted the data. For example, use this to classify the detection surface (e.g., IPS sensor, endpoint agent, email gateway). When the type is not listed, use 99 (Other) and populate sensor_layer with the source-specific label. */
  sensor_layer_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(99)]),
});

export const SensorInfo = SensorInfoSchema;

/** Value → label mappings for each enum field of SensorInfo. */
export const SensorInfoLabels: Readonly<Record<"sensor_layer_id", Readonly<Record<number, string>>>> = {
  sensor_layer_id: {
    0: "Unknown",
    1: "Network",
    2: "Endpoint",
    3: "Email",
    4: "IAM",
    5: "Proxy",
    6: "Threat Intel",
    7: "Application",
    99: "Other",
  },
};
