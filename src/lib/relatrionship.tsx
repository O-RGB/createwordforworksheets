export const CheckRelatrionship = (
  WorksheetsModelInput: MapingFormResultToObj[]
  // WorksheetsModelInput: CheckBoxGroupOptions<WorksheetsModelInput>[][]
): ResultCheckRelationship[] => {
  let returnData: ResultCheckRelationship[] = [];
  WorksheetsModelInput.sort((a, b) => (a.key > b.key ? 1 : -1));
  WorksheetsModelInput.map((main) => {
    let relatrionship = main.WorksheetsModelInput?.relationship;

    let checkStore: boolean[] = [];
    relatrionship?.map((relat) => {
      let check = WorksheetsModelInput.map((x) => x.key).includes(relat);
      checkStore.push(check);
    });

    let check = checkStore.every((x) => x == true);

    returnData.push({
      realData: main,
      conditionStr: main.WorksheetsModelInput?.conditionStr,
      relatrionship: check,
      mixMode: false,
    });

    // main.map((child) => {
    //   let relatrionship = child.realData?.relationship;
    //   let check = false;

    //   let checkStore: boolean[] = [];
    //   relatrionship?.map((relatrion) => {
    //     main.map((data) => {
    //       if (data.value == relatrion && data.mode == "File") {
    //         checkStore.push(true);
    //       }
    //     });
    //   });

    //   if (checkStore.length == relatrionship?.length) {
    //     check = true;
    //   }
    //   returnData.push({
    //     realData: child,
    //     conditionStr: child.realData?.conditionStr,
    //     relatrionship: check,
    //     mixMode: child.mixMode,
    //   });
    // });
  });
  return returnData;
};
