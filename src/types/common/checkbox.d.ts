interface CheckBoxGroupOptions<T> {
  value: string;
  label: string;
  realData?: T;
  // image: string;
  mode?: ResultWorkSheetsMode;
  number?: number;
  relationship?: string[][];
  // price?: WorkSheetsDetailPrice;
  disabled?: boolean;
}
