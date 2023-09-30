import { HeadWorkSheets } from "@/model/headworksheets";
import { searchValueIsChecked } from "../result/mapFormToString";

const getWorkSheetsById = (onlyChecked: HeadWorkSheets[]) => {
  console.log(onlyChecked);
};

export const DisplayCustom = (
  keyMockup: string[],
  value: FormCheckboxResult,
  getMockup: HeadWorkSheets[]
) => {
  let onlyChecked: CheckboxResult[] = searchValueIsChecked(keyMockup, value);
  getWorkSheetsById(getMockup);

  console.log(onlyChecked, "NEWFU");
};
