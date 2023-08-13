import {
  createPriceAllForMixMode,
  createPriceByDiscount,
  createTextForCustomer,
} from "@/function/finalToCustomer";
import { MapFormToString } from "@/function/mapFormToString";
import { validateForm } from "@/function/validateForm";
import { scrollToEleemtById } from "@/lib/scrollToEleemtById";
import { HeadWorkSheets } from "@/model/headworksheets";
import { FormInstance } from "antd";

interface ResultReturnForm {
  customerStr: string;
  priceAll: number;
}

export const getResultOnForm = async (
  form: FormInstance<any>,
  feeSetting: FeeSetting | undefined,
  modeSetting: ModeOnFinish,
  keyMockup: string[],
  getMockup: HeadWorkSheets[],
  discount?: IFinalResultByDiscount
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

          let print = createTextForCustomer(
            result.print,
            {
              mode: "print",
            },
            modeSetting == "mix"
          );

          let book = createTextForCustomer(
            result.book,
            {
              mode: "book",
            },
            modeSetting == "mix"
          );

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

          if (modeSetting == "mix") {
            initString += "\n\n";
            initString += createPriceAllForMixMode(priceAll) + "\n\n";
          }

          if (discount) {
            // if (modeSetting == "mix") {
            //   initString += "\n";
            // }
            if (modeSetting == "book") {
              initString += "\n\n";
            }

            initString += createPriceByDiscount(discount) + "\n\n";
          }

          return {
            customerStr: initString,
            priceAll: priceAll,
          };
        });
      }
    });
  }
};
