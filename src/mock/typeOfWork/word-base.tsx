import { WorksheetsModel } from "@/model/worksheets";

export const WordBaseWorkSheets = async () => {
  let worksheetsModel: WorksheetsModel[] = [];
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "WORDBASE001",
      relationship: ["WORDBASE001", "WORDBASE002"],
      conditionStr: "ซื้อคำพื้นฐานอังกฤษครบ 2 เรื่อง",
      discount: 39,
      paper: 0,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "คำพื้นฐานอังกฤษ (เขียนเอง)",
      workSheetsType: "room",
      price: {
        file: 69,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "WORDBASE002",
      relationship: ["WORDBASE001", "WORDBASE002"],
      conditionStr: "ซื้อคำพื้นฐานอังกฤษครบ 2 เรื่อง",
      discount: 39,
      paper: 0,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "คำพื้นฐานอังกฤษ (เส้นประ)",
      workSheetsType: "room",
      price: {
        file: 69,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "WORDBASE003",
      relationship: ["WORDBASE003", "WORDBASE004"],
      conditionStr: "ซื้อคำพื้นฐานอังกฤษครบ 2 เรื่อง",
      discount: 39,
      paper: 0,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "คำพื้นฐานภาษาไทย (เขียนเอง)",
      workSheetsType: "room",
      price: {
        file: 69,
      },
    })
  );
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "WORDBASE004",
      relationship: ["WORDBASE003", "WORDBASE004"],
      conditionStr: "ซื้อคำพื้นฐานภาษาไทยครบ 2 เรื่อง",
      discount: 39,
      paper: 0,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "คำพื้นฐานภาษาไทย (เส้นประ)",
      workSheetsType: "room",
      price: {
        file: 69,
      },
    })
  );

  return worksheetsModel;
};
