import { z } from 'zod';

/**
 * The RPC Interface represents the remote procedure call interface used in the DCE/RPC session.
 *
 * OCSF Object: RPC Interface
 */
export interface RpcInterfaceType {
  /** An integer that provides a reason code or additional information about the acknowledgment result. */
  ack_reason?: number;
  /** An integer that denotes the acknowledgment result of the DCE/RPC call. */
  ack_result?: number;
  /** The unique identifier of the particular remote procedure or service. */
  uuid: string;
  /** The version of the DCE/RPC protocol being used in the session. */
  version: string;
}

const RpcInterfaceSchema = z.strictObject({
  /** An integer that provides a reason code or additional information about the acknowledgment result. */
  ack_reason: z.number().int().optional(),
  /** An integer that denotes the acknowledgment result of the DCE/RPC call. */
  ack_result: z.number().int().optional(),
  /** The unique identifier of the particular remote procedure or service. */
  uuid: z.string(),
  /** The version of the DCE/RPC protocol being used in the session. */
  version: z.string(),
});

export const RpcInterface = RpcInterfaceSchema;
