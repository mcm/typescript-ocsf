/** Launch Type ID values. */
export const LaunchTypeId = {
  /** The launch type is unknown or not specified. */
  UNKNOWN: 0,
  /** Denotes that the <code>Launch</code> event represents atomic creation of a new process on Windows. This launch type ID may also be used to represent both steps of Unix process creation in a single <code>Launch</code> event. */
  SPAWN: 1,
  /** Denotes that the <code>Launch</code> event represents the "fork" step of Unix process creation, where a process creates a clone of itself in a parent-child relationship. WSL1 pico processes on Windows also use the 2-step Unix model. */
  FORK: 2,
  /** Denotes that the <code>Launch</code> event represents the "exec" step of Unix process creation, where a process replaces its executable image, command line, and environment. WSL1 pico processes on Windows also use the 2-step Unix model. */
  EXEC: 3,
  /** The launch type is not mapped. See the <code>launch_type</code> attribute, which contains a data source specific value. */
  OTHER: 99,
} as const;

export type LaunchTypeId = (typeof LaunchTypeId)[keyof typeof LaunchTypeId];

/** Label mapping for LaunchTypeId values. */
export const LaunchTypeIdLabels: Record<number, string> = {
  0: "Unknown",
  1: "Spawn",
  2: "Fork",
  3: "Exec",
  99: "Other",
};
