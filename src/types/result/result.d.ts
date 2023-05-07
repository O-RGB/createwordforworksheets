type ResultWorkSheetsMode = "File" | "Print" | "Book";
type ResultSettingOnFinishType =
  | "Header"
  | "Type"
  | "Count"
  | "Special"
  | "Price";

interface ResultCheckRelationship {
  relatrionship: boolean;
  conditionStr?: string;
  mixMode?: boolean;
  realData: MapingFormResultToObj;
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

interface ResultCreateGoodname {
  goodName?: CreateGoodname[];
  delivery?: string;
  priceAll?: string;
}

interface CreateGoodname {
  header?: string;
  count?: string;
  typeLabel?: string;
  price?: string;
  special?: string;
  type?: ResultWorkSheetsMode;
}

interface MapingFormResultToObj {
  key: string;
  value: checkBoxSelect[];
  WorksheetsModelInput?: WorksheetsModelInput;
}

interface FormResult {
  key: string;
  select?: boolean;
  value?: checkBoxSelect[];
  WorksheetsModelInput?: WorksheetsModelInput;
}
