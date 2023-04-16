interface CheckBoxGroupOptions<T> {
  value: string;
  label: string;
  realData?: T;
  // image: string;
  mode?: ResultWorkSheetsMode;
  number?: number;
  relationship?: string[][];
  mixMode?: boolean;
  mixData?: checkboxMixMain;
  // price?: WorkSheetsDetailPrice;
  disabled?: boolean;
}

interface checkboxMixModeReturn {
  value: ResultWorkSheetsMode;
  count: number;
}

interface checkboxMixMain {
  Print: checkboxMixModeReturn;
  File: checkboxMixModeReturn;
  Book: checkboxMixModeReturn;
}
