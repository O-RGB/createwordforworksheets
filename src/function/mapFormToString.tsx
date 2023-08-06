import { HeadWorkSheets } from "@/model/headworksheets";



const searchValueIsChecked = (
  keyMockup: string[],
  value: FormCheckboxResult
) => {
  let onlyChecked: CheckboxResult[] = [];
  keyMockup.map((key) => {
    let get = value[key];
    if (get?.checked) {
      onlyChecked.push(value[key]);
    }
  });
  return onlyChecked;
};

const mapValueToMainObj = (
  onlyChecked: CheckboxResult[],
  getMockup: HeadWorkSheets[]
) => {
  let input: WorksheetsModelInput[] = [];
  getMockup.map((head) => {
    let main = head.getHeadWorksheets();
    main.worksheets?.map((min) => {
      let work = min.getWorksheets();
      if (work) {
        input.push(work);
      }
    });
  });

  let inputSelect: IResult[] = [];
  onlyChecked.map((select) => {
    let find = input.find((x) => x.workSheetsId == select.id);
    if (find) {
      if (select.inputNumber) {
        inputSelect.push({
          real: find,
          inputValue: select.inputNumber,
        });
      }
    }
  });
  return inputSelect;
};

export const MapFormToString = (
  value: FormCheckboxResult,
  keyMockup: string[],
  getMockup: HeadWorkSheets[]
) => {
  let onlyChecked: CheckboxResult[] = searchValueIsChecked(keyMockup, value);
  let mapValueToHade: IResult[] = mapValueToMainObj(onlyChecked, getMockup);
  return mapValueToHade;
  console.log(mapValueToHade);
};
