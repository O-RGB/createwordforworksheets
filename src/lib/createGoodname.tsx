export const CreateGoodName = (
  resultCheckRelationship: ResultCheckRelationship[]
) => {
  console.log(resultCheckRelationship);
  let good: string = "🔥🔥รายการนะครับ🔥🔥\n";
  let price = 0;
  resultCheckRelationship.map((child, i) => {
    child.realData.map((goodData, j) => {
      if (goodData.number && goodData.realData?.price) {
        let file = 0;
        let print = 0;
        let book = 0;

        if (goodData.mode == "File" && goodData.realData?.price.file) {
          file = goodData.number * goodData.realData?.price.file;
          price += file;
        } else if (goodData.mode == "Print" && goodData.realData?.price.print) {
          print = goodData.number * goodData.realData?.price.print;
          price += print;
        } else if (goodData.mode == "Book" && goodData.realData?.price.book) {
          book = goodData.number * goodData.realData?.price.book;
          price += book;
        }

        let detail = `✅ ${i + 1}. `;
        detail += `${goodData.label} \n`;
        detail += `${
          goodData.mode == "File"
            ? `💾 (ไฟล์)`
            : goodData.mode == "Print"
            ? `📘 ${goodData.number} ชุด (ปริ้น)`
            : goodData.mode == "Book"
            ? `📕 ${goodData.number} ชุด (เข้าเล่ม)`
            : ""
        }\n`;
        if (goodData.number > 1) {
          detail += `${
            goodData.mode == "Print"
              ? `📘 ราคาชุดละ ${goodData.realData.price.print} บาท`
              : goodData.mode == "Book"
              ? `📕 ราคาชุดละ ${goodData.realData.price.book} บาท`
              : ""
          }\n`;
        }
        detail += `🟩 ${
          goodData.mode == "File"
            ? `${file}`
            : goodData.mode == "Print"
            ? `${print}`
            : goodData.mode == "Book"
            ? `${book}`
            : ""
        } บาท\n`;
        good += detail + "\n";
      }
    });
  });

  good += `🍀 ราคารวม \n${price} บาทครับผม`;

  return good;
};
