import {
  createFeeForMixMode,
  createPriceAllForMixMode,
  createPriceByDiscount,
  createTextForCustomer,
} from "@/function/result/finalToCustomer"; 
import { scrollToEleemtById } from "@/lib/scrollToEleemtById";
import { HeadWorkSheets } from "@/model/headworksheets";
import { FormInstance } from "antd";
import { validateForm } from "./validateForm";
import { MapFormToString } from "./mapFormToString";

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
  {
    /* <div className="bg-red-500 text-red-500 bg-amber-600"></div> */
  }
  if (checkNotCount.length != 0) {
    scrollToEleemtById(checkNotCount[0], "", "", "");
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
            if (result.print.goods.length > 0 || result.book.goods.length > 0) {
              initString += "\n\n";
              initString += createFeeForMixMode(feeSetting.delivery_fee);
              priceAll = priceAll + feeSetting.delivery_fee;
            }
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

          let string = initString ?? "";
          let removeSpace = string.split(/\n\s*\n+/);
          removeSpace = removeSpace.filter((segment) => segment.trim() !== "");

          return {
            customerStr: removeSpace.join("\n\n"),
            priceAll: priceAll,
          };
        });
      }
    });
  }
};
