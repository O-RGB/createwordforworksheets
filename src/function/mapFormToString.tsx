import { HeadWorkSheets } from "@/model/headworksheets";

const searchValueIsChecked = (
  keyMockup: string[],
  value: FormCheckboxResult
) => {
  let onlyChecked: CheckboxResult[] = [];
  keyMockup.map((key) => {
    let get = value[key];
    if (get?.checked) {
      onlyChecked.push(value[key]);
    }
  });
  return onlyChecked;
};

const mapValueToMainObj = (
  onlyChecked: CheckboxResult[],
  getMockup: HeadWorkSheets[]
) => {
  let input: WorksheetsModelInput[] = [];
  getMockup.map((head) => {
    let main = head.getHeadWorksheets();
    main.worksheets?.map((min) => {
      let work = min.getWorksheets();
      if (work) {
        input.push(work);
      }
    });
  });

  let inputSelect: IResult[] = [];
  onlyChecked.map((select) => {
    let find = input.find((x) => x.workSheetsId == select.id);
    if (find) {
      if (select.inputNumber) {
        inputSelect.push({
          real: find,
          inputValue: select.inputNumber,
        });
      }
    }
  });
  return inputSelect;
};

const splitValueByTpye = (result: IResult[]) => {
  let file: IResult[] = [];
  let print: IResult[] = [];
  let book: IResult[] = [];

  result.map((value) => {
    value.inputValue.map((type) => {
      if (!type.disabled) {
        // console.log(type);
        if (type.value == "file") {
          file.push({
            inputValue: [{ value: "file", count: type.count, label: "File" }],
            real: value.real,
          });
        } else if (type.value == "print") {
          print.push({
            inputValue: [{ value: "print", count: type.count, label: "Print" }],
            real: value.real,
          });
        } else if (type.value == "book") {
          book.push({
            inputValue: [{ value: "book", count: type.count, label: "Book" }],
            real: value.real,
          });
        }
      }
    });
  });

  return { file: file, print: print, book: book };
};

const createGoddsString = (
  result: IResult[],
  modeSelect: ModeOnFinish,
  fee: FeeSetting
) => {
  let introducing: ITextResult[] = [];
  let goods: IGoods[] = [];

  if (result.length > 0) {
    result.map((value) => {
      let inputValueByMode: InputValue = value.inputValue[0]; // data filted and index is 0
      let inputCount: number = Number(inputValueByMode.count);
      let getPriceByMode: number | undefined = undefined;
      if (modeSelect == "file") {
        getPriceByMode = value.real.price.file;
      } else if (modeSelect == "print") {
        getPriceByMode = value.real.price.print;
      } else if (modeSelect == "book") {
        getPriceByMode = value.real.price.book;
      }
      if (inputCount > 0 && getPriceByMode) {
        goods.push({
          count: Number(inputValueByMode.count),
          goodsName: value.real.name,
          price: getPriceByMode,
          type: modeSelect,
          workSheetsType: "sheets",
          ...fee,
        });
      }
    });
  }
  console.log(goods);
  return goods;
};

export const MapFormToString = (
  value: FormCheckboxResult,
  keyMockup: string[],
  getMockup: HeadWorkSheets[],
  fee: FeeSetting
) => {
  let onlyChecked: CheckboxResult[] = searchValueIsChecked(keyMockup, value);
  let mapValueToHade: IResult[] = mapValueToMainObj(onlyChecked, getMockup);
  let splitData = splitValueByTpye(mapValueToHade);
  let createFile = createGoddsString(splitData.file, "file", fee);
  let createPrint = createGoddsString(splitData.print, "print", fee);
  let createBook = createGoddsString(splitData.book, "book", fee);

  return mapValueToHade;
};
