import { HeadWorkSheets } from "@/model/headworksheets";

export const searchValueIsChecked = (
  keyMockup: string[],
  value: FormCheckboxResult
): CheckboxResult[] => {
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

const calculateRelationship = (
  goodFucus: IResult,
  goods: IResult[]
): IGoodsRelationship | undefined => {
  let relOfFocus: string[] | undefined = goodFucus.real.relationship;
  if (relOfFocus) {
    let falg: number = 0;
    relOfFocus.map((relId: string) => {
      let find = goods.find(
        (good) =>
          good.real.workSheetsId == relId && good.inputValue[0].count != "0"
      );
      if (find) {
        falg = falg + 1;
      }
    });

    if (
      falg == relOfFocus.length &&
      goodFucus.real.discount &&
      goodFucus.real.conditionStr
    ) {
      return {
        discount: goodFucus.real.discount,
        name: goodFucus.real.conditionStr,
        relationshipId: relOfFocus,
      };
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

const createGoddsString = (result: IResult[], modeSelect: ModeOnFinish) => {
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
        let keepRel =
          modeSelect == "file"
            ? calculateRelationship(value, result)
            : undefined;
        goods.push({
          count: Number(inputValueByMode.count),
          goodsName: value.real.name,
          price: getPriceByMode,
          type: modeSelect,
          workSheetsType: "sheets",
          relationship: keepRel,
        });
      }
    });
  }

  return goods;
};

const filterRelationship = (goods: IGoods[]) => {
  let toSame = (arr: string[]) => arr.sort().join("");
  let goodsClone: IGoods[] = [];
  let sum: number = 0;
  let discount: number = 0;
  goods.map((good, index) => {
    let _gctemp: IGoods = good;
    if (_gctemp.relationship) {
      let now = toSame(_gctemp.relationship.relationshipId);
      let futurn: string | undefined = undefined;
      if (index + 1 < goods.length) {
        futurn = toSame(goods[index + 1].relationship?.relationshipId ?? []);
      }
      if (now != futurn) {
        discount = discount + _gctemp.relationship.discount;
        sum = sum + good.price;
        sum = sum - _gctemp.relationship.discount;
        // _gctemp.relationship.discount = sum;
        sum = 0;
      } else {
        sum = sum + good.price;
        _gctemp.relationship = undefined;
      }
    }
    goodsClone.push(_gctemp);
  });
  return { goods: goodsClone, discountSum: discount };
};

const createIntroducingString = (
  goods: IGoods[],
  modeSelect: ModeOnFinish,
  fee: FeeSetting
): ITextResult => {
  let intro = undefined;
  let emoji = undefined;

  let price: number = 0;
  goods.map((x) => (price = price + x.price * x.count));

  let priceAddFee: number = price;

  if (modeSelect == "file") {
    intro = "ไฟล์";
    emoji = "💾";
    let filterGoods = filterRelationship(goods);
    goods = filterGoods.goods;
    priceAddFee = priceAddFee - filterGoods.discountSum;
  } else if (modeSelect == "print") {
    intro = "ปริ้น";
    emoji = "📗";
    priceAddFee = priceAddFee + fee.delivery_fee;
  } else if (modeSelect == "book") {
    intro = "เล่ม";
    emoji = "📕";
    priceAddFee = priceAddFee + fee.book_price;
    priceAddFee = priceAddFee + fee.delivery_fee;
  }
  return {
    goods: goods,
    introducing: intro,
    introducingEmoji: emoji,
    priceAll: price,
    priceAddFee: priceAddFee,
    ...fee,
  };
};

export const MapFormToString = async (
  value: FormCheckboxResult,
  keyMockup: string[],
  getMockup: HeadWorkSheets[],
  fee: FeeSetting,
  disabledFee: boolean
): Promise<IFinalResultPrice> => {
  let onlyChecked: CheckboxResult[] = searchValueIsChecked(keyMockup, value);
  let mapValueToHade: IResult[] = mapValueToMainObj(onlyChecked, getMockup);

  // split mode "file" | "print" | "book"
  let splitData = splitValueByTpye(mapValueToHade);

  // push obj by mode to Goods obj
  let createFile = createGoddsString(splitData.file, "file");
  let createPrint = createGoddsString(splitData.print, "print");
  let createBook = createGoddsString(splitData.book, "book");

  // summary all data
  let customFee = disabledFee ? { book_price: 0, delivery_fee: 0 } : fee;
  let fileIntro = createIntroducingString(createFile, "file", customFee);
  let printIntro = createIntroducingString(createPrint, "print", customFee);
  let bookIntro = createIntroducingString(createBook, "book", customFee);

  return { file: fileIntro, print: printIntro, book: bookIntro };
};
