import { z } from 'zod';

/**
 * The analysis target defines the scope of monitored activities, specifying what entity, system or process is analyzed for activity patterns.
 *
 * OCSF Object: Analysis Target
 */
export const AnalysisTarget: any = z.object({
  /** The specific name or identifier of the analysis target, such as the username of a User Account, the name of a Kubernetes Cluster, the identifier of a Network Namespace, or the name of an Application Component. */
  name: z.string(),
  /** The category of the analysis target, such as User Account, Kubernetes Cluster, Network Namespace, or Application Component. */
  type: z.string().optional(),
}).passthrough();

export type AnalysisTargetType = z.infer<typeof AnalysisTarget>;
