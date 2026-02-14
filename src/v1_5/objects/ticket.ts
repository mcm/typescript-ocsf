import { z } from 'zod';

/**
 * The Ticket object represents ticket in the customer's IT Service Management (ITSM) systems like ServiceNow, Jira, etc.
 *
 * OCSF Object: Ticket
 */
export interface TicketType {
  /** The url of a ticket in the ticket system. */
  src_url?: string;
  /** The status of the ticket normalized to the caption of the status_id value. In the case of 99, this value should as defined by the source. */
  status?: string;
  /** The normalized identifier for the ticket status. */
  status_id?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** A list of contextual descriptions of the status, status_id values. */
  status_details?: string[];
  /** The title of the ticket. */
  title?: string;
  /** The linked ticket type determines whether the ticket is internal or in an external ticketing system. */
  type?: string;
  /** The normalized identifier for the ticket type. */
  type_id?: 0 | 1 | 2 | 99;
  /** Unique identifier of the ticket. */
  uid?: string;
}

const TicketSchema: z.ZodType<TicketType> = z.strictObject({
  /** The url of a ticket in the ticket system. */
  src_url: z.string().optional(),
  /** The status of the ticket normalized to the caption of the status_id value. In the case of 99, this value should as defined by the source. */
  status: z.string().optional(),
  /** The normalized identifier for the ticket status. */
  status_id: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8)]).optional(),
  /** A list of contextual descriptions of the status, status_id values. */
  status_details: z.array(z.string()).optional(),
  /** The title of the ticket. */
  title: z.string().optional(),
  /** The linked ticket type determines whether the ticket is internal or in an external ticketing system. */
  type: z.string().optional(),
  /** The normalized identifier for the ticket type. */
  type_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(99)]).optional(),
  /** Unique identifier of the ticket. */
  uid: z.string().optional(),
});

export const Ticket = TicketSchema;
