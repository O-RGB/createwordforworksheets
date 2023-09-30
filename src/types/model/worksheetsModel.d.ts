// type WorkSheetsType = "sheets" | "room";

interface WorkSheetsDetailPrice {
  print?: number;
  book?: number;
  file?: number;
  tool?: number;
}

interface WorksheetsModelInput {
  workSheetsMainId: string;
  workSheetsId: string;
  workSheetsType: string;
  name: string;
  imageUrl?: string;
  price: WorkSheetsDetailPrice;
  paper: string | number;
  conditionStr?: string;
  relationship?: string[];
  discount?: number;
}

interface HeadWorkSheetsInput<T> {
  formName?: string;
  headerTitle?: string;
  relationship?: string[][];
  worksheets?: T[];
}

interface GoogleSheetsGetItem {
  workSheetsId: string;
  workSheetsType: string;
  group: string;
  name: string;
  paper: string | number;
  price: WorkSheetsDetailPrice;
  title?: string;
  relationship?: string[];
  discount?: number;
  conditionStr?: string;
  imageUrl?: string;
}
