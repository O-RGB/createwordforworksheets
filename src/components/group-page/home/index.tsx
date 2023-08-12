import AutoCompleteCustom from "@/components/common/auto-complete";
import ButtonCustom from "@/components/common/button";
import CardCustom from "@/components/common/card";
import CheckBoxCustom from "@/components/common/check-box";
import RadioCustom from "@/components/common/radio";
import SwitchCustom from "@/components/common/switch";
import TextAreaCustom from "@/components/common/text-area";
import FeeFrom from "@/components/form/fee-from";
import { createTextForCustomer } from "@/function/finalToCustomer";
import { MapFormToString } from "@/function/mapFormToString";
import { getLocal, setLocal } from "@/lib/local";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";

interface HomeGroupProps {
  getMockup: HeadWorkSheets[];
  optionMockup: Option[];
  keyMockup: string[];
}

const HomeGroup: React.FC<HomeGroupProps> = ({
  getMockup,
  optionMockup,
  keyMockup,
}) => {
  //SETTING DISPLAY
  const [debug, setDebug] = useState<boolean>(false);

  // ELEMENT
  const [form] = Form.useForm();
  const [resultForm] = Form.useForm();
  const [modeSetting, setModeSetting] = useState<ModeOnFinish>("file");
  const [resetFormOnChange, setResetFormOnChange] = useState<boolean>(true);
  const [resultString, setResultString] = useState<string>("");
  const [feeSetting, setFeeSetting] = useState<FeeSetting | undefined>({
    book_price: 40,
    delivery_fee: 40,
  });
  const [display, setDisplay] = useState<DisplaySetting>({
    grid: false,
    image: false,
  });

  // FUCNTON
  const scrollToEleemtById = (id: string) => {
    var my_element: HTMLElement | null = document.getElementById(id);
    if (my_element) {
      my_element.className =
        "bg-amber-400 rounded-md duration-300 hover:bg-amber-400";
      setTimeout(() => {
        if (my_element) {
          my_element.className = "duration-300";
        }
      }, 2000);
      my_element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  const LocalSaveFee = (book_price: number, delivery_fee: number) => {
    setLocal("book_price", book_price);
    setLocal("delivery_fee", delivery_fee);
  };

  useEffect(() => {
    let bookPrice = getLocal("book_price");
    let deliveryFee = getLocal("delivery_fee");
  }, []);

  return (
    <>
      {debug && <div className=" text-2xl font-bold">Version: 1.0.1</div>}

      <div className="p-5">
        <div className="flex flex-col gap-2">
          <CardCustom Header={"Debug"}>
            <Checkbox
              onChange={(e) => {
                setDebug(e.target.checked);
              }}
            >
              Debug mode : {JSON.stringify(debug)}
            </Checkbox>
          </CardCustom>

          <CardCustom Header={"Display"}>
            <SwitchCustom
              className="flex gap-6 "
              value={display}
              onChange={(value: Option[]) => {
                let displayTemp: DisplaySetting = {
                  grid: false,
                  image: false,
                };
                value.map((data) => {
                  displayTemp[data.value as DisplayOnFinish] =
                    data.select ?? false;
                });
                setDisplay(displayTemp);
              }}
              switchOption={[
                { value: "image", label: "Image" },
                { value: "grid", label: "Grid" },
              ]}
            ></SwitchCustom>

            {debug && <div>Display Selection: {JSON.stringify(display)}</div>}
          </CardCustom>
          <CardCustom Header={"Mode"}>
            <RadioCustom
              value={modeSetting}
              onChange={(e) => {
                // form.resetFields();
                setModeSetting(e.target.value);
                // setResetFormOnChange(false);
                // setTimeout(() => {
                //   setResetFormOnChange(true);
                // }, 0);
                // setTimeout(() => {

                // }, 100);
                // getValueByForm();
              }}
              defaultValue={"file"}
              radioOption={[
                { value: "file", label: "File" },
                { value: "print", label: "Print" },
                { value: "book", label: "Book" },
                { value: "mix", label: "Mix" },
              ]}
            ></RadioCustom>
            {debug && <div>Mode Selection: {JSON.stringify(modeSetting)}</div>}
          </CardCustom>
          <div>
            <CardCustom Header={"Delivery Fee"}>
              <FeeFrom
                feeSetting={feeSetting}
                onChange={(fee, key) => {
                  let cloneFee = feeSetting;
                  setFeeSetting(undefined);
                  if (cloneFee) {
                    cloneFee[key] = Number(fee);
                    setTimeout(() => {
                      setFeeSetting(cloneFee);
                      if (cloneFee) {
                        LocalSaveFee(
                          cloneFee.book_price,
                          cloneFee.delivery_fee
                        );
                      }
                    }, 0);
                  }
                }}
              ></FeeFrom>

              {debug && <div>Fee Selection: {JSON.stringify(feeSetting)}</div>}
            </CardCustom>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-2 ">
          <CardCustom Header={"Search Item"}>
            <AutoCompleteCustom
              option={optionMockup}
              onSelect={scrollToEleemtById}
            ></AutoCompleteCustom>
          </CardCustom>
        </div>
        <Form form={form}>
          <div className="flex flex-col gap-3">
            {getMockup.map((worksheets, IKey) => {
              let getModel = worksheets.getHeadWorksheets();
              return (
                <div key={`header-key-${IKey}`}>
                  <CardCustom
                    Header={<div>Header: {getModel.headerTitle}</div>}
                  >
                    <div
                      className={`grid gap-2 ${
                        display.grid ? " lg:grid-cols-2 " : '"'
                      } transition-all`}
                    >
                      {getModel.worksheets?.map((element, JKey) => {
                        let getEleemtnModel = element.getWorksheets();
                        if (getEleemtnModel) {
                          return (
                            <div
                              key={`element-key-${JKey}`}
                              id={getEleemtnModel.workSheetsId}
                            >
                              {resetFormOnChange ? (
                                <CheckBoxCustom
                                  InputDisable={{
                                    file: !getEleemtnModel.price.file
                                      ? true
                                      : false,
                                    print: !getEleemtnModel.price.print
                                      ? true
                                      : false,
                                    book: !getEleemtnModel.price.book
                                      ? true
                                      : false,
                                  }}
                                  debug={debug}
                                  name={getEleemtnModel.workSheetsId}
                                  form={form}
                                  display={display}
                                  modeSetting={modeSetting}
                                  id={getEleemtnModel.workSheetsId}
                                  image={getEleemtnModel.imageUrl}
                                  label={getEleemtnModel.name}
                                ></CheckBoxCustom>
                              ) : (
                                <div className="min-h-[50px]"></div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </CardCustom>
                </div>
              );
            })}
          </div>
        </Form>

        <div className="p-5 flex justify-center items-center">
          <ButtonCustom
            onClick={() => {
              form.validateFields().then(() => {
                if (feeSetting) {
                  MapFormToString(
                    form.getFieldsValue(),
                    keyMockup,
                    getMockup,
                    feeSetting,
                    modeSetting == "mix"
                  ).then((result) => {
                    let initString: string = "";
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
                      setResultString(initString);
                    }
                    if (print) {
                      if (file) {
                        initString = initString + ("=================" + "\n");
                      }
                      initString = initString + (print + "\n\n");
                      if (book) {
                        initString = initString + ("=================" + "\n");
                      }
                      setResultString(initString);
                    }
                    if (book) {
                      initString += book;
                      setResultString(initString);
                    }
                    resultForm.setFieldValue("result", print);
                  });
                  // createTextForCustomer(map.file);
                }
              });
            }}
          >
            Get Result
          </ButtonCustom>
        </div>
        <CardCustom Header={"Result"}>
          <Form form={resultForm} layout="vertical">
            <TextAreaCustom
              autoSize
              readOnly
              name="result"
              value={resultString}
            ></TextAreaCustom>
          </Form>
        </CardCustom>
      </div>
    </>
  );
};

export default HomeGroup;
