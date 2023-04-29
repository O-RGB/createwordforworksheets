interface checkBoxType {
  id: string;
  title: string;
  name: string;
  select?: checkBoxSelect[];
  onSelect: boolean;
  headerArray: WorksheetsModelInput
}

interface checkBoxSelect {
  id: string;
  type: ResultWorkSheetsMode;
  count: number;
  bool: boolean;
  
}
