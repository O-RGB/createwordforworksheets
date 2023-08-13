import { createTextForCustomer } from "@/function/finalToCustomer";
import { MapFormToString } from "@/function/mapFormToString";
import { validateForm } from "@/function/validateForm";
import { scrollToEleemtById } from "@/lib/scrollToEleemtById";
import { HeadWorkSheets } from "@/model/headworksheets";
import { FormInstance } from "antd";

interface ResultReturnForm {
  customerStr: string;
  priceByDiscount: number;
  priceAll: number;
}

export const getResultOnForm = async (
  form: FormInstance<any>,
  feeSetting: FeeSetting | undefined,
  modeSetting: ModeOnFinish,
  keyMockup: string[],
  getMockup: HeadWorkSheets[],
  setDiscount?: number
): Promise<ResultReturnForm | undefined> => {
  let initString: string | undefined = undefined;
  let checkNotCount = validateForm(form.getFieldsValue(), keyMockup);

  if (checkNotCount.length != 0) {
    scrollToEleemtById(checkNotCount[0], "bg-red-400", "p-0.5", "text-red-400");
    return undefined;
  } else {
    return form.validateFields().then(() => {
      if (feeSetting) {
        return MapFormToString(
          form.getFieldsValue(),
          keyMockup,
          getMockup,
          feeSetting,
          modeSetting == "mix"
        ).then((result) => {
          initString = "";
          let priceAll = 0;

          let file = createTextForCustomer(
            result.file,
            {
              mode: "file",
            },
            modeSetting == "mix"
          );

          priceAll = priceAll + result.file.priceAddFee;
          let print = createTextForCustomer(
            result.print,
            {
              mode: "print",
            },
            modeSetting == "mix"
          );
          priceAll = priceAll + result.print.priceAddFee;
          let book = createTextForCustomer(
            result.book,
            {
              mode: "book",
            },
            modeSetting == "mix"
          );
          priceAll = priceAll + result.book.priceAddFee;

          if (file) {
            initString = initString + (file + "\n\n");
            priceAll = priceAll + result.file.priceAddFee;
          }
          if (print) {
            if (file) {
              initString = initString + ("=================" + "\n");
            }
            initString = initString + (print + "\n\n");
            priceAll = priceAll + result.print.priceAddFee;
            if (book) {
              initString = initString + ("=================" + "\n");
            }
          }
          if (book) {
            initString += book;
            priceAll = priceAll + result.book.priceAddFee;
          }

          return {
            customerStr: initString,
            priceByDiscount: setDiscount ?? 0,
            priceAll: priceAll,
          };
        });
      }
    });
  }
};
