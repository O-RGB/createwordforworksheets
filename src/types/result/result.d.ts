type ResultWorkSheetsMode = "File" | "Print" | "Book";

interface ResultCheckRelationship {
  relatrionship: boolean;
  conditionStr?: string;
  mixMode?: boolean;
  realData: CheckBoxGroupOptions<WorksheetsModelInput>;
}
interface ResultCheckRelationshipSplitFileOutObj {
  relatrionship: boolean;
  conditionStr?: string;
  mixMode?: boolean;
  realData: CheckBoxGroupOptions<WorksheetsModelInput>[];
}

interface CreateSplitGoodsName {
  File?: CheckBoxGroupOptions<WorksheetsModelInput>[][];
  Print?: CheckBoxGroupOptions<WorksheetsModelInput>[][];
}
