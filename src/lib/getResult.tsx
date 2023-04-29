import { WorkSheetsData } from "@/mock/workSheetsData";

export const GetResult = async (dataNoInterfaceFormName: any) => {
  let modelGetFormName = WorkSheetsData();
  let selectKeyAll: MapingFormResultToObj[] = [];

  Object.keys(dataNoInterfaceFormName).forEach((key) => {
    let isSelect = dataNoInterfaceFormName[key];
    if (isSelect == true) {
      selectKeyAll.push({
        key: key,
        value: dataNoInterfaceFormName[`${key}-value`],
      });
    }
  });

  modelGetFormName.map((name) => {
    let temp = name.getHeadWorksheets();
    let resultWorkSheets: WorksheetsModelInput[] = [];
    selectKeyAll.map((key) => {
      let result = temp.worksheets?.find(
        (x) => x.getWorksheets()?.workSheetsId == key.key
      );
      if (result) {
        let get = result.getWorksheets();
        if (get) {
          key.WorksheetsModelInput = get;
          resultWorkSheets.push(get);
        }
      }
    });
  });

  return selectKeyAll;
};
