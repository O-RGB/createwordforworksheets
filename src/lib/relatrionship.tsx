export const CheckRelatrionship = (
  WorksheetsModelInput: CheckBoxGroupOptions<WorksheetsModelInput>[][]
): ResultCheckRelationship[] => {
  let returnData: ResultCheckRelationship[] = [];
  WorksheetsModelInput.map((main) => {
    main.sort((a, b) => (a.value > b.value ? 1 : -1));
    main.map((child) => {
      let relatrionship = child.realData?.relationship;
      let check = false;

      let checkStore: boolean[] = [];
      relatrionship?.map((relatrion) => {
        main.map((data) => {
          if (data.value == relatrion && data.mode == "File") {
            checkStore.push(true);
          }
        });
      });

      if (checkStore.length == relatrionship?.length) {
        check = true;
      }
      returnData.push({
        realData: child,
        conditionStr: child.realData?.conditionStr,
        relatrionship: check,
        mixMode: child.mixMode,
      });
    });
  });
  return returnData;
};
