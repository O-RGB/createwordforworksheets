import AutoCompleteCustom from "@/components/common/auto-complete";
import CardCustom from "@/components/common/card";
import CheckBoxCustom from "@/components/common/check-box";
import RadioCustom from "@/components/common/radio";
import SwitchCustom from "@/components/common/switch";
import TextAreaCustom from "@/components/common/text-area";
import FeeFrom from "@/components/form/fee-from";
import { getLocal } from "@/lib/local";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Checkbox, Form, Modal, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import ScrollDetection from "@/components/common/scroll-detection";
import { scrollToEleemtById } from "@/lib/scrollToEleemtById";
import { getResultOnForm } from "@/calculate/formToResult";
import ResultSetting from "@/components/form/result-form";
import FloatButtonForm from "@/components/form/floatButton-form";
import { NotificationPlacement } from "antd/es/notification/interface";

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

  const [feeSetting, setFeeSetting] = useState<FeeSetting | undefined>({
    delivery_fee: 40,
  });
  const [display, setDisplay] = useState<DisplaySetting>({
    grid: false,
    image: false,
  });

  // FUCNTON

  const GetReslut = (Discount?: IFinalResultByDiscount) => {
    getResultOnForm(
      form,
      feeSetting,
      modeSetting,
      keyMockup,
      getMockup,
      Discount ?? undefined
    ).then((data) => {
      if (data) {
        setPriceAllNow(data.priceAll);
        setResultString(data.customerStr);
        resultForm.setFieldValue("result", data.customerStr);
        copyToClipboard(data.customerStr);
        openNotification("top");
        ScreenStatus("success");
        setTimeout(() => {
          scrollToEleemtById("buttom-result", "", "", "text-white");
        }, 10);
      } else {
        ScreenStatus("error");
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.open({
      message: `คัดลอกขึ้น Clipboard แล้ว ✅`,
      duration: 1.5,
      placement,
    });
  };

  const [screenStatusColor, setScreenStatusColor] = useState<string>("");
  const ScreenStatus = (status: "success" | "error") => {
    let createClass: string = "";
    if (status == "success") {
      createClass = "border-green-500 ";
    } else if (status == "error") {
      createClass = "border-red-500 ";
    }
    setScreenStatusColor(createClass);
    setTimeout(() => {
      setScreenStatusColor("border-gray-100 ");
    }, 1000);
  };

  // const LocalSaveFee = (book_price: number, delivery_fee: number) => {
  //   setLocal("book_price", book_price);
  //   setLocal("delivery_fee", delivery_fee);
  // };

  useEffect(() => {
    // let bookPrice = getLocal("book_price");
    // let deliveryFee = getLocal("delivery_fee");
  }, []);

  // COMPONENT SETTING

  const [isModalSetting, setIsModalSettingOpen] = useState(false);

  const showModalSetting = () => {
    setIsModalSettingOpen(true);
  };

  const handleOkSetting = () => {
    setIsModalSettingOpen(false);
  };

  const handleCancelSetting = () => {
    setIsModalSettingOpen(false);
  };

  const _DEV_SettingDebugComponent = (
    <CardCustom Header={"Debug"}>
      <Checkbox
        onChange={(e) => {
          setDebug(e.target.checked);
        }}
      >
        Debug mode : {JSON.stringify(debug)}
      </Checkbox>
    </CardCustom>
  );

  const SettingModeComponent = (removeCard: boolean = false) => {
    let radio = (
      <RadioCustom
        value={modeSetting}
        onChange={(e) => {
          setModeSetting(e.target.value);
          setResultString("");
          setPriceAllNow(0);
          resultForm.setFieldValue("result", undefined);
        }}
        defaultValue={"file"}
        radioOption={[
          { value: "file", label: "File" },
          { value: "print", label: "Print" },
          { value: "book", label: "Book" },
          { value: "mix", label: "Mix" },
        ]}
      ></RadioCustom>
    );
    if (removeCard) {
      return radio;
    } else {
      return (
        <>
          <CardCustom Header={"Mode"}>
            {radio}
            {debug && <div>Mode Selection: {JSON.stringify(modeSetting)}</div>}
          </CardCustom>
        </>
      );
    }
  };

  const SettingDisplyComponent = (
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
  );

  const SettingDeliveryComponent = (
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
              // if (cloneFee) {
              //   LocalSaveFee(cloneFee.book_price, cloneFee.delivery_fee);
              // }
            }, 0);
          }
        }}
      ></FeeFrom>

      {debug && <div>Fee Selection: {JSON.stringify(feeSetting)}</div>}
    </CardCustom>
  );

  const SettingSearchComponent = (
    <div className="flex flex-col gap-2  ">
      <CardCustom Header={"Search Item"}>
        <AutoCompleteCustom
          option={optionMockup}
          onSelect={(e) =>
            scrollToEleemtById(e, "bg-green-400", "p-2", "text-white")
          }
        ></AutoCompleteCustom>
      </CardCustom>
    </div>
  );

  return (
    <div
      className={`bg-gray-100 duration-300 border-solid border-4 sm:border-8 ${screenStatusColor} duration-300  `}
    >
      {contextHolder}
      {debug && <div className=" text-2xl font-bold">Version: 1.0.1</div>}

      <div
        className={`fixed w-full  ${
          modeSettingStiky ? "top-0" : "-top-10"
        } duration-300 z-40 pb-2 left-0`}
      >
        <div className="flex gap-2 p-2 items-center bg-white shadow-md ">
          <div className="text-sm"> </div>
          <div>{SettingModeComponent(true)}</div>
        </div>
      </div>

      <Modal
        title="Setting"
        open={isModalSetting}
        onOk={handleOkSetting}
        onCancel={handleCancelSetting}
        footer={<></>}
      >
        <div className="flex flex-col gap-2">
          {_DEV_SettingDebugComponent}
          {SettingDisplyComponent}
        </div>
      </Modal>

      <FloatButtonForm
        onSetting={() => showModalSetting()}
        onSave={() => GetReslut()}
        removeResult={() => {
          setResetFormOnChange(false);
          setResultString("");
          resultForm.setFieldValue("result", undefined);
          setPriceAllNow(0);
          setTimeout(() => {
            setResetFormOnChange(true);
          }, 10);
        }}
      ></FloatButtonForm>

      <div className="relative flex md:gap-3 duration-300">
        <div className=" w-full ">
          <div className="flex flex-col gap-2">
            {SettingModeComponent()}
            {SettingDeliveryComponent}
            {SettingSearchComponent}
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
                          className={`grid gap-1.5 md:gap-2 ${
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
                cancel={GetReslut}
                onChange={(e) => {
                  console.log(e);
                  GetReslut({
                    name: "ได้รับส่วนลด",
                    priceSum: e,
                  });
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
                onActive={detectScroll}
                getScrollProsition={(y) => {
                  if (y > 100) {
                    setModeSettingStiky(true);
                  } else {
                    setModeSettingStiky(false);
                  }
                }}
                scrollOnStop={(e) => {
                  // setDetectScroll(!e);
                }}
                scrollToEleemtById={(e) =>
                  scrollToEleemtById(e, "bg-green-400", "p-2", "text-white")
                }
                getMockup={getMockup}
              ></ScrollDetection>
              <div className="w-3  "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGroup;
