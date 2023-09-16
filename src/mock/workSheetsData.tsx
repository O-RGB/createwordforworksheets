import { HeadWorkSheets } from "@/model/headworksheets";
import { MathWorkSheets } from "./typeOfWork/math";
import { BasicWorkSheets } from "./typeOfWork/basic";
import { IntellectWorkSheets } from "./typeOfWork/intellect";
import { DrawWorkSheets } from "./typeOfWork/draw";
import { WordBaseWorkSheets } from "./typeOfWork/word-base";
import { ThaiWorkSheets } from "./typeOfWork/thai";
import { BasicOneWorkSheets } from "./typeOfWork/basic-one";
import { BasicAllOldWorkSheets } from "./typeOfWork/basic-all-old";
import { SheetsTypeOfWorkWorkSheets } from "./typeOfWork/sheets-type0fwork";

const formData = [
  {
    formName: "math",
    headerTitle: "คณิตศาสตร์",
    fetchData: MathWorkSheets,
  },
  {
    formName: "intellect",
    headerTitle: "เชาว์ปัญญา",
    fetchData: IntellectWorkSheets,
  },
  // {
  //   formName: "basic",
  //   headerTitle: "พื้นฐาน",
  //   fetchData: BasicWorkSheets,
  // },
  // {
  //   formName: "draw",
  //   headerTitle: "ลีลามือ",
  //   fetchData: DrawWorkSheets,
  // },
  // {
  //   formName: "wordbase",
  //   headerTitle: "คำพื้นฐาน",
  //   fetchData: WordBaseWorkSheets,
  // },
  // {
  //   formName: "thai",
  //   headerTitle: "ภาษาไทย",
  //   fetchData: ThaiWorkSheets,
  // },
  // {
  //   formName: "baseOne",
  //   headerTitle: "แบบฝึกหัดพื้นฐาน",
  //   fetchData: BasicOneWorkSheets,
  // },
  // {
  //   formName: "baseAllOld",
  //   headerTitle: "ใบงานอนุบาล (เหมา)",
  //   fetchData: BasicAllOldWorkSheets,
  // },
  // {
  //   formName: "sheetsTypeOfWork",
  //   headerTitle: "ในงานตามหน่วยอนุบาล",
  //   fetchData: SheetsTypeOfWorkWorkSheets,
  // },
];

export const WorkSheetsData = async () => {
  const headWorkSheets = await Promise.all(
    formData.map(async (formInfo) => {
      const worksheets = await formInfo.fetchData();
      return new HeadWorkSheets({
        formName: formInfo.formName,
        headerTitle: formInfo.headerTitle,
        worksheets: worksheets,
      });
    })
  );
  console.log(headWorkSheets);
  return headWorkSheets;
};
