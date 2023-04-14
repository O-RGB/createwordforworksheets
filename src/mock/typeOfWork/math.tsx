import { WorksheetsModel } from "@/model/worksheets";

export const MathWorkSheets = () => {
  let worksheetsModel: WorksheetsModel[] = [];
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH001",
      conditionStr: "ซื้อคณิตศาสตร์ครบ 3 ชั้น",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "คณิตศาสตร์ อ.1",
      relationship: ["MATH001", "MATH002", "MATH003"],
      workSheetsType: "room",
      price: {
        file: 99,
        print: 240,
        book: 34,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH002",
      conditionStr: "ซื้อคณิตศาสตร์ครบ 3 ชั้น",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "คณิตศาสตร์ อ.2",
      relationship: ["MATH001", "MATH002", "MATH003"],
      workSheetsType: "room",
      price: {
        book: 34,
        file: 43,
        print: 49,
      },
    })
  );
  return worksheetsModel;
};
