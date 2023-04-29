const createCheckBoxGroupOptions = (
  child: CheckBoxGroupOptions<WorksheetsModelInput>,
  mode: ResultWorkSheetsMode,
  number: number
) => {
  return {
    label: child.label,
    value: child.value,
    disabled: child.disabled,
    mixData: child.mixData,
    mixMode: child.mixMode,
    mode: mode,
    number: number,
    realData: child.realData,
    relationship: child.relationship,
  };
};

export const CreateGoodNameMixMode = (
  data: CheckBoxGroupOptions<WorksheetsModelInput>[][]
): CreateSplitGoodsName => {
  let file: CheckBoxGroupOptions<WorksheetsModelInput>[][] = [];
  let print: CheckBoxGroupOptions<WorksheetsModelInput>[][] = [];
  data.map((arr) => {
    let fileTemp: CheckBoxGroupOptions<WorksheetsModelInput>[] = [];
    let printTemp: CheckBoxGroupOptions<WorksheetsModelInput>[] = [];
    arr.map((child) => {
      if (child.mixMode && child.mixData) {
        if (child.mixData.Book.count != 0) {
          let clone = createCheckBoxGroupOptions(
            child,
            "Book",
            child.mixData.Book.count
          );
          printTemp.push(clone);
        }
        if (child.mixData.Print.count != 0) {
          let clone = createCheckBoxGroupOptions(
            child,
            "Print",
            child.mixData.Print.count
          );
          printTemp.push(clone);
        }
        if (child.mixData.File.count != 0) {
          let clone = createCheckBoxGroupOptions(
            child,
            "File",
            child.mixData.File.count
          );
          fileTemp.push(clone);
        }
      }
    });

    print.push(printTemp);
    file.push(fileTemp);
  });

  return {
    File: file,
    Print: print,
  };
};
