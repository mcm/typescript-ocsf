import { z } from "zod";

import { CisControl, type CisControlType } from "./cis_control.js";
import { KbArticle, type KbArticleType } from "./kb_article.js";

/**
 * The Remediation object describes the recommended remediation steps to address identified issue(s).
 *
 * OCSF Object: Remediation
 */
export interface RemediationType {
  /** An array of Center for Internet Security (CIS) Controls that can be optionally mapped to provide additional remediation details. */
  cis_controls?: CisControlType[] | undefined;
  /** The description of the remediation strategy. */
  desc: string;
  /** A list of KB articles or patches related to an endpoint. A KB Article contains metadata that describes the patch or an update. */
  kb_article_list?: KbArticleType[] | undefined;
  /** The KB article/s related to the entity. A KB Article contains metadata that describes the patch or an update. */
  kb_articles?: string[] | undefined;
  /** A list of supporting URL/s, references that help describe the remediation strategy. */
  references?: string[] | undefined;
  [key: string]: unknown;
}

export const Remediation: z.ZodType<RemediationType> = z
  .object({
    /** An array of Center for Internet Security (CIS) Controls that can be optionally mapped to provide additional remediation details. */
    cis_controls: z.array(CisControl).optional(),
    /** The description of the remediation strategy. */
    desc: z.string(),
    /** A list of KB articles or patches related to an endpoint. A KB Article contains metadata that describes the patch or an update. */
    kb_article_list: z.array(KbArticle).optional(),
    /** The KB article/s related to the entity. A KB Article contains metadata that describes the patch or an update. */
    kb_articles: z.array(z.string()).optional(),
    /** A list of supporting URL/s, references that help describe the remediation strategy. */
    references: z.array(z.string()).optional(),
  })
  .passthrough() as any;
