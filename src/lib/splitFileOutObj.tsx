export const SplitFileOutObj = (
  resultCheckRelationship: ResultCheckRelationship[],
  file: boolean = true
) => {
  let output: ResultCheckRelationship[] = [];
  resultCheckRelationship.map((child) => {
    let only: MapingFormResultToObj;
    let temp: ResultCheckRelationship;

    let condition: checkBoxSelect[] = [];
    let valueSelect = child.realData.value;

    valueSelect.map((x) => {
      if (file) {
        if (x.type === "File") {
          condition.push(x);
        }
      } else {
        if (x.type !== "File") {
          condition.push(x);
        }
      }
    });

    only = {
      key: child.realData.key,
      value: condition,
      WorksheetsModelInput: child.realData.WorksheetsModelInput,
    };

    temp = {
      realData: only,
      relatrionship: file ? child.relatrionship : false,
      conditionStr: child.conditionStr,
      mixMode: child.mixMode,
    };

    output.push(temp);
  });

  return output;
};
