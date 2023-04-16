export const SplitFileOutObj = (
  resultCheckRelationship: ResultCheckRelationship[],
  file: boolean = true
) => {
  let ResultCheckRelationshipMain: ResultCheckRelationship[] = [];
  resultCheckRelationship.map((child) => {
    let ResultCheckRelationshipChild: ResultCheckRelationship;
    let RealDataChild: CheckBoxGroupOptions<WorksheetsModelInput> | undefined;

    if (file) {
      if (child.realData.mode == "File") {
        RealDataChild = child.realData;
      }
    } else {
      if (child.realData.mode != "File") {
        RealDataChild = child.realData;
      }
    }

    if (RealDataChild) {
      ResultCheckRelationshipChild = {
        realData: RealDataChild,
        relatrionship: child.relatrionship,
        conditionStr: child.conditionStr,
      };
      ResultCheckRelationshipMain.push(ResultCheckRelationshipChild);
    }
  });

  return ResultCheckRelationshipMain;
};
