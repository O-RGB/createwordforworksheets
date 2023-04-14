import { WorksheetsModel } from "@/model/worksheets";

export const WorkSheetsToOption = (worksheets: WorksheetsModel[]) => {
  let checkbox: CheckBoxGroupOptions[] = [];
  worksheets.map((x) => {
    let temp = x.getWorksheets();
    if (temp?.name && temp?.workSheetsId) {
      checkbox.push({
        label: temp?.name,
        value: temp?.workSheetsId,
        image: temp?.imageUrl,
      });
    }
  });
  return checkbox;
};
