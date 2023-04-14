type WorkSheetsType = "sheets" | "room";

interface WorkSheetsDetailPrice {
  print?: number;
  book?: number;
  file?: number;
  tool?: number;
}

interface WorksheetsModelInput {
  workSheetsId: string;
  workSheetsType: WorkSheetsType;
  name: string;
  imageUrl: string;
  price: WorkSheetsDetailPrice;
  conditionStr: string;
  relationship: string[];
}

interface HeadWorkSheetsInput<T> {
  formName?: string;
  headerTitle?: string;
  worksheets?: T[];
}
