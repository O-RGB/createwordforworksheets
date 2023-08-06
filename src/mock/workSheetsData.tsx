import { HeadWorkSheets } from "@/model/headworksheets";
import { MathWorkSheets } from "./typeOfWork/math";
import { BasicWorkSheets } from "./typeOfWork/basic";
import { IntellectWorkSheets } from "./typeOfWork/intellect";

export const WorkSheetsData = async () => {
  let headWorkSheets: HeadWorkSheets[] = [];
  return Promise.all([
    MathWorkSheets(),
    IntellectWorkSheets(),
    BasicWorkSheets(),
  ]).then((data) => {
    headWorkSheets.push(
      new HeadWorkSheets({
        formName: "math",
        headerTitle: "คณิตศาสตร์",
        worksheets: data[0],
      }),
      new HeadWorkSheets({
        formName: "intellect",
        headerTitle: "เชาว์ปัญญา",
        worksheets: data[1],
      }),
      new HeadWorkSheets({
        formName: "basic",
        headerTitle: "พื้นฐาน",
        worksheets: data[2],
      })
    );
    return headWorkSheets;
  });
};
