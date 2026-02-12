import { z } from 'zod';

import { CisControl } from './cis_control.js';
import { KbArticle } from './kb_article.js';

/**
 * The Remediation object describes the recommended remediation steps to address identified issue(s).
 *
 * OCSF Object: Remediation
 */
export const Remediation = z.object({
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
}).passthrough() as any;

export type RemediationType = z.infer<typeof Remediation>;
