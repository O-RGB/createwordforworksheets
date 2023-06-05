import { HeadWorkSheets } from "@/model/headworksheets";
import { MathWorkSheets } from "./typeOfWork/math";
import { BasicWorkSheets } from "./typeOfWork/basic";
import { IntellectWorkSheets } from "./typeOfWork/intellect";

export const WorkSheetsData = () => {
  let headWorkSheets: HeadWorkSheets[] = [];
  headWorkSheets.push(
    new HeadWorkSheets({
      formName: "math",
      headerTitle: "คณิตศาสตร์",
      worksheets: MathWorkSheets(),
    }),
    new HeadWorkSheets({
      formName: "intellect",
      headerTitle: "เชาว์ปัญญา",
      worksheets: IntellectWorkSheets(),
    }),
    new HeadWorkSheets({
      formName: "basic",
      headerTitle: "พื้นฐาน",
      worksheets: BasicWorkSheets(),
    }),
  );

  return headWorkSheets;
};
