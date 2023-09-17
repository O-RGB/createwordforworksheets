import { searchValueIsChecked } from "./mapFormToString";

export const validateForm = (
  value: FormCheckboxResult,
  keyMockup: string[]
): string[] => {
  let checked = searchValueIsChecked(keyMockup, value);
  let searchCountZero: string[] = [];
  checked.map((data) => {
    let check = data.inputNumber?.every((x) => x.count == "0");
    if (check) {
      searchCountZero.push(data.id);
    }
  });
  return searchCountZero;
};
