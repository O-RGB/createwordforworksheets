// interface CheckBoxGroupOptions<T> {
//   value: string;
//   label: string;
//   realData?: T;
//   // image: string;
//   mode?: ResultWorkSheetsMode;
//   number?: number;
//   relationship?: string[][];
//   mixMode?: boolean;
//   mixData?: checkboxMixMain;
//   // price?: WorkSheetsDetailPrice;
//   disabled?: boolean;
// }

// interface checkboxMixModeReturn {
//   value: ResultWorkSheetsMode;
//   count: number;
// }

// interface checkboxMixMain {
//   mainId: string;
//   Print: checkboxMixModeReturn;
//   File: checkboxMixModeReturn;
//   Book: checkboxMixModeReturn;
// }

interface CheckboxResult {
  id: string;
  formName: string;
  checked: boolean;
  inputNumber?: InputValue[];
}

interface InputValue {
  value: string;
  name: string;
}

interface FormCheckboxResult {
  [key: string]: CheckboxResult;
}
