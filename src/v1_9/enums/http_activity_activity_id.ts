/** HttpActivity activity_id values. */
export const HttpActivityActivityId = {
  /** The event activity is unknown. */
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
  /** The PATCH method applies partial modifications to a resource. */
  PATCH: 9,
  /** The ACL method modifies the access control list of the specified resource. */
  ACL: 10,
  /** The BASELINE-CONTROL method places the specified collection resource under baseline control. */
  BASELINE_CONTROL: 11,
  /** The BIND method adds a binding to the specified collection resource. */
  BIND: 12,
  /** The CHECKIN method creates a new version from a checked-out version-controlled resource. */
  CHECK_IN: 13,
  /** The CHECKOUT method prepares a version-controlled resource for modification. */
  CHECK_OUT: 14,
  /** The COPY method duplicates the specified resource. */
  COPY: 15,
  /** The LABEL method adds, sets, or removes labels on a version-controlled resource. */
  LABEL: 16,
  /** The LINK method establishes one or more links between resources. */
  LINK: 17,
  /** The LOCK method acquires or refreshes a lock on the specified resource. */
  LOCK: 18,
  /** The MERGE method merges changes from another resource into the specified resource. */
  MERGE: 19,
  /** The MKACTIVITY method creates a new activity resource. */
  MAKE_ACTIVITY: 20,
  /** The MKCALENDAR method creates a new calendar collection resource. */
  MAKE_CALENDAR: 21,
  /** The MKCOL method creates a new collection resource. */
  MAKE_COLLECTION: 22,
  /** The MKREDIRECTREF method creates a new redirect reference resource. */
  MAKE_REDIRECT_REFERENCE: 23,
  /** The MKWORKSPACE method creates a new workspace resource. */
  MAKE_WORKSPACE: 24,
  /** The MOVE method atomically duplicates and deletes the specified resource. */
  MOVE: 25,
  /** The ORDERPATCH method changes the ordering of members in an ordered collection. */
  ORDER_PATCH: 26,
  /** The PRI method appears in the HTTP/2 connection preface to confirm the protocol. */
  PRI: 27,
  /** The PROPFIND method retrieves properties defined on the specified resource. */
  PROPERTY_FIND: 28,
  /** The PROPPATCH method sets and/or removes properties defined on the specified resource. */
  PROPERTY_PATCH: 29,
  /** The QUERY method performs a safe query request that can include a request body. */
  QUERY: 30,
  /** The REBIND method moves a binding from one collection to another. */
  REBIND: 31,
  /** The REPORT method retrieves a report about the specified resource. */
  REPORT: 32,
  /** The SEARCH method searches a resource or collection using the request payload. */
  SEARCH: 33,
  /** The UNBIND method removes a binding from the specified collection resource. */
  UNBIND: 34,
  /** The UNCHECKOUT method cancels a checkout and restores the resource to its previous state. */
  UN_CHECK_OUT: 35,
  /** The UNLINK method removes one or more links between resources. */
  UNLINK: 36,
  /** The UNLOCK method releases a lock on the specified resource. */
  UNLOCK: 37,
  /** The UPDATE method updates a version-controlled resource to match a specified version. */
  UPDATE: 38,
  /** The UPDATEREDIRECTREF method changes the target of a redirect reference resource. */
  UPDATE_REDIRECT_REFERENCE: 39,
  /** The VERSION-CONTROL method places the specified resource under version control. */
  VERSION_CONTROL: 40,
  /** The event activity is not mapped. See the <code>activity_name</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type HttpActivityActivityId = (typeof HttpActivityActivityId)[keyof typeof HttpActivityActivityId];

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
  9: "Patch",
  10: "ACL",
  11: "Baseline Control",
  12: "Bind",
  13: "Check In",
  14: "Check Out",
  15: "Copy",
  16: "Label",
  17: "Link",
  18: "Lock",
  19: "Merge",
  20: "Make Activity",
  21: "Make Calendar",
  22: "Make Collection",
  23: "Make Redirect Reference",
  24: "Make Workspace",
  25: "Move",
  26: "Order Patch",
  27: "PRI",
  28: "Property Find",
  29: "Property Patch",
  30: "Query",
  31: "Rebind",
  32: "Report",
  33: "Search",
  34: "Unbind",
  35: "Un-Check Out",
  36: "Unlink",
  37: "Unlock",
  38: "Update",
  39: "Update Redirect Reference",
  40: "Version Control",
  99: "Other",
};

export const HttpActivityActivityIdByLabel: Record<string, number> = {
  "Unknown": 0,
  "Connect": 1,
  "Delete": 2,
  "Get": 3,
  "Head": 4,
  "Options": 5,
  "Post": 6,
  "Put": 7,
  "Trace": 8,
  "Patch": 9,
  "ACL": 10,
  "Baseline Control": 11,
  "Bind": 12,
  "Check In": 13,
  "Check Out": 14,
  "Copy": 15,
  "Label": 16,
  "Link": 17,
  "Lock": 18,
  "Merge": 19,
  "Make Activity": 20,
  "Make Calendar": 21,
  "Make Collection": 22,
  "Make Redirect Reference": 23,
  "Make Workspace": 24,
  "Move": 25,
  "Order Patch": 26,
  "PRI": 27,
  "Property Find": 28,
  "Property Patch": 29,
  "Query": 30,
  "Rebind": 31,
  "Report": 32,
  "Search": 33,
  "Unbind": 34,
  "Un-Check Out": 35,
  "Unlink": 36,
  "Unlock": 37,
  "Update": 38,
  "Update Redirect Reference": 39,
  "Version Control": 40,
  "Other": 99,
};
