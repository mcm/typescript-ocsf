import { z } from "zod";

import { Fingerprint, type FingerprintType } from "./fingerprint.js";
import { Image, type ImageType } from "./image.js";
import { KeyValueObject, type KeyValueObjectType } from "./key_value_object.js";

/**
 * The Container object describes an instance of a specific container. A container is a prepackaged, portable system image that runs isolated on an existing system using a container runtime like containerd.
 *
 * OCSF Object: Container
 */
export interface ContainerType {
  /** Commit hash of image created for docker or the SHA256 hash of the container. For example: 13550340a8681c84c861aac2e5b440161c2b33a3e4f302ac680ca5b686de48de. */
  hash?: FingerprintType | undefined;
  /** The container image used as a template to run the container. */
  image?: ImageType | undefined;
  /** The list of labels associated to the container. */
  labels?: string[] | undefined;
  /** The container name. */
  name?: string | undefined;
  /** The network driver used by the container. For example, bridge, overlay, host, none, etc. */
  network_driver?: string | undefined;
  /** The orchestrator managing the container, such as ECS, EKS, K8s, or OpenShift. */
  orchestrator?: string | undefined;
  /** The unique identifier of the pod (or equivalent) that the container is executing on. */
  pod_uuid?: string | undefined;
  /** The backend running the container, such as containerd or cri-o. */
  runtime?: string | undefined;
  /** The size of the container image. */
  size?: number | undefined;
  /** The tag used by the container. It can indicate version, format, OS. */
  tag?: string | undefined;
  /** The list of tags; {key:value} pairs associated to the container. */
  tags?: KeyValueObjectType[] | undefined;
  /** The full container unique identifier for this instantiation of the container. For example: ac2ea168264a08f9aaca0dfc82ff3551418dfd22d02b713142a6843caa2f61bf. */
  uid?: string | undefined;
  [key: string]: unknown;
}

export const Container: z.ZodType<ContainerType> = z
  .object({
    /** Commit hash of image created for docker or the SHA256 hash of the container. For example: 13550340a8681c84c861aac2e5b440161c2b33a3e4f302ac680ca5b686de48de. */
    hash: Fingerprint.optional(),
    /** The container image used as a template to run the container. */
    image: Image.optional(),
    /** The list of labels associated to the container. */
    labels: z.array(z.string()).optional(),
    /** The container name. */
    name: z.string().optional(),
    /** The network driver used by the container. For example, bridge, overlay, host, none, etc. */
    network_driver: z.string().optional(),
    /** The orchestrator managing the container, such as ECS, EKS, K8s, or OpenShift. */
    orchestrator: z.string().optional(),
    /** The unique identifier of the pod (or equivalent) that the container is executing on. */
    pod_uuid: z.string().optional(),
    /** The backend running the container, such as containerd or cri-o. */
    runtime: z.string().optional(),
    /** The size of the container image. */
    size: z.number().int().optional(),
    /** The tag used by the container. It can indicate version, format, OS. */
    tag: z.string().optional(),
    /** The list of tags; {key:value} pairs associated to the container. */
    tags: z.array(KeyValueObject).optional(),
    /** The full container unique identifier for this instantiation of the container. For example: ac2ea168264a08f9aaca0dfc82ff3551418dfd22d02b713142a6843caa2f61bf. */
    uid: z.string().optional(),
  })
  .passthrough() as any;
