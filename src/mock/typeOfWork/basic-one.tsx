import { WorksheetsModel } from "@/model/worksheets";
export const BasicOneWorkSheets = () => {
  let worksheetsModel: WorksheetsModel[] = [];
  worksheetsModel.push(
    new WorksheetsModel({
      workSheetsId: "BSONE001",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "แบบฝึกหัดคัด ก - ฮ",
      workSheetsType: "sheets",
      paper: 44,
      price: {
        file: 40,
      },
    }),
    new WorksheetsModel({
      workSheetsId: "BSONE002",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "แบบฝึกหัดคัด A - B",
      workSheetsType: "sheets",
      paper: 26,
      price: {
        file: 30,
      },
    }),
    new WorksheetsModel({
      workSheetsId: "BSONE003",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "แบบฝึกหัดคัด 1 - 10",
      workSheetsType: "sheets",
      paper: 10,
      price: {
        file: 20,
      },
    }),
    new WorksheetsModel({
      workSheetsId: "BSONE004",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/createwordforsale.appspot.com/o/MainProduct%2FMATH%2FMATH1.png?alt=media&token=9ef12848-96fe-4ed3-b1ba-a81b3ec4afe2",
      name: "แบบฝึกหัดคัด 1 - 100",
      workSheetsType: "sheets",
      paper: 100,
      price: {
        file: 59,
      },
    })
  );

  return worksheetsModel;
};
