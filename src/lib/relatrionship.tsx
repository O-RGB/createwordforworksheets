export const CheckRelatrionship = (
  WorksheetsModelInput: CheckBoxGroupOptions<WorksheetsModelInput>[][]
) => {
  console.log(WorksheetsModelInput);
  WorksheetsModelInput.map((main) => {
    main.map((child) => {
      let checkRelationship = child.relationship;
      let realData = child.realData;
      if (checkRelationship && realData) {
        checkRelationship?.map((ids) => {
          const isAllIdsValid = ids.every((id) =>
            main.some((obj) => obj.value === id)
          );
          if (isAllIdsValid) {
            console.log("All IDs are valid");
          } else {
            console.log("Some IDs are not valid");
          }
        });
      }
    });
  });
};
