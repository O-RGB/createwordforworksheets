type ResultWorkSheetsMode = "File" | "Print" | "Book";

interface ResultCheckRelationship {
  relatrionship: boolean;
  conditionStr?: string;
  realData: CheckBoxGroupOptions<WorksheetsModelInput>[];
}
