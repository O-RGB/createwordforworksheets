import ButtonCustom from "@/components/common/button";
import InputCustom from "@/components/common/input";
import {
  emojiBook,
  emojiFile,
  emojiPrint,
  menuDetailEmo,
  menuEmo,
} from "@/function/result/finalToCustomer";
import { HeadWorkSheets } from "@/model/headworksheets";
import { WorksheetsModel } from "@/model/worksheets";
import { Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import InputPrice from "./inputPrice";

interface findByIdAndPrice {
  value: IDisplayCustomItem[];
  price: number;
}

interface CustomResultFormProps {
  IFinalResultPrice?: IFinalResultPrice;
  ModeOnFinish: ModeOnFinish;
  getMockup: HeadWorkSheets[];
  form?: FormInstance<any>;
  onFinish?: (newItems?: HeadWorkSheets[]) => void;
  onReset?: () => void;
}

const CustomResultForm: React.FC<CustomResultFormProps> = ({
  IFinalResultPrice,
  ModeOnFinish,
  getMockup,
  form,
  onFinish,
  onReset,
}) => {
  const [selectType, setSelectType] = useState<IDisplayCustom[]>([]);
  const [priceNew, setPriceNew] = useState<number>(0);
  const [copyObj, setCopyObj] = useState<HeadWorkSheets[] | undefined>(
    undefined
  );
  const [priceOnSubmit, setPriceOnSubmit] = useState<number | undefined>(
    undefined
  );
  const [originPrice, setOriginPrice] = useState<number>(0);
  const [formChange, setFormChange] = useState<boolean>(false);

  const cloneObj = (mainObj: HeadWorkSheets[]) => {
    let cloneItems: HeadWorkSheets[] = [];
    mainObj.map((main) => {
      let cloneItem: WorksheetsModel[] = [];
      let getMain = main.getHeadWorksheets();
      getMain.worksheets?.map((min) => {
        let getMin = min.getWorksheets();
        if (getMin) {
          cloneItem.push(
            new WorksheetsModel({
              name: getMin.name,
              paper: getMin.paper,
              price: {
                book: getMin.price.book,
                file: getMin.price.file,
                print: getMin.price.print,
                tool: getMin.price.tool,
              },
              workSheetsId: getMin.workSheetsId,
              workSheetsMainId: getMin.workSheetsMainId,
              workSheetsType: getMin.workSheetsType,
              conditionStr: getMin.conditionStr,
              discount: getMin.discount,
              imageUrl: getMin.imageUrl,
              relationship: getMin.relationship,
            })
          );
        }
      });

      cloneItems.push(
        new HeadWorkSheets({
          formName: getMain.formName,
          headerTitle: getMain.headerTitle,
          worksheets: cloneItem,
          relationship: getMain.relationship,
        })
      );
    });

    return cloneItems;
  };

  const findById = (
    final: ITextResult,
    mode: ModeOnFinish
  ): findByIdAndPrice => {
    let realValue: IDisplayCustomItem[] = [];
    let price: number = 0;
    final.goods.map((data) => {
      getMockup?.find((main) => {
        let findObjById = main
          .getHeadWorksheets()
          .worksheets?.find(
            (min) => min.getWorksheets()?.workSheetsId == data.workSheetsId
          );
        let count: number = data.count;
        if (findObjById) {
          let getWork = findObjById.getWorksheets();
          if (getWork) {
            price += Number((getWork.price as any)[mode]) * count;
            realValue.push({ ...getWork, count: count });
          }
        }
      });
    });

    return { price: price, value: realValue };
  };

  useEffect(() => {
    if (!copyObj) {
      let copy = cloneObj(getMockup);
      setCopyObj(copy);
    }
    let realValue: IDisplayCustom[] = [];
    let priceAll: number = 0;
    if (ModeOnFinish == "file" && IFinalResultPrice?.file) {
      let workOnFile = findById(IFinalResultPrice.file, "file");
      realValue = [
        {
          mode: ModeOnFinish,
          WorksheetsModel: workOnFile.value,
        },
      ];
      priceAll = workOnFile.price;
    } else if (ModeOnFinish == "print" && IFinalResultPrice?.print) {
      let workOnPrint = findById(IFinalResultPrice.print, "print");
      realValue = [
        {
          mode: ModeOnFinish,
          WorksheetsModel: workOnPrint.value,
        },
      ];
      priceAll = workOnPrint.price;
    } else if (ModeOnFinish == "book" && IFinalResultPrice?.book) {
      let workOnBook = findById(IFinalResultPrice.book, "book");
      realValue = [
        {
          mode: ModeOnFinish,
          WorksheetsModel: workOnBook.value,
        },
      ];
      priceAll = workOnBook.price;
    } else if (ModeOnFinish == "mix") {
      if (IFinalResultPrice?.file) {
        let workOnFile = findById(IFinalResultPrice.file, "file");
        realValue.push({
          mode: "file",
          WorksheetsModel: workOnFile.value,
        });
        priceAll += workOnFile.price;
      }
      if (IFinalResultPrice?.print) {
        let workOnPrint = findById(IFinalResultPrice.print, "print");
        realValue.push({
          mode: "print",
          WorksheetsModel: workOnPrint.value,
        });
        priceAll += workOnPrint.price;
      }
      if (IFinalResultPrice?.book) {
        let workOnBook = findById(IFinalResultPrice.book, "book");
        realValue.push({
          mode: "book",
          WorksheetsModel: workOnBook.value,
        });
        priceAll += workOnBook.price;
      }
    }

    // if (!priceOnSubmit) {
    setPriceNew(priceAll);
    setOriginPrice(priceAll);
    // }
    setSelectType(realValue);
  }, [IFinalResultPrice]);

  useEffect(() => {
    setPriceNew(0);
    // setOriginPrice(0);
    setPriceOnSubmit(undefined);
  }, [ModeOnFinish]);

  const onFieldsChange = (reset: boolean = false) => {
    let price: number = 0;
    let item = form?.getFieldsValue();
    for (var key in item) {
      let split = key.split("-");
      if (split[split.length] != "count") {
        if (item.hasOwnProperty(key)) {
          let getCount = form?.getFieldValue(key + "-count");
          if (getCount) {
            price += Number(item[key]) * getCount;
          }
        }
      }
    }

    setFormChange(!reset);
    setPriceOnSubmit(undefined);
    // setPriceOnSubmit(price);
    setPriceNew(price);
  };

  const onSumit = () => {
    if (copyObj) {
      let item = form?.getFieldsValue();
      for (var key in item) {
        let split = key.split("-");

        if (split.length > 1 && split[split.length] != "count") {
          if (item.hasOwnProperty(key)) {
            let mainId: string = split[0];
            let minId: string = split[1];
            let mode: ModeOnFinish = split[split.length - 1] as ModeOnFinish;

            let findIndexByMainId = copyObj.findIndex(
              (main) => main.getHeadWorksheets().formName == mainId
            );

            let cloneItem = copyObj[findIndexByMainId].getHeadWorksheets();

            if (cloneItem.worksheets) {
              let findIndexByMinId = cloneItem.worksheets.findIndex(
                (min) => min.getWorksheets()?.workSheetsId == minId
              );

              let onlyItem =
                cloneItem.worksheets[findIndexByMinId].getWorksheets();

              if (onlyItem) {
                ((
                  copyObj[findIndexByMainId]
                    .getHeadWorksheets()
                    .worksheets![findIndexByMinId].getWorksheets()?.price as any
                )[mode] as any) = Number(item[key]);
              }
            }
          }
        }
      }

      onFinish?.(copyObj);
      setPriceOnSubmit(priceNew);
      setFormChange(false);
      // setTimeout(() => {
      //   setPriceOnSubmit(undefined);
      // }, 1000);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="flex flex-col gap-1 "
      onFieldsChange={() => onFieldsChange()}
      onFinish={onSumit}
    >
      <div>รายการที่เลือก</div>
      <div className="flex flex-col gap-4 rounded-md p-1 md:pr-4">
        {selectType.map((data, i) => {
          return (
            <div
              key={`custom-main-result-${i}`}
              className=" flex flex-col gap-1 "
            >
              {data.WorksheetsModel.map((min, j) => {
                let price: number = Number((min?.price as any)[data.mode]);
                return (
                  <div
                    key={`custom-min-result-${i}-${j}`}
                    className="flex flex-col gap-1 p-1"
                  >
                    <div className="flex gap-1">
                      <div>
                        {menuEmo} {min.name}
                      </div>
                      <div>
                        (
                        {data.mode == "file"
                          ? emojiFile + " ไฟล์"
                          : data.mode == "print"
                          ? emojiPrint + " ปริ้น"
                          : data.mode == "book"
                          ? emojiBook + " เข้าเล่ม"
                          : ""}
                        )
                      </div>
                    </div>

                    {min.count > 1 && (
                      <div className="flex flex-col gap-1 w-fit">
                        <div>
                          {menuDetailEmo} {min.count} ชุด 📚
                        </div>
                      </div>
                    )}

                    <InputPrice
                      count={min.count}
                      name={`${min.workSheetsMainId}-${min?.workSheetsId}-${i}-${j}-${data.mode}`}
                      price={price}
                    ></InputPrice>

                    <div className="h-0 m-0 p-0 opacity-0 w-0">
                      <InputCustom
                        rules={[
                          {
                            type: "number",
                            min: 1,
                            message: "ตัวเลขเท่านั้น",
                          },
                        ]}
                        className="h-0 m-0 p-0 opacity-0 w-0"
                        initialValue={min.count}
                        name={`${min.workSheetsMainId}-${min?.workSheetsId}-${i}-${j}-${data.mode}-count`}
                      ></InputCustom>
                    </div>
                  </div>
                );
              })}
              {data.WorksheetsModel.length > 0 && (
                <div className="pt-3 flex justify-center items-center">
                  <hr className="w-full" />
                  <div className="whitespace-nowrap px-2 text-gray-400 text-xs italic">
                    จบ{" "}
                    {data.mode.charAt(0).toUpperCase() +
                      data.mode.slice(1, data.mode.length)}
                  </div>
                  <hr className="w-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3  items-center ">
        <div>
          <div>ราคารวม (ไม่รวมส่ง)</div>
          <div className="border rounded-md  p-4 text-lg font-bold text-center">
            {(priceOnSubmit ? priceOnSubmit : priceNew).toLocaleString()}฿
          </div>
        </div>

        {originPrice !== priceNew && (
          <>
            <div>
              <div className="select-none opacity-0">|</div>
              <div className="text-lg">
                <div className="h-full w-[1px] bg-gray-300  select-none">
                  <div className="opacity-0">|</div>
                </div>
              </div>
            </div>
            <div>
              <div>ราคาเก่า</div>
              <div className="border rounded-md p-4 text-lg font-bold text-center">
                {originPrice}฿
              </div>
            </div>
          </>
        )}
        {(originPrice !== priceNew || formChange) && (
          <div>
            <div>{originPrice > priceNew ? "ลดลง" : "มากกว่า"}</div>
            <div className="border rounded-md   p-4 text-lg font-bold text-center">
              {originPrice < priceNew ? (
                <div className="text-red-500">
                  +{(priceNew - originPrice).toLocaleString()}฿
                </div>
              ) : (
                <div className="text-green-500">
                  -{(originPrice - priceNew).toLocaleString()}฿
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 flex  gap-2">
        <ButtonCustom
          disabled={!IFinalResultPrice}
          type="primary"
          htmlType="submit"
        >
          ตกลง
        </ButtonCustom>
        <ButtonCustom
          disabled={!IFinalResultPrice}
          type="default"
          onClick={() => {
            form?.resetFields();
            onFieldsChange(true);
            setPriceOnSubmit(undefined);
            setTimeout(() => {
              onReset?.();
            }, 100);
          }}
        >
          รีเซ็ต
        </ButtonCustom>
      </div>
    </Form>
  );
};

export default CustomResultForm;
