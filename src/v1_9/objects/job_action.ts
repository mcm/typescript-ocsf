import { z } from 'zod';

import type { FileType } from './file.js';
import type { KeyValueObjectType } from './key_value_object.js';

/**
 * The action that will be performed by the job when certain conditions are met.
 *
 * OCSF Object: Job Action
 */
export interface JobActionType {
  /** When type_id is Execute (2), this describes the command line that is executed.When type_id is COM Handler (1), this may describe the DLL path stored in the COM component's InprocServer32 key or the command line stored in the COM component's LocalServer32 key. */
  cmd_line?: string;
  /** When type_id is COM Handler (1), this describes the COM Class Identifier (CLSID). */
  com_class_uuid?: string;
  /** When known, describes the image file that is executed when type_id is COM Handler or Execute. Note that this attribute is intended to supplement the com_class_uid or cmd_line attributes, and is not an alternative to them. */
  file?: FileType;
  /** The list of properties associated with the performed action.Can be populated with additional attributes of a program execution process, COM object attributes, fields of a message box or an email. */
  properties?: KeyValueObjectType[];
  /** The job action type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type?: string;
  /** The job action type. */
  type_id: 0 | 1 | 2 | 3 | 4 | 99;
  /** When type_id is Execute (2), this describes the working directory of a program that is run by the job. */
  working_directory?: string;
}

import { File } from './file.js';
import { KeyValueObject } from './key_value_object.js';

type JobActionShape = {
  cmd_line: z.ZodOptional<z.ZodString>;
  com_class_uuid: z.ZodOptional<z.ZodString>;
  file: z.ZodOptional<typeof File>;
  properties: z.ZodOptional<z.ZodArray<typeof KeyValueObject>>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<99>]>;
  working_directory: z.ZodOptional<z.ZodString>;
};

const JobActionSchema: z.ZodObject<JobActionShape, z.core.$strict> = z.strictObject({
  /** When type_id is Execute (2), this describes the command line that is executed.When type_id is COM Handler (1), this may describe the DLL path stored in the COM component's InprocServer32 key or the command line stored in the COM component's LocalServer32 key. */
  cmd_line: z.string().optional(),
  /** When type_id is COM Handler (1), this describes the COM Class Identifier (CLSID). */
  com_class_uuid: z.string().optional(),
  /** When known, describes the image file that is executed when type_id is COM Handler or Execute. Note that this attribute is intended to supplement the com_class_uid or cmd_line attributes, and is not an alternative to them. */
  file: File.optional(),
  /** The list of properties associated with the performed action.Can be populated with additional attributes of a program execution process, COM object attributes, fields of a message box or an email. */
  properties: z.array(KeyValueObject).optional(),
  /** The job action type, normalized to the caption of the type_id value. In the case of 'Other', it is defined by the event source. */
  type: z.string().optional(),
  /** The job action type. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(99)]),
  /** When type_id is Execute (2), this describes the working directory of a program that is run by the job. */
  working_directory: z.string().optional(),
});

export const JobAction = JobActionSchema;

/** Value → label mappings for each enum field of JobAction. */
export const JobActionLabels: Readonly<Record<"type_id", Readonly<Record<number, string>>>> = {
  type_id: {
    0: "Unknown",
    1: "COM Handler",
    2: "Execute",
    3: "E-mail",
    4: "Show Message",
    99: "Other",
  },
};
