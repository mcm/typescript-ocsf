import { z } from 'zod';

import type { ApplicationType } from './application.js';
import type { ServiceType } from './service.js';

/**
 * Communication context for AI system interactions including protocols, roles, clients, and session information for MCP and other AI communication systems.
 *
 * OCSF Object: Message Context
 */
export interface MessageContextType {
  /** The name or identifier of the message context. In AI systems, this could be the conversation ID, session name, thread identifier, or interaction name (e.g., 'user-session-123', 'conversation-abc', 'chat-thread-456'). */
  name?: string;
  /** The unique identifier of the message context. This could be a session ID, conversation ID, or other unique identifier that allows correlation of messages within the same context. */
  uid?: string;
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric?: number;
  /** The normalized caption of the ai_role_id. */
  ai_role?: string;
  /** Specifies the functional role of the AI within the context of this message, such as retrieving information, assisting reasoning, executing a tool, or generating content. */
  ai_role_id?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  /** The initiating client application. In AI systems, this represents the client-side application or framework that initiates requests (e.g., LangChain application, web browser, mobile app, SDK implementation). */
  application?: ApplicationType;
  /** Number of tokens in the model's response/completion for this message. */
  completion_tokens?: number;
  /** The text of the input prompt provided to the model for this message. This is the verbatim instruction, query, or context supplied to the AI system that drove the operation. */
  prompt_text?: string;
  /** Number of tokens in the input prompt for this message. */
  prompt_tokens?: number;
  /** The text of the model's response generated for this message. For agent-mediated operations, this is the content returned by the assistant, tool, or agent. */
  response_text?: string;
  /** The server or service handling the request. In AI systems, this represents the AI service, API endpoint, or agent that processes and responds to requests (e.g., OpenAI API service, Claude API service, internal AI model service). */
  service?: ServiceType;
  /** Total number of tokens used for this message (prompt + completion). */
  total_tokens?: number;
}

import { Application } from './application.js';
import { Service } from './service.js';

type MessageContextShape = {
  name: z.ZodOptional<z.ZodString>;
  uid: z.ZodOptional<z.ZodString>;
  uid_numeric: z.ZodOptional<z.ZodNumber>;
  ai_role: z.ZodOptional<z.ZodString>;
  ai_role_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<0>, z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>, z.ZodLiteral<99>]>>;
  application: z.ZodOptional<typeof Application>;
  completion_tokens: z.ZodOptional<z.ZodNumber>;
  prompt_text: z.ZodOptional<z.ZodString>;
  prompt_tokens: z.ZodOptional<z.ZodNumber>;
  response_text: z.ZodOptional<z.ZodString>;
  service: z.ZodOptional<typeof Service>;
  total_tokens: z.ZodOptional<z.ZodNumber>;
};

const MessageContextSchema: z.ZodObject<MessageContextShape, z.core.$strict> = z.strictObject({
  /** The name or identifier of the message context. In AI systems, this could be the conversation ID, session name, thread identifier, or interaction name (e.g., 'user-session-123', 'conversation-abc', 'chat-thread-456'). */
  name: z.string().optional(),
  /** The unique identifier of the message context. This could be a session ID, conversation ID, or other unique identifier that allows correlation of messages within the same context. */
  uid: z.string().optional(),
  /** The uid attribute in numeric form where applicable.Note: Producers may populate uid_numeric only in addition to uid and not as an alternative to it. */
  uid_numeric: z.number().int().optional(),
  /** The normalized caption of the ai_role_id. */
  ai_role: z.string().optional(),
  /** Specifies the functional role of the AI within the context of this message, such as retrieving information, assisting reasoning, executing a tool, or generating content. */
  ai_role_id: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(99)]).optional(),
  /** The initiating client application. In AI systems, this represents the client-side application or framework that initiates requests (e.g., LangChain application, web browser, mobile app, SDK implementation). */
  application: Application.optional(),
  /** Number of tokens in the model's response/completion for this message. */
  completion_tokens: z.number().int().optional(),
  /** The text of the input prompt provided to the model for this message. This is the verbatim instruction, query, or context supplied to the AI system that drove the operation. */
  prompt_text: z.string().optional(),
  /** Number of tokens in the input prompt for this message. */
  prompt_tokens: z.number().int().optional(),
  /** The text of the model's response generated for this message. For agent-mediated operations, this is the content returned by the assistant, tool, or agent. */
  response_text: z.string().optional(),
  /** The server or service handling the request. In AI systems, this represents the AI service, API endpoint, or agent that processes and responds to requests (e.g., OpenAI API service, Claude API service, internal AI model service). */
  service: Service.optional(),
  /** Total number of tokens used for this message (prompt + completion). */
  total_tokens: z.number().int().optional(),
});

export const MessageContext = MessageContextSchema;

/** Value → label mappings for each enum field of MessageContext. */
export const MessageContextLabels: Readonly<Record<"ai_role_id", Readonly<Record<number, string>>>> = {
  ai_role_id: {
    0: "Unknown",
    1: "User",
    2: "Assistant",
    3: "Tool",
    4: "Agent",
    5: "Orchestrator",
    6: "Retriever",
    99: "Other",
  },
};
