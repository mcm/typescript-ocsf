import { z } from "zod";

import { Service, type ServiceType } from "./service.js";

/**
 * Represents a single unit of work or operation within a distributed trace. A span typically tracks the execution of a request across a service, capturing important details such as the operation, timestamps, and status. Spans help break down the overall trace into smaller, manageable parts, enabling detailed analysis of the performance and behavior of specific operations within the system. They are crucial for understanding latency, dependencies, and bottlenecks in complex distributed systems.
 *
 * OCSF Object: Span
 */
export interface SpanType {
  /** The total time, in milliseconds, that the span represents, calculated as the difference between start_time and end_time. It reflects the operation's performance and latency, independent of event timestamps, and accounts for normalized times used by observability tools to ensure consistency across distributed systems. */
  duration?: number | undefined;
  /** The end timestamp of the span, essential for identifying latency and performance bottlenecks. Like the start time, this timestamp is normalized across the observability system to ensure consistency, even when events are recorded across distributed services with unsynchronized clocks. Normalized time allows for accurate duration calculations and helps observability tools track performance across services, regardless of the individual system time settings. */
  end_time: number;
  /** The message in a span (often referred to as a span event) serves as a way to record significant moments or occurrences during the span's lifecycle. This content typically manifests as log entries, annotations, or semi-structured events as a string, providing additional granularity and context about what happens at specific points during the execution of an operation. */
  message?: string | undefined;
  /** Describes an action performed in a span, such as API requests, database queries, or computations. */
  operation?: string | undefined;
  /** The ID of the parent span for this span object, establishing its relationship in the trace hierarchy. */
  parent_uid?: string | undefined;
  /** Identifies the service or component that generates the span, helping trace its path through the distributed system. */
  service?: ServiceType | undefined;
  /** The start timestamp of the span, essential for identifying latency and performance bottlenecks. This timestamp is normalized across the observability system, ensuring consistency even when events occur across distributed services with potentially unsynchronized clocks. By using normalized time, observability tools can provide accurate, uniform measurements of operation performance and latency, regardless of where or when the events actually occur. */
  start_time: number;
  /** Indicates the outcome of the operation in the span, such as success, failure, or error. Issues in a span typically refer to problems such as failed operations, timeouts, service unavailability, or errors in processing that can negatively impact the performance or reliability of the system. Tracking the `status_code` helps pinpoint these issues, enabling quicker identification and resolution of system inefficiencies or faults. */
  status_code?: string | undefined;
  /** The unique identifier for the span, used in distributed systems and microservices architectures to track and correlate requests across different components of an application. It enables tracing the flow of a request through various services. */
  uid: string;
  [key: string]: unknown;
}

export const Span: z.ZodType<SpanType> = z
  .object({
    /** The total time, in milliseconds, that the span represents, calculated as the difference between start_time and end_time. It reflects the operation's performance and latency, independent of event timestamps, and accounts for normalized times used by observability tools to ensure consistency across distributed systems. */
    duration: z.number().int().optional(),
    /** The end timestamp of the span, essential for identifying latency and performance bottlenecks. Like the start time, this timestamp is normalized across the observability system to ensure consistency, even when events are recorded across distributed services with unsynchronized clocks. Normalized time allows for accurate duration calculations and helps observability tools track performance across services, regardless of the individual system time settings. */
    end_time: z.number().int(),
    /** The message in a span (often referred to as a span event) serves as a way to record significant moments or occurrences during the span's lifecycle. This content typically manifests as log entries, annotations, or semi-structured events as a string, providing additional granularity and context about what happens at specific points during the execution of an operation. */
    message: z.string().optional(),
    /** Describes an action performed in a span, such as API requests, database queries, or computations. */
    operation: z.string().optional(),
    /** The ID of the parent span for this span object, establishing its relationship in the trace hierarchy. */
    parent_uid: z.string().optional(),
    /** Identifies the service or component that generates the span, helping trace its path through the distributed system. */
    service: Service.optional(),
    /** The start timestamp of the span, essential for identifying latency and performance bottlenecks. This timestamp is normalized across the observability system, ensuring consistency even when events occur across distributed services with potentially unsynchronized clocks. By using normalized time, observability tools can provide accurate, uniform measurements of operation performance and latency, regardless of where or when the events actually occur. */
    start_time: z.number().int(),
    /** Indicates the outcome of the operation in the span, such as success, failure, or error. Issues in a span typically refer to problems such as failed operations, timeouts, service unavailability, or errors in processing that can negatively impact the performance or reliability of the system. Tracking the `status_code` helps pinpoint these issues, enabling quicker identification and resolution of system inefficiencies or faults. */
    status_code: z.string().optional(),
    /** The unique identifier for the span, used in distributed systems and microservices architectures to track and correlate requests across different components of an application. It enables tracing the flow of a request through various services. */
    uid: z.string(),
  })
  .passthrough() as any;
