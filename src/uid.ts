/**
 * Configuration for UID auto-calculation per event class.
 */
export interface UidConfig {
  /** Fixed category_uid for this event class (e.g., 1 for System Activity). */
  categoryUid: number;
  /** Fixed class_uid for this event class (e.g., 1001 for File Activity). */
  classUid: number;
}

/**
 * Pre-fill UID fields that can be derived from the event class and activity.
 *
 * - category_uid: from event hierarchy (fixed per event class)
 * - class_uid: from schema UID (fixed per event class)
 * - type_uid: class_uid * 100 + activity_id (computed)
 *
 * User-provided values always take precedence. Pre-filling only occurs
 * for fields that are undefined or null.
 *
 * @param data - The event data (after sibling reconciliation)
 * @param config - UID configuration for this event class
 * @returns The data with pre-filled UID fields
 */
export function prefillUids(
  data: Record<string, unknown>,
  config: UidConfig,
): Record<string, unknown> {
  const result = { ...data };

  if (result.category_uid === undefined || result.category_uid === null) {
    result.category_uid = config.categoryUid;
  }

  if (result.class_uid === undefined || result.class_uid === null) {
    result.class_uid = config.classUid;
  }

  const activityId = result.activity_id;
  if (
    (result.type_uid === undefined || result.type_uid === null) &&
    activityId !== undefined &&
    activityId !== null
  ) {
    const classUid = Number(result.class_uid);
    result.type_uid = classUid * 100 + Number(activityId);
  }

  return result;
}
