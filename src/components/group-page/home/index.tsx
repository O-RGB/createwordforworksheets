import AutoCompleteCustom from "@/components/common/auto-complete";
import CardCustom from "@/components/common/card";
import CheckBoxCustom from "@/components/common/check-box";
import InputCustom from "@/components/common/input";
import RadioCustom from "@/components/common/radio";
import SwitchCustom from "@/components/common/switch";
import FeeFrom from "@/components/form/fee-from";
import { getLocal, setLocal } from "@/lib/local";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form, Radio } from "antd";
import React, { useEffect, useState } from "react";

interface HomeGroupProps {
  getMockup: HeadWorkSheets[];
  optionMockup: Option[];
}

const HomeGroup: React.FC<HomeGroupProps> = ({ getMockup, optionMockup }) => {
  //SETTING DISPLAY
  const debug = true;

  // ELEMENT
  const [form] = Form.useForm();
  const [modeSetting, setModeSetting] = useState<ModeOnFinish>(1);
  const [feeSetting, setFeeSetting] = useState<
    InputSettingOnFinish | undefined
  >({
    book_price: 40,
    delivery_fee: 40,
  });
  const [display, setDisplay] = useState<DisplaySetting>({
    grid: false,
    image: false,
  });
  const [formResult, setFormResult] = useState<any>();

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
      {debug && <div className=" text-2xl font-bold">Version: DEBUG</div>}
      <div className="p-5">
        <div className="flex flex-col gap-2">
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
                setModeSetting(e.target.value);
              }}
              radioOption={[
                { value: 1, label: "File" },
                { value: 2, label: "Print" },
                { value: 3, label: "Book" },
                { value: 4, label: "Mix" },
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
                    console.log(cloneFee);
                  }
                }}
              ></FeeFrom>

              {debug && <div>Fee Selection: {JSON.stringify(feeSetting)}</div>}
            </CardCustom>
          </div>{" "}
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
                              <CheckBoxCustom
                                onChangeCheckBox={(result) => {
                                  setFormResult(result);
                                }}
                                name={getEleemtnModel.workSheetsId}
                                form={form}
                                display={display}
                                modeSetting={modeSetting}
                                id={getEleemtnModel.workSheetsId}
                                image={getEleemtnModel.imageUrl}
                                label={getEleemtnModel.name}
                              ></CheckBoxCustom>
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
        <div
          onClick={() => {
            console.log(form.getFieldsValue());
          }}
        >
          Result:{JSON.stringify(form.getFieldsValue())}
        </div>
      </div>
    </>
  );
};

export default HomeGroup;
