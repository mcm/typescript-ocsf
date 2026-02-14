import { z } from 'zod';

import type { AnalysisTargetType } from './analysis_target.js';
import type { AnomalyType } from './anomaly.js';
import type { BaselineType } from './baseline.js';

/**
 * Describes the analysis of activity patterns and anomalies of target entities to identify potential security threats, performance issues, or other deviations from established baselines. This includes monitoring and analyzing user interactions, API usage, resource utilization, access patterns and other measured indicators.
 *
 * OCSF Object: Anomaly Analysis
 */
export interface AnomalyAnalysisType {
  /** The analysis targets define the scope of monitored activities, specifying what entities, systems or processes are analyzed for activity patterns. */
  analysis_targets: AnalysisTargetType[];
  /** List of detected activities that significantly deviate from the established baselines. This can include unusual access patterns, unexpected user-agents, abnormal API usage, suspicious traffic spikes, unauthorized access attempts, and other activities that may indicate potential security threats or system issues. */
  anomalies: AnomalyType[];
  /** List of established patterns representing normal activity that serve as reference points for anomaly detection. This includes typical user interaction patterns like common user-agents, expected API access frequencies and patterns, standard resource utilization levels, and regular traffic flows. These baselines help establish what constitutes 'normal' activity in the system. */
  baselines?: BaselineType[];
}

import { AnalysisTarget } from './analysis_target.js';
import { Anomaly } from './anomaly.js';
import { Baseline } from './baseline.js';

const AnomalyAnalysisSchema = z.strictObject({
  /** The analysis targets define the scope of monitored activities, specifying what entities, systems or processes are analyzed for activity patterns. */
  analysis_targets: z.array(AnalysisTarget),
  /** List of detected activities that significantly deviate from the established baselines. This can include unusual access patterns, unexpected user-agents, abnormal API usage, suspicious traffic spikes, unauthorized access attempts, and other activities that may indicate potential security threats or system issues. */
  anomalies: z.array(Anomaly),
  /** List of established patterns representing normal activity that serve as reference points for anomaly detection. This includes typical user interaction patterns like common user-agents, expected API access frequencies and patterns, standard resource utilization levels, and regular traffic flows. These baselines help establish what constitutes 'normal' activity in the system. */
  baselines: z.array(Baseline).optional(),
});

export const AnomalyAnalysis = AnomalyAnalysisSchema;
