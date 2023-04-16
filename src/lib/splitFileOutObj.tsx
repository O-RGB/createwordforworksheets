export const SplitFileOutObj = (
  resultCheckRelationship: ResultCheckRelationship[],
  file: boolean = true
) => {
  let ResultCheckRelationshipMain: ResultCheckRelationship[] = [];
  resultCheckRelationship.map((child) => {
    let ResultCheckRelationshipChild: ResultCheckRelationship;
    let RealDataChild: CheckBoxGroupOptions<WorksheetsModelInput>[] = [];
    child.realData.map((real) => {
      if (file) {
        if (real.mode == "File") {
          RealDataChild.push(real);
        }
      } else {
        if (real.mode != "File") {
          RealDataChild.push(real);
        }
      }
    });

    if (RealDataChild.length != 0) {
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
