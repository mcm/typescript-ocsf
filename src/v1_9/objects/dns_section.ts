import { z } from 'zod';

import type { DnsResourceRecordType } from './dns_resource_record.js';
import type { TsigType } from './tsig.js';

/**
 * The DNS Section object represents a DNS message section that carries supplementary resource records alongside an optional TSIG record. It is used for both the client Additional section (<code>query_additional</code>) and the server Additional section (<code>response_additional</code>) of a DNS message. A DNS message has at most one TSIG record, which authenticates the entire message.
 *
 * OCSF Object: DNS Section
 */
export interface DnsSectionType {
  /** The resource records contained in this DNS section. */
  records: DnsResourceRecordType[];
  /** The TSIG (Transaction Signature) record present in this DNS section, used to authenticate the entire DNS message. Per RFC 2845, at most one TSIG record is permitted per DNS message. */
  tsig?: TsigType;
}

import { DnsResourceRecord } from './dns_resource_record.js';
import { Tsig } from './tsig.js';

type DnsSectionShape = {
  records: z.ZodArray<typeof DnsResourceRecord>;
  tsig: z.ZodOptional<typeof Tsig>;
};

const DnsSectionSchema: z.ZodObject<DnsSectionShape, z.core.$strict> = z.strictObject({
  /** The resource records contained in this DNS section. */
  records: z.array(DnsResourceRecord),
  /** The TSIG (Transaction Signature) record present in this DNS section, used to authenticate the entire DNS message. Per RFC 2845, at most one TSIG record is permitted per DNS message. */
  tsig: Tsig.optional(),
});

export const DnsSection = DnsSectionSchema;

/** Value → label mappings for each enum field of DnsSection. */
export const DnsSectionLabels: Readonly<Record<never, Readonly<Record<number, string>>>> = {
};
