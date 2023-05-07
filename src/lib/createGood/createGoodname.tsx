interface CreateGoodNameStringPrice {
  price: number;
  good: string;
  array?: ResultCreateGoodname;
}

export const CreateGoodName = (
  resultCheckRelationship: ResultCheckRelationship[],
  mode: ResultWorkSheetsMode,
  settingOnFinish: InputSettingOnFinish,
  goodHeader = "🔥🔥รายการนะครับ🔥🔥\n",
  resultOnFinish: ResultSettingOnFinish
) => {
  resultCheckRelationship;
  let mainResult: ResultCreateGoodname = {};
  let goodArray: CreateGoodname[] = [];
  let returnData: CreateGoodNameStringPrice = {
    good: "",
    price: 0,
  };
  let price = 0;
  let relatrionshipCount: number = 0;
  resultCheckRelationship.map((child, i) => {
    const Real = child.realData;
    const Input = child.realData.WorksheetsModelInput;

    let file = 0;
    let print = 0;
    let book = 0;

    if (Real.value.length > 0 && Input) {
      Real.value.map((value) => {
        let goodTemp: CreateGoodname = {};
        // console.log(value)
        if (value.type == "File" && Input.price.file) {
          file = value.count * Input.price.file;
          price += file;
          goodTemp.type = "File";
        } else if (value.type == "Print" && Input.price.print) {
          print = value.count * Input.price.print;
          price += print + settingOnFinish.delivery_fee;
          goodTemp.type = "Print";
        } else if (value.type == "Book" && Input.price.book) {
          book = value.count * Input.price.book;
          price += book + settingOnFinish.book_price;
          goodTemp.type = "Book";
        }

        goodTemp.header = Input.name;

        let typeLabel = `${
          value.type == "File"
            ? `💾 (ไฟล์)`
            : value.type == "Print"
            ? `📘 ${value.count} ชุด (ปริ้น)`
            : value.type == "Book"
            ? `📕 ${value.count} ชุด (เข้าเล่ม)`
            : ""
        }`;

        goodTemp.typeLabel = typeLabel;
        if (value.count > 1) {
          let count = `${
            value.type == "Print"
              ? `📘 ราคาชุดละ ${Input.price.print} บาท`
              : value.type == "Book"
              ? `📕 ราคาชุดละ ${
                  (Input.price.book ?? 0) + +settingOnFinish.book_price
                } บาท`
              : ""
          }`;
          goodTemp.count = count;
        }

        let priceTmp = `🟩 ${
          value.type == "File"
            ? `${file}`
            : value.type == "Print"
            ? `${print}`
            : value.type == "Book"
            ? `${book + settingOnFinish.book_price}`
            : ""
        } บาท`;
        goodTemp.price = priceTmp;

        if (child.relatrionship && Input.relationship) {
          relatrionshipCount = relatrionshipCount + 1;
          if (Input.relationship.length == relatrionshipCount) {
            let special =
              `💥 ${child.conditionStr}\n` + `💥 ลดราคา -${Input.discount} บาท`;
            goodTemp.special = special;
            if (Input.discount) {
              price += -Input.discount;
              relatrionshipCount = 0;
            }
          }
        }
        goodArray.push(goodTemp);
      });
    }
  });

  mainResult.goodName = goodArray;

  if (mode == "Print" && resultCheckRelationship.length > 0) {
    let delivery = "✅ ค่าส่ง\n" + `🟩 ${settingOnFinish.delivery_fee} บาท`;
    mainResult.delivery = delivery;
    price += settingOnFinish.delivery_fee;
  }

  let priceAll = `🍀 ราคารวม \n` + `🟠 ${price} บาทครับผม\n`;
  mainResult.priceAll = priceAll;

  let string: string = goodHeader;
  mainResult.goodName.map((data, i) => {
    string += `✅ ${i + 1}. `;
    string += `${data.header}`;
    string += "\n";

    // if (!resultOnFinish.price && !resultOnFinish.type) {
    //   string = string.substring(0, string.lastIndexOf("\n"));
    // }

    if (resultOnFinish.type) {
      string += `${data.typeLabel}`;
      string += "\n";
    }

    if (data.count != undefined) {
      if (!resultOnFinish.price && !resultOnFinish.type) {
        string += "\n";
      }
      string += data.count;
      string += "\n";
    }
    // if (resultOnFinish.price) {
    string += data.price;
    string += "\n";
    // }
    if (data.special != undefined) {
      if (!resultOnFinish.price && !resultOnFinish.type) {
        string += "\n";
      }
      string += data.special;
      string += "\n";
    }
    string += "\n";
  });

  if (mainResult.delivery != undefined) {
    if (resultOnFinish.delivery) {
      string += mainResult.delivery;
      string += "\n";
      string += "\n";
    }
  }
  if (resultOnFinish.price) {
    string += mainResult.priceAll;
  }

  returnData.good = string;
  returnData.price = price;
  returnData.array = mainResult;

  return returnData;
};
