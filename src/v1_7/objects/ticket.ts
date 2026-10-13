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
  /** A list of contextual descriptions of the status, status_id values. */
  status_details?: string[];
  /** The normalized identifier for the ticket status. */
  status_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;
  /** The title of the ticket. */
  title?: string;
  /** The linked ticket type determines whether the ticket is internal or in an external ticketing system. */
  type?: string;
  /** The normalized identifier for the ticket type. */
  type_id?: 0 | 1 | 2 | 99;
  /** Unique identifier of the ticket. */
  uid?: string;
}

type TicketShape = {
  src_url: z.ZodOptional<z.ZodString>;
  status: z.ZodOptional<z.ZodString>;
  status_details: z.ZodOptional<z.ZodArray<z.ZodString>>;
  status_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<7>, z.ZodLiteral<8>, z.ZodLiteral<99>]>>;
  title: z.ZodOptional<z.ZodString>;
  type: z.ZodOptional<z.ZodString>;
  type_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<99>]>>;
  uid: z.ZodOptional<z.ZodString>;
};

const TicketSchema: z.ZodObject<TicketShape, z.core.$strict> = z.strictObject({
  /** The url of a ticket in the ticket system. */
  src_url: z.string().optional(),
  /** The status of the ticket normalized to the caption of the status_id value. In the case of 99, this value should as defined by the source. */
  status: z.string().optional(),
  /** A list of contextual descriptions of the status, status_id values. */
  status_details: z.array(z.string()).optional(),
  /** The normalized identifier for the ticket status. */
  status_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(99)]).optional(),
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

/** Value → label mappings for each enum field of Ticket. */
export const TicketLabels: Readonly<Record<"status_id" | "type_id", Readonly<Record<number, string>>>> = {
  status_id: {
    0: "Unknown",
    1: "New",
    2: "In Progress",
    3: "Notified",
    4: "On Hold",
    5: "Resolved",
    6: "Closed",
    7: "Canceled",
    8: "Reopened",
    99: "Other",
  },
  type_id: {
    0: "Unknown",
    1: "Internal",
    2: "External",
    99: "Other",
  },
};
