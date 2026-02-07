import { z } from "zod";

/**
 * The Ticket object represents ticket in the customer's IT Service Management (ITSM) systems like ServiceNow, Jira, etc.
 *
 * OCSF Object: Ticket
 */
export interface TicketType {
  /** The url of a ticket in the ticket system. */
  src_url?: string | undefined;
  /** The status of the ticket normalized to the caption of the status_id value. In the case of 99, this value should as defined by the source. */
  status?: string | undefined;
  /** The normalized identifier for the ticket status. */
  status_id?: number | undefined;
  /** A list of contextual descriptions of the status, status_id values. */
  status_details?: string[] | undefined;
  /** The title of the ticket. */
  title?: string | undefined;
  /** The linked ticket type determines whether the ticket is internal or in an external ticketing system. */
  type?: string | undefined;
  /** The normalized identifier for the ticket type. */
  type_id?: number | undefined;
  /** Unique identifier of the ticket. */
  uid?: string | undefined;
  [key: string]: unknown;
}

export const Ticket: z.ZodType<TicketType> = z
  .object({
    /** The url of a ticket in the ticket system. */
    src_url: z.string().optional(),
    /** The status of the ticket normalized to the caption of the status_id value. In the case of 99, this value should as defined by the source. */
    status: z.string().optional(),
    /** The normalized identifier for the ticket status. */
    status_id: z.number().int().optional(),
    /** A list of contextual descriptions of the status, status_id values. */
    status_details: z.array(z.string()).optional(),
    /** The title of the ticket. */
    title: z.string().optional(),
    /** The linked ticket type determines whether the ticket is internal or in an external ticketing system. */
    type: z.string().optional(),
    /** The normalized identifier for the ticket type. */
    type_id: z.number().int().optional(),
    /** Unique identifier of the ticket. */
    uid: z.string().optional(),
  })
  .passthrough() as any;
