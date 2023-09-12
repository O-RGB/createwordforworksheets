export const MapDataToSheets = async (
  FormData: IFormData
): Promise<IMapDataToSheets[][]> => {
  let lists: IMapDataToSheets[][] = [];
  for (const key in FormData) {
    if (FormData.hasOwnProperty(key)) {
      const data = FormData[key];
      if (data.checked) {
        let list: IMapDataToSheets[] = [];
        if (data.inputNumber) {
          for (const input of data.inputNumber) {
            if (
              input.value != "file" &&
              input.count != "0" &&
              input.disabled != true
            ) {
              for (let index = 0; index < Number(input.count); index++) {
                list.push({
                  id: key,
                  mode: input.value,
                });
              }
            }
          }
        }
        if (list) {
          lists.push(list);
        }
      }
    }
  }

  return lists;
};
