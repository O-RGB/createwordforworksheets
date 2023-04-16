import { CheckRelatrionship } from "../relatrionship";

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

// export const CreateGoodNameMixMode = (
//   resultCheckRelationship: ResultCheckRelationship[]
// ) => {
//   let ResultCheckRelationship_File: ResultCheckRelationship[] = [];
//   let ResultCheckRelationship_Print: ResultCheckRelationship[] = [];
//   let ResultCheckRelationship_Book: ResultCheckRelationship[] = [];
//   let DataForcheckRelatrionship: CheckBoxGroupOptions<WorksheetsModelInput>[][] =
//     [];

//   console.log(resultCheckRelationship);
//   resultCheckRelationship.map((main) => {
//     let mixData = main.realData.mixData;
//     if (mixData) {
//       if (mixData.Book.count != 0) {
//         let clone = createCheckBoxGroupOptions(
//           main.realData,
//           "Book",
//           mixData.Book.count
//         );
//         ResultCheckRelationship_Book.push({
//           realData: clone,
//           mixMode: main.mixMode,
//           relatrionship: false,
//         });
//       }
//       if (mixData.Print.count != 0) {
//         let clone = createCheckBoxGroupOptions(
//           main.realData,
//           "Print",
//           mixData.Print.count
//         );
//         ResultCheckRelationship_Print.push({
//           realData: clone,
//           mixMode: main.mixMode,
//           relatrionship: false,
//         });
//       }
//       if (mixData.File.count != 0) {
//         let clone = createCheckBoxGroupOptions(
//           main.realData,
//           "File",
//           mixData.File.count
//         );
//         ResultCheckRelationship_File.push({
//           realData: clone,
//           mixMode: main.mixMode,
//           relatrionship: main.relatrionship,
//           conditionStr: main.conditionStr,
//         });
//         DataForcheckRelatrionship.push([clone]);
//       }
//     }
//   });

//   let chek = CheckRelatrionship(DataForcheckRelatrionship);
//   console.log(DataForcheckRelatrionship);

//   let ResultCheckRelationship_FileTemp: ResultCheckRelationship[] = [];

//   ResultCheckRelationship_File.map((data) => {
//     let find = chek.find((x) => x.realData.value == data.realData.value);
//     let temp: ResultCheckRelationship = {
//       realData: data.realData,
//       relatrionship: false,
//       mixMode: data.mixMode,
//     };
//     if (find) {
//       temp.conditionStr = find.conditionStr;
//       temp.mixMode = find.mixMode;
//       temp.realData = find.realData;
//       temp.relatrionship = find.relatrionship;
//     }

//     ResultCheckRelationship_FileTemp.push(temp);
//   });

//   let returnData: CreateSplitGoodsName = {
//     Book: ResultCheckRelationship_Book,
//     File: ResultCheckRelationship_FileTemp,
//     Print: ResultCheckRelationship_Print,
//   };

//   return returnData;
// };
