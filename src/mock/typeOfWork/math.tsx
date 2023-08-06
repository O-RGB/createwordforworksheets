import { WorksheetsModel } from "@/model/worksheets";

export const MathWorkSheets = async () => {
  let worksheetsModel: WorksheetsModel[] = [];
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH001",
      relationship: ["MATH001", "MATH002", "MATH003"],
      conditionStr: "ซื้อคณิตศาสตร์ครบ 3 ชั้น",
      discount: 17,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "คณิตศาสตร์ อ.1",
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
      workSheetsId: "MATH002",
      relationship: ["MATH001", "MATH002", "MATH003"],
      conditionStr: "ซื้อคณิตศาสตร์ครบ 3 ชั้น",
      discount: 17,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH2.png?alt=media&token=1b88dcc8-663b-4b9f-aefb-a84008bf2c86",
      name: "คณิตศาสตร์ อ.2",
      workSheetsType: "room",
      price: {
        file: 99,
        book: 240,
        print: 240,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH003",
      relationship: ["MATH001", "MATH002", "MATH003"],
      conditionStr: "ซื้อคณิตศาสตร์ครบ 3 ชั้น",
      discount: 17,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH3.png?alt=media&token=11803051-7c35-488b-8d6b-9795ba41eb84",
      name: "คณิตศาสตร์ อ.3",
      workSheetsType: "room",
      price: {
        file: 99,
        book: 240,
        print: 240,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH004",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH4.png?alt=media&token=a507a7a5-b5b6-456e-a755-f7bab14a8065",
      name: "คณิตศาสตร์ ป.1 (เทอม 1)",
      workSheetsType: "room",
      price: {
        file: 150,
        // book: 240,
        // print: 49,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH005",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH4.png?alt=media&token=a507a7a5-b5b6-456e-a755-f7bab14a8065",
      name: "คณิตศาสตร์ ป.1 (เทอม 2)",
      workSheetsType: "room",
      price: {
        file: 150,
        // book: 240,
        // print: 49,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH006",
      // relationship: ["MATH006", "MATH007"],
      // conditionStr: "ซื้อคณิตศาสตร์ ป.6 ครบ 2 เทอม",
      // discount: 10,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH4.png?alt=media&token=a507a7a5-b5b6-456e-a755-f7bab14a8065",
      name: "คณิตศาสตร์ ป.6 (เทอม 1)",
      workSheetsType: "room",
      price: {
        file: 100,
        // book: 240,
        // print: 49,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "MATH007",
      // relationship: ["MATH006", "MATH007"],
      // conditionStr: "ซื้อคณิตศาสตร์ ป.6 ครบ 2 เทอม",
      // discount: 10,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH4.png?alt=media&token=a507a7a5-b5b6-456e-a755-f7bab14a8065",
      name: "คณิตศาสตร์ ป.6 (เทอม 2)",
      workSheetsType: "room",
      price: {
        file: 100,
        // book: 240,
        // print: 49,
      },
    })
  );

  return worksheetsModel;
};
