import ResultTextApps from "@/apps/result";
import ResultSettingApps from "@/apps/resultSetting";
import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import LayoutDisplay from "@/components/layout";
import { ConfigProvider, FloatButton, Form, Modal, message } from "antd";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { ShoppingOutlined, SaveOutlined } from "@ant-design/icons";
import { GetResult } from "@/lib/getResult";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { HeadWorkSheets } from "@/model/headworksheets";
import { CheckRelatrionship } from "@/lib/relatrionship";
import { CreateGoodName } from "@/lib/createGood/createGoodname";
import React from "react";
import { SplitFileOutObj } from "@/lib/splitFileOutObj";
import InputSettingApps from "@/apps/setting/input-index";
import CheckBoxClone from "@/components/common/checkbox-clone";
import ModeSetting from "@/apps/modeSetting";
import { GetResultFromForm } from "@/lib/getResultFromForm/getResultFormForm";

const Home: NextPage = () => {
  const [fieldsValue, setFieldsValue] = useState<
    Record<string, FormResult> | undefined
  >(undefined);

  const [resultText, setResultText] = useState<string>("");
  const [shopCount, setShopCount] = useState<number>(0);
  const [data, loadData] = useState<HeadWorkSheets[] | undefined>(undefined);

  const [fee, setFee] = useState<InputSettingOnFinish>({
    book_price: 20,
    delivery_fee: 30,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [imageSrtting, setImageSetting] = useState<SettingOnFinish>({
    image: false,
    mixData: false,
  });

  const [saveResultAnyName, setResultAnyName] = useState<any | undefined>(
    undefined
  );

  const [resultOnFinish, setResultOnFinish] = useState<ResultSettingOnFinish>({
    delivery: true,
    price: true,
    price_all: true,
    type: true,
  });

  const [modeOnFinish, setModeOnFinish] = useState<ResultModeOnFinish>({
    mode: 1,
  });

  const success = () => {
    messageApi.open({
      style: {
        zIndex: 999,
      },
      type: "success",
      content: "ก็อปปี้ขึ้นคลิปบอร์ดแล้ว",
    });
  };

  const refResult: any = useRef(null);

  const _resetForm = (restoreData: boolean = false) => {
    // let data = form.getFieldsValue();
    // setFieldsValue(data);
    form.resetFields();
    // if (restoreData) {
    //   setTimeout(() => {
    //     form.setFieldsValue(data);
    //   }, 1000);
    // }
  };

  const testReset = () => {
    // let fors = {};
    // let temp = imageSrtting;
    // if (fieldsValue) {
    //   Object.entries(fieldsValue).forEach(([key, value]) => {
    //     console.log(value.value,'on finde save');
    //     console.log(form.getFieldsValue(),'get field on field save');
    //     // if (value.value) {
    //     //   temp.mixData = true;
    //     //   setImageSetting(temp);
    //     // }
    //     // form.setFieldValue(`${key}`, value.select);
    //     // form.setFieldValue(`${key}-real`, value.WorksheetsModelInput);
    //     // form.setFieldValue(`${key}-value`, value.value);
    //   });
    // }

    setResultAnyName(form.getFieldsValue());
  };

  const getReusltForm = () => {
    let test = GetResultFromForm(form);
    console.log(test);
    setFieldsValue(test);
  };

  const onResultFinish = (ResultOnFinish: ResultSettingOnFinish) => {
    if (saveResultAnyName) {
      onFinishCheckBox(saveResultAnyName, ResultOnFinish);
      setResultOnFinish(ResultOnFinish);
    }
  };

  const onModeSettingFinish = (mode: ResultModeOnFinish) => {
    setModeOnFinish(mode);
    let image = imageSrtting;
    if (mode.mode == 4) {
      image.mixData = true;
    } else {
      image.mixData = false;
    }
    setImageSetting(image);
    _resetForm();
  };

  const onSettingFinish = (SettingOnFinish: SettingOnFinish) => {
    let mixMode = imageSrtting;
    SettingOnFinish.mixData = mixMode.mixData;
    setImageSetting(SettingOnFinish);
    setResultText("");
    setResultAnyName(undefined);
    _resetForm(true);
  };
  const onInputSettingFinish = (SettingOnFinish: InputSettingOnFinish) => {
    // setDeliveryFee(Number(SettingOnFinish.delivery_fee));
    // setBookPrice(Number(SettingOnFinish.book_price));
    setFee({
      book_price: Number(SettingOnFinish.book_price),
      delivery_fee: Number(SettingOnFinish.delivery_fee),
    });
    setResultText("");
    setResultAnyName(undefined);
    _resetForm(true);
  };

  const onFinishCheckBox = (
    resultAnyName: any,
    ResultOnFinish?: ResultSettingOnFinish
  ) => {
    console.log(resultAnyName);
    let Resultsetting: ResultSettingOnFinish = {
      delivery: true,
      price: true,
      price_all: true,
      type: true,
    };
    if (!ResultOnFinish) {
      Resultsetting = resultOnFinish;
    } else {
      Resultsetting = ResultOnFinish;
    }
    // setResultAnyName(resultAnyName);
    GetResult(resultAnyName).then((data) => {
      let checkRealt = CheckRelatrionship(data);
      let mainfile = SplitFileOutObj(checkRealt);
      let mainbookOrPrint = SplitFileOutObj(checkRealt, false);

      let pay: number = 0;
      let result: string = ``;
      if (mainfile.length > 0) {
        let checkLength = mainfile.some((x) => x.realData.value.length > 0);
        if (checkLength) {
          let file = CreateGoodName(
            mainfile,
            "File",
            {
              book_price: fee.book_price,
              delivery_fee: fee.delivery_fee,
            },
            "🔥🔥รายการ 💾 (ไฟล์) 🔥🔥\n",
            Resultsetting
          );
          result += file.good + "\n";
          pay += file.price;
        }
      }
      if (mainbookOrPrint.length > 0) {
        let checkLength = mainbookOrPrint.some(
          (x) => x.realData.value.length > 0
        );
        if (checkLength) {
          let print = CreateGoodName(
            mainbookOrPrint,
            "Print",
            {
              book_price: fee.book_price,
              delivery_fee: fee.delivery_fee,
            },
            "🔥🔥รายการ 📘📕 (ชิ้นงาน) 🔥🔥\n",
            Resultsetting
          );
          result += print.good + "\n";
          pay += print.price;
        }
      }

      result += "🔴 ราคารวมทั้งหมด";
      result += `\n🔴 ${pay.toLocaleString()} บาท`;
      setResultText(result);
      if (!saveResultAnyName) {
        setResultAnyName(form.getFieldsValue());
      }
      // testReset()
    });
  };

  useEffect(() => {
    if (!data) {
      let worksheets = WorkSheetsData();
      loadData(worksheets);
    }
  }, []);

  const result = () => {
    return (
      <>
        {/* <div onClick={() => testReset()}>test</div> */}
        <div ref={refResult} className="layout-card">
          <div className="layout-card-title">ตั้งค่าผลลัพธ์</div>
          <ResultSettingApps
            disabled={saveResultAnyName ? false : true}
            onFinish={onResultFinish}
          ></ResultSettingApps>
        </div>
        <div className="layout-card">
          <div className="layout-card-title">ผลลัพธ์</div>
          <ResultTextApps value={resultText}></ResultTextApps>
        </div>
      </>
    );
  };

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="รายการ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        ยังไม่พร้อมให้ใช้งาน
      </Modal>
      <FloatButton.Group shape="circle">
        <FloatButton
          onClick={() => {
            showModal();
          }}
          badge={{ count: shopCount }}
          icon={<ShoppingOutlined />}
        />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
            },
          }}
        >
          <FloatButton
            type={shopCount > 0 ? "primary" : undefined}
            icon={<SaveOutlined />}
            onClick={() => {
              form
                .validateFields()
                .then((data) => {
                  form.submit();
                  success();
                  setTimeout(() => {
                    refResult.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }, 100);
                })
                .catch((error: any) => {
                  if (error.errorFields.length > 0) {
                    let keyname: string = error.errorFields[0].name[0];
                    let keynameList = keyname.split("-");
                    setTimeout(() => {
                      let element = document.getElementById(keynameList[0]);
                      if (element) {
                        element.classList.add("bg-red-100");
                        element.classList.add("rounded-md");
                        setTimeout(() => {
                          if (element) {
                            element.classList.remove("bg-red-100");
                            element.classList.remove("rounded-md");
                          }
                        }, 2000);
                        window.scrollTo({
                          top: element.offsetTop - 300,
                          behavior: "smooth",
                        });
                      }
                    }, 100);
                  }
                });
            }}
          />
        </ConfigProvider>
      </FloatButton.Group>
      <LayoutDisplay tabChildren={result()}>
        <div className="layout-card">
          <div className="layout-card-title">ตั้งค่า</div>
          <SettingApps onFinish={onSettingFinish}></SettingApps>
        </div>
        <div className="layout-card">
          <div className="layout-card-title">ค่าธรรมเนียม</div>
          <InputSettingApps onFinish={onInputSettingFinish}></InputSettingApps>
        </div>
        <div className="layout-card">
          <div className="layout-card-title">ชนิดสินค้า</div>
          <ModeSetting onFinish={onModeSettingFinish}></ModeSetting>
        </div>
        <div className="layout-card sticky -top-11 z-30 shadow-md ">
          <div className="layout-card-title">ค้นหา</div>
          <SearchApps data={data}></SearchApps>
        </div>

        {data && (
          <Form
            form={form}
            onFinish={onFinishCheckBox}
            onFieldsChange={(e) => {
              getReusltForm();
            }}
          >
            {data.map((header, i) => {
              let headerArray = header.getHeadWorksheets();
              if (headerArray.worksheets) {
                return (
                  <React.Fragment key={`${headerArray.formName}-key-i-${i}`}>
                    {
                      <div className="layout-card">
                        <div className="layout-card-title">
                          {headerArray.headerTitle}
                        </div>
                        <CheckBoxClone
                          getReusltForm={getReusltForm}
                          modeOnFinish={modeOnFinish}
                          setting={imageSrtting}
                          form={form}
                          WorksheetsModel={headerArray.worksheets}
                        ></CheckBoxClone>
                      </div>
                    }
                  </React.Fragment>
                );
              }
            })}
          </Form>
        )}

        {/* <div>{JSON.stringify(saveResultAnyName)}</div>
        <br /><br /><br /><br />
        <div>{JSON.stringify(form.getFieldsValue())}</div> */}

        {/* <div
          onClick={() => {
            console.log(form.getFieldsValue());
          }}
        >
          print form value
        </div>

        <div
          onClick={() => {
            form.resetFields();
            form.setFieldsValue(saveResultAnyName);
          }}
        >
          test retrue old data
        </div> */}

        <div className="block lg:hidden">{result()}</div>
      </LayoutDisplay>
    </>
  );
};

export default Home;
