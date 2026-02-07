/** HttpActivity activity_id values. */
export const HttpActivityActivityId = {
  UNKNOWN: 0,
  /** The CONNECT method establishes a tunnel to the server identified by the target resource. */
  CONNECT: 1,
  /** The DELETE method deletes the specified resource. */
  DELETE: 2,
  /** The GET method requests a representation of the specified resource. Requests using GET should only retrieve data. */
  GET: 3,
  /** The HEAD method asks for a response identical to a GET request, but without the response body. */
  HEAD: 4,
  /** The OPTIONS method describes the communication options for the target resource. */
  OPTIONS: 5,
  /** The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server. */
  POST: 6,
  /** The PUT method replaces all current representations of the target resource with the request payload. */
  PUT: 7,
  /** The TRACE method performs a message loop-back test along the path to the target resource. */
  TRACE: 8,
  OTHER: 99,
} as const;

export type HttpActivityActivityId =
  (typeof HttpActivityActivityId)[keyof typeof HttpActivityActivityId];

export const HttpActivityActivityIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Connect",
  2: "Delete",
  3: "Get",
  4: "Head",
  5: "Options",
  6: "Post",
  7: "Put",
  8: "Trace",
  99: "Other",
};
