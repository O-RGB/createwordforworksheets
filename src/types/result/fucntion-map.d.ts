interface IResult {
  inputValue: InputValue[];
  real: WorksheetsModelInput;
}

interface IFinalResultPrice {
  file: ITextResult;
  print: ITextResult;
  book: ITextResult;
}

interface IFinalResultByDiscount {
  name: string;
  priceSum: number;
}
