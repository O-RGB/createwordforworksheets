import AutoCompleteCustom from "@/components/common/auto-complete";
import CardCustom from "@/components/common/card";
import CheckBoxCustom from "@/components/common/check-box";
import RadioCustom from "@/components/common/radio";
import SwitchCustom from "@/components/common/switch";
import TextAreaCustom from "@/components/common/text-area";
import FeeFrom from "@/components/form/fee-from";
import { getLocal, setLocal } from "@/lib/local";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";
import ScrollDetection from "@/components/common/scroll-detection";
import { scrollToEleemtById } from "@/lib/scrollToEleemtById";
import { getResultOnForm } from "@/calculate/formToResult";
import ResultSetting from "@/components/form/result-form";
import FloatButtonForm from "@/components/form/floatButton-form";

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
  const [detectScroll, setDetectScroll] = useState<boolean>(false);
  const [modeSettingStiky, setModeSettingStiky] = useState<boolean>(false);
  const [priceAllNow, setPriceAllNow] = useState<number>(0);
  const [priceByDiscount, setPriceByDisconut] = useState<number | undefined>(
    undefined
  );
  const [feeSetting, setFeeSetting] = useState<FeeSetting | undefined>({
    // book_price: 40,
    delivery_fee: 40,
  });
  const [display, setDisplay] = useState<DisplaySetting>({
    grid: false,
    image: false,
  });

  // FUCNTON

  // const LocalSaveFee = (book_price: number, delivery_fee: number) => {
  //   setLocal("book_price", book_price);
  //   setLocal("delivery_fee", delivery_fee);
  // };

  useEffect(() => {
    let bookPrice = getLocal("book_price");
    let deliveryFee = getLocal("delivery_fee");
  }, []);

  const SettingModeComponent = (
    <>
      <RadioCustom
        value={modeSetting}
        onChange={(e) => {
          setModeSetting(e.target.value);
        }}
        defaultValue={"file"}
        radioOption={[
          { value: "file", label: "File" },
          { value: "print", label: "Print" },
          { value: "book", label: "Book" },
          { value: "mix", label: "Mix" },
        ]}
      ></RadioCustom>
    </>
  );

  const SettingComponent = (setting: string = "block md:hidden") => (
    <>
      <CardCustom Header={"Debug"} cardClassName={`${setting}`}>
        <Checkbox
          onChange={(e) => {
            setDebug(e.target.checked);
          }}
        >
          Debug mode : {JSON.stringify(debug)}
        </Checkbox>
      </CardCustom>
      <CardCustom Header={"Display"} cardClassName={`${setting}`}>
        <SwitchCustom
          className="flex gap-6 "
          value={display}
          onChange={(value: Option[]) => {
            let displayTemp: DisplaySetting = {
              grid: false,
              image: false,
            };
            value.map((data) => {
              displayTemp[data.value as DisplayOnFinish] = data.select ?? false;
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
      <CardCustom Header={"Mode"} cardClassName={`${setting}`}>
        {SettingModeComponent}
        {debug && <div>Mode Selection: {JSON.stringify(modeSetting)}</div>}
      </CardCustom>
      <div>
        <CardCustom Header={"Delivery Fee"} cardClassName={`${setting}`}>
          <FeeFrom
            feeSetting={feeSetting}
            onChange={(fee, key) => {
              let cloneFee = feeSetting;
              setFeeSetting(undefined);
              if (cloneFee) {
                cloneFee[key] = Number(fee);
                setTimeout(() => {
                  setFeeSetting(cloneFee);
                  // if (cloneFee) {
                  //   LocalSaveFee(cloneFee.book_price, cloneFee.delivery_fee);
                  // }
                }, 0);
              }
            }}
          ></FeeFrom>

          {debug && <div>Fee Selection: {JSON.stringify(feeSetting)}</div>}
        </CardCustom>
      </div>
      <div className="flex flex-col gap-2  ">
        <CardCustom Header={"Search Item"} cardClassName={`${setting}`}>
          <AutoCompleteCustom
            option={optionMockup}
            onSelect={(e) => scrollToEleemtById(e)}
          ></AutoCompleteCustom>
        </CardCustom>
      </div>
    </>
  );

  let CHiddin = SettingComponent("");

  return (
    <>
      {debug && <div className=" text-2xl font-bold">Version: 1.0.1</div>}

      <div
        className={`fixed w-full  ${
          modeSettingStiky ? "top-0" : "-top-10"
        } duration-300 z-40 pb-2`}
      >
        <div className="flex gap-2 p-2 items-center bg-white shadow-md ">
          <div className="text-sm">Mode: </div>
          <div>{SettingModeComponent}</div>
        </div>
      </div>

      <FloatButtonForm
        onSave={() => {
          getResultOnForm(
            form,
            feeSetting,
            modeSetting,
            keyMockup,
            getMockup,
            priceByDiscount
          ).then((data) => {
            if (data) {
              setResultString(data.customerStr);
              setPriceAllNow(data.priceAll);
              resultForm.setFieldValue("result", data.customerStr);
              setTimeout(() => {
                scrollToEleemtById("buttom-result");
              }, 10);
            }
          });
        }}
        removeResult={() => {
          setResetFormOnChange(false);
          setResultString("");
          resultForm.setFieldValue("result", undefined);
          setPriceAllNow(0);
          setPriceByDisconut(undefined);
          setTimeout(() => {
            setResetFormOnChange(true);
          }, 10);
        }}
      ></FloatButtonForm>

      <div className="relative flex md:gap-3 p-2 md:p-5 duration-300">
        <div className=" w-full ">
          <div className="flex flex-col gap-2">
            {CHiddin}
            <Form form={form}>
              <div className="flex flex-col gap-3">
                {getMockup.map((worksheets, IKey) => {
                  let getModel = worksheets.getHeadWorksheets();
                  return (
                    <div key={`header-key-${IKey}`}>
                      <CardCustom
                        Header={
                          <div id={getModel.formName}>
                            {getModel.headerTitle}
                          </div>
                        }
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

            <CardCustom Header={"Result Setting"} className="w-full">
              <ResultSetting
                onChange={(e) => {
                  setPriceByDisconut(e);
                }}
                setPriceAll={priceAllNow}
              ></ResultSetting>
            </CardCustom>
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
            <div id="buttom-result"></div>
          </div>
        </div>

        <div className=" md:w-20">
          <div
            className={`fixed md:sticky ${
              detectScroll ? "right-0" : "-right-14"
            } -right-10 hover:right-0 ${
              modeSettingStiky ? "top-14" : "top-2 md:top-4"
            }   z-30 bg-transparent transition-all duration-300`}
          >
            <div className="flex w-full h-fit ">
              <ScrollDetection
                getScrollProsition={(y) => {
                  if (y > 400) {
                    setModeSettingStiky(true);
                  } else {
                    setModeSettingStiky(false);
                  }
                }}
                scrollOnStop={(e) => {
                  setDetectScroll(!e);
                }}
                scrollToEleemtById={scrollToEleemtById}
                getMockup={getMockup}
              ></ScrollDetection>
              <div className="w-3  "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeGroup;
