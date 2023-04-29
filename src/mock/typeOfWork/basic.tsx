import { WorksheetsModel } from "@/model/worksheets";
export const BasicWorkSheets = () => {
  let worksheetsModel: WorksheetsModel[] = [];
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "ZIP001",
      relationship: ["ZIP001", "ZIP002", "ZIP003"],
      conditionStr: "ซื้อใบงานพื้นฐานครบ 3 ชั้น",
      discount: 17,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "พื้นฐาน อ.1",
      workSheetsType: "room",
      price: {
        file: 99,
        print: 240,
        book: 240,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "ZIP002",
      relationship: ["ZIP001", "ZIP002", "ZIP003"],
      conditionStr: "ซื้อใบงานพื้นฐานครบ 3 ชั้น",
      discount: 17,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "พื้นฐาน อ.2",
      workSheetsType: "room",
      price: {
        file: 99,
        print: 240,
        book: 240,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "ZIP003",
      relationship: ["ZIP001", "ZIP002", "ZIP003"],
      conditionStr: "ซื้อใบงานพื้นฐานครบ 3 ชั้น",
      discount: 17,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "พื้นฐาน อ.3",
      workSheetsType: "room",
      price: {
        file: 99,
        print: 240,
        book: 240,
      },
    })
  );

  return worksheetsModel;
};
