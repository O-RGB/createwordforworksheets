import { HeadWorkSheets } from "@/model/headworksheets";
import { MathWorkSheets } from "./typeOfWork/math";
import { BasicWorkSheets } from "./typeOfWork/basic";

export const WorkSheetsData = (bookPrice: number) => {
  let headWorkSheets: HeadWorkSheets[] = [];
  headWorkSheets.push(
    new HeadWorkSheets({
      formName: "math",
      headerTitle: "คณิตศาสตร์",
      relationship: [
        ["MATH001", "MATH002", "MATH003"],
        ["MATH006", "MATH007"],
      ],
      worksheets: MathWorkSheets(bookPrice),
    }),
    new HeadWorkSheets({
      formName: "basic",
      relationship: [["ZIP001", "ZIP002", "ZIP003"]],
      headerTitle: "พื้นฐาน",
      worksheets: BasicWorkSheets(bookPrice),
    })
  );

  return headWorkSheets;
};
