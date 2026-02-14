import { z } from 'zod';

import type { AttackType } from './attack.js';
import type { KillChainPhaseType } from './kill_chain_phase.js';
import type { ObservableType } from './observable.js';
import type { ProductType } from './product.js';
import type { KeyValueObjectType } from './key_value_object.js';
import type { TraitType } from './trait.js';

/**
 * The Related Event object describes an event or another finding related to a finding. It may or may not be an OCSF event.
 *
 * OCSF Object: Related Event/Finding
 */
export interface RelatedEventType {
  /** An array of MITRE ATT&CK® objects describing identified tactics, techniques & sub-techniques. The objects are compatible with MITRE ATLAS™ tactics, techniques & sub-techniques. */
  attacks?: AttackType[];
  /** The number of times that activity in the same logical group occurred, as reported by the related Finding. */
  count?: number;
  /** The time when the related event/finding was created. */
  created_time?: number;
  /** A description of the related event/finding. */
  desc?: string;
  /** The time when the finding was first observed. e.g. The time when a vulnerability was first observed.It can differ from the created_time timestamp, which reflects the time this finding was created. */
  first_seen_time?: number;
  /** The Cyber Kill Chain® provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. */
  kill_chain?: KillChainPhaseType[];
  /** The time when the finding was most recently observed. e.g. The time when a vulnerability was most recently observed.It can differ from the modified_time timestamp, which reflects the time this finding was last modified. */
  last_seen_time?: number;
  /** The time when the related event/finding was last modified. */
  modified_time?: number;
  /** The observables associated with the event or a finding. */
  observables?: ObservableType[];
  /** Details about the product that reported the related event/finding. */
  product?: ProductType;
  /** The unique identifier of the product that reported the related event. */
  product_uid?: string;
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity?: string;
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The list of tags; {key:value} pairs associated with the related event/finding. */
  tags?: KeyValueObjectType[];
  /** A title or a brief phrase summarizing the related event/finding. */
  title?: string;
  /** The list of key traits or characteristics extracted from the related event/finding that influenced or contributed to the overall finding's outcome. */
  traits?: TraitType[];
  /** The type of the related event/finding.Populate if the related event/finding is NOT in OCSF. If it is in OCSF, then utilize type_name, type_uid instead. */
  type?: string;
  /** The type of the related OCSF event, as defined by type_uid.For example: Process Activity: Launch.Populate if the related event/finding is in OCSF. */
  type_name?: string;
  /** The unique identifier of the related OCSF event type. For example: 100701.Populate if the related event/finding is in OCSF. */
  type_uid?: number;
  /** The unique identifier of the related event/finding. If the related event/finding is in OCSF, then this value must be equal to metadata.uid in the corresponding event. */
  uid: string;
}

import { Attack } from './attack.js';
import { KillChainPhase } from './kill_chain_phase.js';
import { Observable } from './observable.js';
import { Product } from './product.js';
import { KeyValueObject } from './key_value_object.js';
import { Trait } from './trait.js';

const RelatedEventSchema: z.ZodType<RelatedEventType> = z.strictObject({
  /** An array of MITRE ATT&CK® objects describing identified tactics, techniques & sub-techniques. The objects are compatible with MITRE ATLAS™ tactics, techniques & sub-techniques. */
  attacks: z.array(Attack).optional(),
  /** The number of times that activity in the same logical group occurred, as reported by the related Finding. */
  count: z.number().int().optional(),
  /** The time when the related event/finding was created. */
  created_time: z.number().int().optional(),
  /** A description of the related event/finding. */
  desc: z.string().optional(),
  /** The time when the finding was first observed. e.g. The time when a vulnerability was first observed.It can differ from the created_time timestamp, which reflects the time this finding was created. */
  first_seen_time: z.number().int().optional(),
  /** The Cyber Kill Chain® provides a detailed description of each phase and its associated activities within the broader context of a cyber attack. */
  kill_chain: z.array(KillChainPhase).optional(),
  /** The time when the finding was most recently observed. e.g. The time when a vulnerability was most recently observed.It can differ from the modified_time timestamp, which reflects the time this finding was last modified. */
  last_seen_time: z.number().int().optional(),
  /** The time when the related event/finding was last modified. */
  modified_time: z.number().int().optional(),
  /** The observables associated with the event or a finding. */
  observables: z.array(Observable).optional(),
  /** Details about the product that reported the related event/finding. */
  product: Product.optional(),
  /** The unique identifier of the product that reported the related event. */
  product_uid: z.string().optional(),
  /** The event/finding severity, normalized to the caption of the severity_id value. In the case of 'Other', it is defined by the source. */
  severity: z.string().optional(),
  /** The normalized identifier of the event/finding severity.The normalized severity is a measurement the effort and expense required to manage and resolve an event or incident. Smaller numerical values represent lower impact events, and larger numerical values represent higher impact events. */
  severity_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The list of tags; {key:value} pairs associated with the related event/finding. */
  tags: z.array(KeyValueObject).optional(),
  /** A title or a brief phrase summarizing the related event/finding. */
  title: z.string().optional(),
  /** The list of key traits or characteristics extracted from the related event/finding that influenced or contributed to the overall finding's outcome. */
  traits: z.array(Trait).optional(),
  /** The type of the related event/finding.Populate if the related event/finding is NOT in OCSF. If it is in OCSF, then utilize type_name, type_uid instead. */
  type: z.string().optional(),
  /** The type of the related OCSF event, as defined by type_uid.For example: Process Activity: Launch.Populate if the related event/finding is in OCSF. */
  type_name: z.string().optional(),
  /** The unique identifier of the related OCSF event type. For example: 100701.Populate if the related event/finding is in OCSF. */
  type_uid: z.number().int().optional(),
  /** The unique identifier of the related event/finding. If the related event/finding is in OCSF, then this value must be equal to metadata.uid in the corresponding event. */
  uid: z.string(),
});

export const RelatedEvent = RelatedEventSchema;
