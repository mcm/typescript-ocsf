import { z } from 'zod';

/**
 * Details about where in the target entity, specified information was discovered. Only the attributes, relevant to the target entity type should be populated.
 *
 * OCSF Object: Occurrence Details
 */
export interface OccurrenceDetailsType {
  /** The cell name/reference in a spreadsheet. e.g A2 */
  cell_name?: string;
  /** The column name in a spreadsheet, where the information was discovered. */
  column_name?: string;
  /** The column number in a spreadsheet or a plain text document, where the information was discovered. */
  column_number?: number;
  /** The line number of the last line of the file, where the information was discovered. */
  end_line?: number;
  /** The JSON path of the attribute in a json record, where the information was discovered */
  json_path?: string;
  /** The page number in a document, where the information was discovered. */
  page_number?: number;
  /** The index of the record in the array of records, where the information was discovered. e.g. the index of a record in an array of JSON records in a file. */
  record_index_in_array?: number;
  /** The row number in a spreadsheet, where the information was discovered. */
  row_number?: number;
  /** The line number of the first line of the file, where the information was discovered. */
  start_line?: number;
}

const OccurrenceDetailsSchema: z.ZodType<OccurrenceDetailsType> = z.strictObject({
  /** The cell name/reference in a spreadsheet. e.g A2 */
  cell_name: z.string().optional(),
  /** The column name in a spreadsheet, where the information was discovered. */
  column_name: z.string().optional(),
  /** The column number in a spreadsheet or a plain text document, where the information was discovered. */
  column_number: z.number().int().optional(),
  /** The line number of the last line of the file, where the information was discovered. */
  end_line: z.number().int().optional(),
  /** The JSON path of the attribute in a json record, where the information was discovered */
  json_path: z.string().optional(),
  /** The page number in a document, where the information was discovered. */
  page_number: z.number().int().optional(),
  /** The index of the record in the array of records, where the information was discovered. e.g. the index of a record in an array of JSON records in a file. */
  record_index_in_array: z.number().int().optional(),
  /** The row number in a spreadsheet, where the information was discovered. */
  row_number: z.number().int().optional(),
  /** The line number of the first line of the file, where the information was discovered. */
  start_line: z.number().int().optional(),
});

export const OccurrenceDetails = OccurrenceDetailsSchema;
