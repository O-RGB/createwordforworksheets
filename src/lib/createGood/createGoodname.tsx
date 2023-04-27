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
  let mainResult: ResultCreateGoodname = {};
  let goodArray: CreateGoodname[] = [];
  let returnData: CreateGoodNameStringPrice = {
    good: "",
    price: 0,
  };
  let price = 0;
  let relatrionshipCount: number = 0;
  resultCheckRelationship.map((child, i) => {
    let goodTemp: CreateGoodname = {};
    if (child.realData.number && child.realData.realData?.price) {
      let file = 0;
      let print = 0;
      let book = 0;
      if (
        child.realData.mode == "File" &&
        child.realData.realData?.price.file
      ) {
        file = child.realData.number * child.realData.realData?.price.file;
        price += file;
        goodTemp.type = "File";
      } else if (
        child.realData.mode == "Print" &&
        child.realData.realData?.price.print
      ) {
        print = child.realData.number * child.realData.realData?.price.print;
        price += print;
        goodTemp.type = "Print";
      } else if (
        child.realData.mode == "Book" &&
        child.realData.realData?.price.book
      ) {
        book = child.realData.number * child.realData.realData?.price.book;
        price += book;
        goodTemp.type = "Book";
      }

      goodTemp.header = child.realData.label;
      let typeLabel = `${
        child.realData.mode == "File"
          ? `💾 (ไฟล์)`
          : child.realData.mode == "Print"
          ? `📘 ${child.realData.number} ชุด (ปริ้น)`
          : child.realData.mode == "Book"
          ? `📕 ${child.realData.number} ชุด (เข้าเล่ม)`
          : ""
      }`;

      goodTemp.typeLabel = typeLabel;

      if (child.realData.number > 1) {
        let count = `${
          child.realData.mode == "Print"
            ? `📘 ราคาชุดละ ${child.realData.realData.price.print} บาท`
            : child.realData.mode == "Book"
            ? `📕 ราคาชุดละ ${child.realData.realData.price.book} บาท`
            : ""
        }`;
        goodTemp.count = count;
      }

      let priceTmp = `🟩 ${
        child.realData.mode == "File"
          ? `${file}`
          : child.realData.mode == "Print"
          ? `${print}`
          : child.realData.mode == "Book"
          ? `${book}`
          : ""
      } บาท`;
      goodTemp.price = priceTmp;
      if (child.relatrionship && child.realData.realData.relationship) {
        relatrionshipCount = relatrionshipCount + 1;
        if (child.realData.realData.relationship.length == relatrionshipCount) {
          let special =
            `💥 ${child.conditionStr}\n` +
            `💥 ลดราคา -${child.realData.realData.discount} บาท`;
          goodTemp.special = special;
          if (child.realData.realData.discount) {
            price += -child.realData.realData.discount;
            relatrionshipCount = 0;
          }
        }
      }
    }
    if (goodTemp) {
      goodArray.push(goodTemp);
    }
  });

  mainResult.goodName = goodArray;

  if (mode == "Print" && resultCheckRelationship.length > 0) {
    let delivery = "✅ ค่าส่ง\n" + `🟩 ${settingOnFinish.delivery_fee} บาท`;
    mainResult.delivery = delivery;
  }

  let priceAll = `🍀 ราคารวม \n` + `🔴 ${price} บาทครับผม\n`;
  mainResult.priceAll = priceAll;

  let string: string = goodHeader;
  mainResult.goodName.map((data, i) => {
    string += `✅ ${i + 1}. `;
    string += `${data.header}`;
    string += "\n";

    if (!resultOnFinish.price && !resultOnFinish.type) {
      string = string.substring(0, string.lastIndexOf("\n"));
    }

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
    if (resultOnFinish.price) {
      string += data.price;
      string += "\n";
    }
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
