import { WorkSheetsData } from "@/mock/workSheetsData";

export const GetResult = async (x: any, bookPrice: number) => {
  let modelGetFormName = WorkSheetsData(bookPrice);
  let getDataByResult: any[] = [];
  modelGetFormName.map((name) => {
    let temp = name.getHeadWorksheets();
    if (temp.formName) {
      getDataByResult.push(x[temp.formName]);
    }
  });

  return getDataByResult;
};
