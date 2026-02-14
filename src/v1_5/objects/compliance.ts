import { z } from 'zod';

import type { AssessmentType } from './assessment.js';
import type { CheckType } from './check.js';
import type { KbArticleType } from './kb_article.js';
import type { KeyValueObjectType } from './key_value_object.js';

/**
 * The Compliance object contains information about Industry and Regulatory Framework standards, controls and requirements or details about custom assessments utilized in a compliance evaluation. Standards define broad security frameworks, controls represent specific security requirements within those frameworks, and checks are the testable verification points used to determine if controls are properly implemented.
 *
 * OCSF Object: Compliance
 */
export interface ComplianceType {
  /** A list of assessments associated with the compliance requirements evaluation. */
  assessments?: AssessmentType[];
  /** The category a control framework pertains to, as reported by the source tool, such as Asset Management or Risk Assessment. */
  category?: string;
  /** A list of compliance checks associated with specific industry standards or frameworks. Each check represents an individual rule or requirement that has been evaluated against a target device. Checks typically include details such as the check name (e.g., CIS: 'Ensure mounting of cramfs filesystems is disabled' or DISA STIG descriptive titles), unique identifiers (such as CIS identifier '1.1.1.1' or DISA STIG identifier 'V-230234'), descriptions (detailed explanations of security requirements or vulnerability discussions), and version information. */
  checks?: CheckType[];
  /** A list of reference KB articles that provide information to help organizations understand, interpret, and implement compliance standards. They provide guidance, best practices, and examples. */
  compliance_references?: KbArticleType[];
  /** A list of established guidelines or criteria that define specific requirements an organization must follow. */
  compliance_standards?: KbArticleType[];
  /** A Control is a prescriptive, actionable set of specifications that strengthens device posture. The control specifies required security measures, while the specific implementation values are defined in control_parameters. E.g., CIS AWS Foundations Benchmark 1.2.0 - Control 2.1 - Ensure CloudTrail is enabled in all regions */
  control?: string;
  /** The list of control parameters evaluated in a Compliance check. E.g., parameters for CloudTrail configuration might include multiRegionTrailEnabled: true, logFileValidationEnabled: true, and requiredRegions: [us-east-1, us-west-2] */
  control_parameters?: KeyValueObjectType[];
  /** The description or criteria of a control. */
  desc?: string;
  /** The specific compliance requirements being evaluated. E.g., PCI DSS Requirement 8.2.3 - Passwords must meet minimum complexity requirements or HIPAA Security Rule 164.312(a)(2)(iv) - Implement encryption and decryption mechanisms */
  requirements?: string[];
  /** The regulatory or industry standards being evaluated for compliance. */
  standards?: string[];
  /** The resultant status of the compliance check normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status?: string;
  /** The resultant status code of the compliance check. */
  status_code?: string;
  /** The contextual description of the status, status_code values. */
  status_detail?: string;
  /** A list of contextual descriptions of the status, status_code values. */
  status_details?: string[];
  /** The normalized status identifier of the compliance check. */
  status_id?: 1 | 2 | 3;
}

import { Assessment } from './assessment.js';
import { Check } from './check.js';
import { KbArticle } from './kb_article.js';
import { KeyValueObject } from './key_value_object.js';

const ComplianceSchema = z.strictObject({
  /** A list of assessments associated with the compliance requirements evaluation. */
  assessments: z.array(Assessment).optional(),
  /** The category a control framework pertains to, as reported by the source tool, such as Asset Management or Risk Assessment. */
  category: z.string().optional(),
  /** A list of compliance checks associated with specific industry standards or frameworks. Each check represents an individual rule or requirement that has been evaluated against a target device. Checks typically include details such as the check name (e.g., CIS: 'Ensure mounting of cramfs filesystems is disabled' or DISA STIG descriptive titles), unique identifiers (such as CIS identifier '1.1.1.1' or DISA STIG identifier 'V-230234'), descriptions (detailed explanations of security requirements or vulnerability discussions), and version information. */
  checks: z.array(Check).optional(),
  /** A list of reference KB articles that provide information to help organizations understand, interpret, and implement compliance standards. They provide guidance, best practices, and examples. */
  compliance_references: z.array(KbArticle).optional(),
  /** A list of established guidelines or criteria that define specific requirements an organization must follow. */
  compliance_standards: z.array(KbArticle).optional(),
  /** A Control is a prescriptive, actionable set of specifications that strengthens device posture. The control specifies required security measures, while the specific implementation values are defined in control_parameters. E.g., CIS AWS Foundations Benchmark 1.2.0 - Control 2.1 - Ensure CloudTrail is enabled in all regions */
  control: z.string().optional(),
  /** The list of control parameters evaluated in a Compliance check. E.g., parameters for CloudTrail configuration might include multiRegionTrailEnabled: true, logFileValidationEnabled: true, and requiredRegions: [us-east-1, us-west-2] */
  control_parameters: z.array(KeyValueObject).optional(),
  /** The description or criteria of a control. */
  desc: z.string().optional(),
  /** The specific compliance requirements being evaluated. E.g., PCI DSS Requirement 8.2.3 - Passwords must meet minimum complexity requirements or HIPAA Security Rule 164.312(a)(2)(iv) - Implement encryption and decryption mechanisms */
  requirements: z.array(z.string()).optional(),
  /** The regulatory or industry standards being evaluated for compliance. */
  standards: z.array(z.string()).optional(),
  /** The resultant status of the compliance check normalized to the caption of the status_id value. In the case of 'Other', it is defined by the event source. */
  status: z.string().optional(),
  /** The resultant status code of the compliance check. */
  status_code: z.string().optional(),
  /** The contextual description of the status, status_code values. */
  status_detail: z.string().optional(),
  /** A list of contextual descriptions of the status, status_code values. */
  status_details: z.array(z.string()).optional(),
  /** The normalized status identifier of the compliance check. */
  status_id: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
});

export const Compliance = ComplianceSchema;
