import { z } from 'zod';

/**
 * The DNS Resource Record object represents a single resource record as defined in RFC 1035. It is used in the Answer, Authority, and Additional sections of a DNS message.
 *
 * OCSF Object: DNS Resource Record
 */
export interface DnsResourceRecordType {
  /** The class of DNS data contained in this resource record. See RFC 1035. For example: IN. */
  class?: string;
  /** The owner name of the resource record. For example: www.example.com. */
  hostname?: string;
  /** The data describing the DNS resource. The meaning of this data depends on the type and class of the resource record. */
  rdata: string;
  /** The time interval that the resource record may be cached. Zero value means that the resource record can only be used for the transaction in progress, and should not be cached. */
  ttl?: number;
  /** The type of data contained in this resource record. See RFC 1035. For example: CNAME. */
  type?: string;
}

type DnsResourceRecordShape = {
  class: z.ZodOptional<z.ZodString>;
  hostname: z.ZodOptional<z.ZodString>;
  rdata: z.ZodString;
  ttl: z.ZodOptional<z.ZodNumber>;
  type: z.ZodOptional<z.ZodString>;
};

const DnsResourceRecordSchema: z.ZodObject<DnsResourceRecordShape, z.core.$strict> = z.strictObject({
  /** The class of DNS data contained in this resource record. See RFC 1035. For example: IN. */
  class: z.string().optional(),
  /** The owner name of the resource record. For example: www.example.com. */
  hostname: z.string().optional(),
  /** The data describing the DNS resource. The meaning of this data depends on the type and class of the resource record. */
  rdata: z.string(),
  /** The time interval that the resource record may be cached. Zero value means that the resource record can only be used for the transaction in progress, and should not be cached. */
  ttl: z.number().int().optional(),
  /** The type of data contained in this resource record. See RFC 1035. For example: CNAME. */
  type: z.string().optional(),
});

export const DnsResourceRecord = DnsResourceRecordSchema;

/** Value → label mappings for each enum field of DnsResourceRecord. */
export const DnsResourceRecordLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
