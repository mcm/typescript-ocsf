import { z } from 'zod';

import type { RpcInterfaceType } from './rpc_interface.js';

/**
 * The DCE/RPC, or Distributed Computing Environment/Remote Procedure Call, object describes the remote procedure call system for distributed computing environments.
 *
 * OCSF Object: DCE/RPC
 */
export interface DceRpcType {
  /** The request command (e.g. REQUEST, BIND). */
  command?: string;
  /** The reply to the request command (e.g. RESPONSE, BINDACK or FAULT). */
  command_response?: string;
  /** The list of interface flags. */
  flags: string[];
  /** An operation number used to identify a specific remote procedure call (RPC) method or a method in an interface. */
  opnum?: number;
  /** The RPC Interface object describes the details pertaining to the remote procedure call interface. */
  rpc_interface: RpcInterfaceType;
}

import { RpcInterface } from './rpc_interface.js';

const DceRpcSchema = z.strictObject({
  /** The request command (e.g. REQUEST, BIND). */
  command: z.string().optional(),
  /** The reply to the request command (e.g. RESPONSE, BINDACK or FAULT). */
  command_response: z.string().optional(),
  /** The list of interface flags. */
  flags: z.array(z.string()),
  /** An operation number used to identify a specific remote procedure call (RPC) method or a method in an interface. */
  opnum: z.number().int().optional(),
  /** The RPC Interface object describes the details pertaining to the remote procedure call interface. */
  rpc_interface: RpcInterface,
});

export const DceRpc = DceRpcSchema;
