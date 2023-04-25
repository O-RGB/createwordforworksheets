interface CreateGoodNameStringPrice {
  price: number;
  good: string;
}

export const CreateGoodName = (
  resultCheckRelationship: ResultCheckRelationship[],
  goodHeader = "🔥🔥รายการนะครับ🔥🔥\n"
) => {
  let returnData: CreateGoodNameStringPrice = {
    good: "",
    price: 0,
  };
  let price = 0;
  let good: string = goodHeader;
  let currentRelationship: string | undefined = undefined;
  let lastRelationship: string[] | undefined = undefined;
  let relatrionshipCount: number = 0;
  resultCheckRelationship.map((child, i) => {
    console.log(child);
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
      } else if (
        child.realData.mode == "Print" &&
        child.realData.realData?.price.print
      ) {
        print = child.realData.number * child.realData.realData?.price.print;
        price += print;
      } else if (
        child.realData.mode == "Book" &&
        child.realData.realData?.price.book
      ) {
        book = child.realData.number * child.realData.realData?.price.book;
        price += book;
      }

      let detail = `✅ ${i + 1}. `;
      detail += `${child.realData.label} \n`;
      detail += `${
        child.realData.mode == "File"
          ? `💾 (ไฟล์)`
          : child.realData.mode == "Print"
          ? `📘 ${child.realData.number} ชุด (ปริ้น)`
          : child.realData.mode == "Book"
          ? `📕 ${child.realData.number} ชุด (เข้าเล่ม)`
          : ""
      }\n`;
      if (child.realData.number > 1) {
        detail += `${
          child.realData.mode == "Print"
            ? `📘 ราคาชุดละ ${child.realData.realData.price.print} บาท`
            : child.realData.mode == "Book"
            ? `📕 ราคาชุดละ ${child.realData.realData.price.book} บาท`
            : ""
        }\n`;
      }
      detail += `🟩 ${
        child.realData.mode == "File"
          ? `${file}`
          : child.realData.mode == "Print"
          ? `${print}`
          : child.realData.mode == "Book"
          ? `${book}`
          : ""
      } บาท\n`;

      if (child.relatrionship) {
        relatrionshipCount = relatrionshipCount + 1;
        good += detail;
        if (
          child.realData.realData.relationship?.length == relatrionshipCount
        ) {
          good += `#this is type ${child.conditionStr}\n\n`;
        }else{
          good += "\n";
        }
      } else {
        relatrionshipCount = 0;
        good += detail + "\n";
      }
    }
  });

  good += `🍀 ราคารวม \n🔴 ${price} บาทครับผม`;
  returnData.good = good;
  returnData.price = price;
  return returnData;
};
