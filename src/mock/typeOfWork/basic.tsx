import { WorksheetsModel } from "@/model/worksheets";
export const BasicWorkSheets = (bookPrice: number) => {
  let worksheetsModel: WorksheetsModel[] = [];
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "ZIP001",
      conditionStr: "ซื้อใบงานพื้นฐานครบ 3 ชั้น",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "พื้นฐาน อ.1",
      workSheetsType: "room",
      price: {
        file: 99,
        print: 240,
        book: 240 + bookPrice,
      },
    })
  );

  return worksheetsModel;
};
