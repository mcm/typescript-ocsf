import { describe, expect, it } from "vitest";
import { events, enums, objects } from "../../src/index.js";
import { events as v1_5Events } from "../../src/v1_5/index.js";

describe("per-object enum labels", () => {
  it("exports labels for nested object enum fields", () => {
    expect(objects.DeviceLabels.type_id[2]).toBe("Desktop");
    expect(objects.FingerprintLabels.algorithm_id[3]).toBe("SHA-256");
    expect(objects.AccountLabels.type_id).toBeDefined();
    expect(objects.UserLabels.type_id).toBeDefined();
    expect(objects.AnalyticLabels.type_id).toBeDefined();
    expect(objects.AnalyticLabels.state_id).toBeDefined();
    expect(objects.TicketLabels.status_id).toBeDefined();
    expect(objects.TicketLabels.type_id).toBeDefined();
  });

  it("uses the derived observable type enum for Observable.type_id", () => {
    expect(objects.ObservableLabels.type_id).toEqual(enums.ObservableTypeIdLabels);
  });

  it("exports an empty map for objects without enum fields", () => {
    expect(objects.KeyValueObjectLabels).toEqual({});
  });
});

describe("per-event enum labels", () => {
  it("exposes labels on the parser object and as a named export", () => {
    expect(events.IncidentFinding.labels).toBe(events.IncidentFindingLabels);
    expect(events.FileActivity.labels.activity_id[1]).toBe("Create");
    expect(events.FileActivity.labels.severity_id).toEqual(enums.SeverityIdLabels);
  });

  it("uses the incident status enum for IncidentFinding.status_id", () => {
    expect(events.IncidentFinding.labels.status_id).toEqual({
      0: "Unknown",
      1: "New",
      2: "In Progress",
      3: "On Hold",
      4: "Resolved",
      5: "Closed",
      99: "Other",
    });
    expect(events.IncidentFinding.StatusId.ON_HOLD).toBe(3);
    expect(events.IncidentFinding.StatusId).not.toHaveProperty("SUCCESS");
  });

  it("uses event-specific enums wherever values differ from the shared enum", () => {
    expect(events.DetectionFinding.StatusId.SUPPRESSED).toBe(3);
    expect(events.RemediationActivity.StatusId.DOES_NOT_EXIST).toBe(3);
    expect(v1_5Events.IncidentFinding.StatusId.CLOSED).toBe(5);
  });

  it("keeps shared enums when the values match", () => {
    expect(events.FileActivity.SeverityId).toBe(enums.SeverityId);
    expect(events.AuthorizeSession.StatusId).toBe(enums.StatusId);
  });
});
