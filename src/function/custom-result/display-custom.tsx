import { HeadWorkSheets } from "@/model/headworksheets";
import { searchValueIsChecked } from "../result/mapFormToString";

const getWorkSheetsById = (onlyChecked: HeadWorkSheets[]) => {};

export const DisplayCustom = (
  keyMockup: string[],
  value: FormCheckboxResult,
  getMockup: HeadWorkSheets[]
) => {
  let onlyChecked: CheckboxResult[] = searchValueIsChecked(keyMockup, value);
  getWorkSheetsById(getMockup);
};
