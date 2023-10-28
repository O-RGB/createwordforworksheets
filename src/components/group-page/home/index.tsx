import AutoCompleteCustom from "@/components/common/auto-complete";
import CardCustom from "@/components/common/card";
import CheckBoxCustom from "@/components/common/check-box";
import RadioCustom from "@/components/common/radio";
import SwitchCustom from "@/components/common/switch";
import TextAreaCustom from "@/components/common/text-area";
import FeeFrom from "@/components/form/fee-from";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Checkbox, Form, Modal, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ScrollDetection from "@/components/common/scroll-detection";
import { scrollToEleemtById } from "@/lib/scrollToEleemtById";
import { getResultOnForm } from "@/function/result/formToResult";
import ResultSetting from "@/components/form/result-form";
import FloatButtonForm from "@/components/form/floatButton-form";
import { NotificationPlacement } from "antd/es/notification/interface";

import Router from "next/router";
import { SheetsContext } from "@/context/sheetsService";
import UserForm from "@/components/form/user-from";
import {
  CheckUsernameAndURLIsRuning,
  getFbToken,
  setFbToken,
  setUsernameOrURL,
} from "@/lib/checkGoogleSheetsUrl";
import {
  colorSuccess,
  colorDenger,
  BgCal,
  colorSecondary,
} from "@/config/color";
import { MapDataToSheets } from "@/function/result/mapForSheets";
import CustomResultForm from "@/components/form/custom-result-form";
import Connection from "@/apps/connection";
import FacebookTokenForm from "@/components/form/facebook-token-form";

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
  //COLOR

  //SETTING DISPLAY
  const [debug, setDebug] = useState<boolean>(false);

  // ELEMENT
  const [form] = Form.useForm<IFormData>();
  const [resultForm] = Form.useForm();
  const [setingResultForm] = Form.useForm();
  const [modeSetting, setModeSetting] = useState<ModeOnFinish>("file");
  const [resetFormOnChange, setResetFormOnChange] = useState<boolean>(true);
  const [resultString, setResultString] = useState<string>("");
  const [detectScroll, setDetectScroll] = useState<boolean>(false);
  const [modeSettingStiky, setModeSettingStiky] = useState<boolean>(false);
  const [priceAllNow, setPriceAllNow] = useState<number>(0);

  // FOR SETTING DATA
  const [IFinalResultPrice, setIFinalResultPrice] =
    useState<IFinalResultPrice>();
  const [customReset, setCustomReset] = useState<boolean>(true);

  const [feeSetting, setFeeSetting] = useState<FeeSetting | undefined>({
    delivery_fee: 40,
  });
  const [display, setDisplay] = useState<DisplaySetting>({
    grid: false,
    image: false,
  });
  const { setSheets, sheets } = useContext(SheetsContext);

  // FUCNTON

  const GetReslut = (
    Discount?: IFinalResultByDiscount,
    customMockup?: HeadWorkSheets[]
  ) => {
    getResultOnForm(
      form,
      feeSetting,
      modeSetting,
      keyMockup,
      customMockup ? customMockup : getMockup,
      Discount ?? undefined
    ).then((data) => {
      if (data) {
        // DisplayCustom(keyMockup, form.getFieldsValue() as any, getMockup);
        setIFinalResultPrice(data.IFinalResultObj);
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

  const ChangeToSeets = () => {
    CheckUsernameAndURLIsRuning().then((e) => {
      if (e) {
        MapDataToSheets(form.getFieldsValue()).then((data) => {
          setSheets(data);
          setTimeout(() => {
            Router.push("/sheets");
          }, 100);
        });
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

  const [screenStatusColor, setScreenStatusColor] = useState<any>({
    borderColor: colorSecondary,
  });
  const ScreenStatus = (status: "success" | "error") => {
    let createClass: any = {};
    if (status == "success") {
      createClass = { borderColor: colorSuccess };
    } else if (status == "error") {
      createClass = { borderColor: colorDenger };
    }
    setScreenStatusColor(createClass);
    setTimeout(() => {
      setScreenStatusColor({
        borderColor: colorSecondary,
      });
    }, 1000);
  };

  const checkBeforeGotoFacebook = () => {
    if (modeSetting == "file") {
      let toktn = getFbToken();
      if (toktn.fbToken) {
        MapDataToSheets(form.getFieldsValue(), true).then((data) => {
          setSheets(data);
          setTimeout(() => {
            Router.push("/facebook");
          }, 100);
        });
      }
    }
  };
  const checkBeforeSentMail = () => {
    if (modeSetting == "file") {
      CheckUsernameAndURLIsRuning().then((e) => {
        if (e) {
          MapDataToSheets(form.getFieldsValue(), true).then((data) => {
            setSheets(data);
            setTimeout(() => {
              Router.push("/email");
            }, 100);
          });
        }
      });
    }
  };

  const [userInitLocal, setUserInitLocal] = useState<IUserInput>();

  const [isModalUser, setIsModalUserOpen] = useState(false);

  const showModalUser = () => {
    setIsModalUserOpen(true);
  };

  const handleOkUser = (output: IUserInput) => {
    setUsernameOrURL(output);
    setIsModalUserOpen(false);
  };

  const handleCancelUser = () => {
    setIsModalUserOpen(false);
  };

  const checkUserAndSheets = async () => {
    CheckUsernameAndURLIsRuning().then((result) => {
      setUserInitLocal({
        googlesheets: result.local.sheets ? result.local.sheets : undefined,
        username: result.local.username ? result.local.username : undefined,
      });
      if (!result.result) {
        setTimeout(() => {
          showModalUser();
        }, 100);
      }
    });
  };

  useEffect(() => {
    checkUserAndSheets();
  }, []);

  // COMPONENT SETTING

  const [isModalSetting, setIsModalSettingOpen] = useState(false);

  const showModalSetting = () => {
    checkUserAndSheets();
    setTimeout(() => {
      setIsModalSettingOpen(true);
    }, 100);
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
          setResetFormOnChange(false);
          setModeSetting(e.target.value);
          setResultString("");
          setPriceAllNow(0);
          resultForm.setFieldValue("result", undefined);
          setIFinalResultPrice(undefined);
          resultForm.setFieldValue("result", undefined);
          setTimeout(() => {
            setResetFormOnChange(true);
          }, 10);
        }}
        defaultValue={"file"}
        radioOption={[
          { value: "file", label: "ไฟล์" },
          { value: "print", label: "ปริ้น" },
          { value: "book", label: "เข้าเล่ม" },
          { value: "mix", label: "ผสม" },
        ]}
      ></RadioCustom>
    );
    if (removeCard) {
      return radio;
    } else {
      return (
        <>
          <CardCustom Header={"ชนิด"}>
            {radio}
            {debug && <div>Mode Selection: {JSON.stringify(modeSetting)}</div>}
          </CardCustom>
        </>
      );
    }
  };

  const SettingDisplyComponent = (
    <CardCustom Header={"หน้าจอ"}>
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
          { value: "image", label: "แสดงรูปภาพ" },
          { value: "grid", label: "แบ่งหน้าจอ" },
        ]}
      ></SwitchCustom>

      {debug && <div>Display Selection: {JSON.stringify(display)}</div>}
    </CardCustom>
  );

  const SettingDeliveryComponent = (
    <CardCustom Header={"ค่าบริการ"}>
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
      <CardCustom Header={"ค้นหา"}>
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
      style={{ ...screenStatusColor, ...BgCal(colorSecondary) }}
      className={`p-2 duration-300 border-solid border-4 sm:border-8`}
    >
      {contextHolder}
      {debug && <div className=" text-2xl font-bold">Version: 1.0.5</div>}

      <div
        className={`fixed w-full  ${
          modeSettingStiky ? "top-0" : "-top-10"
        } duration-300 z-40 pb-2 left-0 `}
      >
        <div className="flex gap-2 p-2 items-center bg-white shadow-md ">
          <div className="text-sm"> </div>
          <div>{SettingModeComponent(true)}</div>
        </div>
      </div>

      <Modal
        destroyOnClose
        title="ตั้งค่า"
        open={isModalSetting}
        onOk={handleOkSetting}
        onCancel={handleCancelSetting}
        footer={<></>}
      >
        <div className="flex flex-col gap-2">
          {_DEV_SettingDebugComponent}
          {SettingDisplyComponent}
          <CardCustom Header={"ความปลอดภัย"}>
            <UserForm
              onCancel={handleCancelUser}
              onFinish={handleOkUser}
              initData={userInitLocal}
              removeCancel
              openOnChangeMode
            ></UserForm>
          </CardCustom>
        </div>
      </Modal>

      <Modal
        title="ความปลอดภัย"
        open={isModalUser}
        // onOk={handleOkUser}
        destroyOnClose
        // onCancel={handleCancelUser}
        footer={<></>}
      >
        <div className="py-3">
          <div>
            - ใส่เพียงครั้งเดียวเท่านั้น เพื่อความปลอดภัยของระบบ
            ป้องกันไม่ให้มีการจัดการ Google Sheets โดยผู้อื่น
          </div>
          <div className="font-bold ">
            - ถ้าข้อมูลผิด สามารถแก้ไขอีกครั้งได้ที่ปุ่ม ตั้งต่า
          </div>
        </div>
        <UserForm
          onCancel={handleCancelUser}
          onFinish={handleOkUser}
          initData={userInitLocal}
        ></UserForm>
      </Modal>

      <FloatButtonForm
        modeSetting={modeSetting}
        onFacebook={checkBeforeGotoFacebook}
        onExcel={ChangeToSeets}
        onSetting={() => showModalSetting()}
        onSave={() => GetReslut()}
        onSentMail={() => {
          checkBeforeSentMail();
        }}
        removeResult={() => {
          setResetFormOnChange(false);
          setResultString("");
          setIFinalResultPrice(undefined);
          resultForm.setFieldValue("result", undefined);
          setingResultForm.resetFields();
          setPriceAllNow(0);
          setTimeout(() => {
            setResetFormOnChange(true);
          }, 10);
        }}
      ></FloatButtonForm>

      {userInitLocal && (
        <Connection
          notificationInstance={api}
          getLocalInput={userInitLocal}
        ></Connection>
      )}

      <div className="relative flex md:gap-3 duration-300 ">
        <div className=" w-full ">
          <div className="flex flex-col gap-2">
            {SettingModeComponent()}
            {SettingDeliveryComponent}
            {SettingSearchComponent}

            <Form form={form}>
              <div className="flex flex-col gap-3 ">
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
                          className={`grid gap-1     ${
                            display.grid ? " lg:grid-cols-2 " : '"'
                          } transition-all`}
                        >
                          {getModel.worksheets?.map((element, JKey) => {
                            let getEleemtnModel = element.getWorksheets();
                            if (getEleemtnModel) {
                              console.log(
                                getEleemtnModel.fileUrlDownload,
                                "CHECK"
                              );
                              return (
                                <div
                                  key={`element-key-${JKey}`}
                                  id={getEleemtnModel.workSheetsId}
                                >
                                  {resetFormOnChange ? (
                                    <CheckBoxCustom
                                      facebook={
                                        getEleemtnModel.fileUrlDownload
                                          ? getEleemtnModel.fileUrlDownload
                                              ?.length > 0
                                          : false
                                      }
                                      gmail={
                                        getEleemtnModel.filename
                                          ? getEleemtnModel.filename?.length > 0
                                          : false
                                      }
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

            <CardCustom Header={"ตั้งค่าผลลัพธ์"} className="w-full">
              <ResultSetting
                cancel={GetReslut}
                onChange={(e) => {
                  GetReslut({
                    name: "ได้รับส่วนลด",
                    priceSum: e,
                  });
                }}
                setPriceAll={priceAllNow}
              ></ResultSetting>
            </CardCustom>
            {customReset && (
              <CardCustom Header={"กำหนดเอง"} className="w-full">
                <CustomResultForm
                  onReset={() => {
                    GetReslut();
                  }}
                  onFinish={(items) => {
                    GetReslut(undefined, items);
                  }}
                  form={setingResultForm}
                  getMockup={getMockup}
                  ModeOnFinish={modeSetting}
                  IFinalResultPrice={IFinalResultPrice}
                ></CustomResultForm>
              </CardCustom>
            )}
            <CardCustom Header={"ผลลัพธ์"}>
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

        <div className=" md:w-16">
          <div
            className={`fixed md:sticky ${
              detectScroll ? "right-0" : "-right-[4.5rem]"
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
