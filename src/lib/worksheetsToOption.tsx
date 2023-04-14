import { WorksheetsModel } from "@/model/worksheets";

export const WorkSheetsToOption = (worksheets: WorksheetsModel[]) => {
  let checkbox: CheckBoxGroupOptions<WorksheetsModelInput>[] = [];
  worksheets.map((x) => {
    let temp = x.getWorksheets();
    if (temp?.name && temp?.workSheetsId) {
      checkbox.push({
        label: temp?.name,
        value: temp?.workSheetsId,
        realData: temp,
      });
    }
  });
  return checkbox;
};
