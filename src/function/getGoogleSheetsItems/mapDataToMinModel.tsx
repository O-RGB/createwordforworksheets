import { HeadWorkSheets } from "@/model/headworksheets";
import { WorksheetsModel } from "@/model/worksheets";

var groupBy = function (xs: GoogleSheetsGetItem[], key: string) {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const MapDataToMinModel = async (items: GoogleSheetsGetItem[]) => {
  let itemsGorup = groupBy(items, "group");

  let headWorkSheets: HeadWorkSheets[] = [];
  for (const key in itemsGorup) {
    if (itemsGorup.hasOwnProperty(key)) {
      const data: GoogleSheetsGetItem[] = itemsGorup[key];
      if (data.length > 0) {
        let worksheetsModel: WorksheetsModel[] = [];
        data.map((item) => {
          worksheetsModel.push(
            new WorksheetsModel({
              workSheetsMainId: item.group,
              workSheetsId: item.workSheetsId,
              conditionStr: item.conditionStr,
              discount: item.discount,
              relationship: item.relationship,
              imageUrl: item.imageUrl,
              name: item.name,
              workSheetsType: item.workSheetsType,
              paper: item.paper,
              price: item.price,
              root: item.root,
              filename: item.filename,
              fileUrlDownload: item.fileUrlDownload,
              imagePreview: item.imagePreview,
            })
          );
        });

        headWorkSheets.push(
          new HeadWorkSheets({
            formName: data[0].group,
            headerTitle: data[0].title,
            worksheets: worksheetsModel,
          })
        );
      }
    }
  }

  return headWorkSheets;

  //   WorksheetsModel();
};
