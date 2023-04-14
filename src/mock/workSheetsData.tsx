import { HeadWorkSheets } from "@/model/headworksheets";
import { MathWorkSheets } from "./typeOfWork/math";
import { BasicWorkSheets } from "./typeOfWork/basic";

export const WorkSheetsData = (bookPrice:number) => {
  let headWorkSheets: HeadWorkSheets[] = [];

  headWorkSheets.push(
    new HeadWorkSheets({
      formName: "math",
      headerTitle: "คณิตศาสตร์",
      worksheets: MathWorkSheets(bookPrice),
    }),
    new HeadWorkSheets({
      formName: "basic",
      headerTitle: "พื้นฐาน",
      worksheets: BasicWorkSheets(bookPrice),
    })
  );

  return headWorkSheets;
};
