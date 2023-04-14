import { WorkSheetsData } from "@/mock/workSheetsData";
export const GetResult = async (
  dataNoInterfaceFormName: any,
  bookPrice: number
) => {
  let modelGetFormName = WorkSheetsData(bookPrice);
  let getDataByResult: CheckBoxGroupOptions<WorksheetsModelInput>[][] = [];

  modelGetFormName.map((name) => {
    let temp = name.getHeadWorksheets();
    if (temp.formName) {
      getDataByResult.push(dataNoInterfaceFormName[temp.formName]);
    }
  });

  return getDataByResult;
};
