import ResultTextApps from "@/apps/result";
import ResultSettingApps from "@/apps/resultSetting";
import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import LayoutDisplay from "@/components/layout";
import { ConfigProvider, FloatButton, Form, Modal, message } from "antd";
import type { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { ShoppingOutlined, SaveOutlined } from "@ant-design/icons";
import { GetResult } from "@/lib/getResult";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { HeadWorkSheets } from "@/model/headworksheets";
import { DeliveryFeeContext } from "@/context/deliveryFee";
import { BookServiceContext } from "@/context/bookService";
import { CheckRelatrionship } from "@/lib/relatrionship";
import { CreateGoodName } from "@/lib/createGood/createGoodname";
import React from "react";
import { SplitFileOutObj } from "@/lib/splitFileOutObj";
import InputSettingApps from "@/apps/setting/input-index";
import CheckBoxClone from "@/components/common/checkbox-clone";
import ModeSetting from "@/apps/modeSetting";

const Home: NextPage = () => {
  const [fieldsValue, setFieldsValue] = useState<any>(undefined);

  const [resultText, setResultText] = useState<string>("");
  const [shopCount, setShopCount] = useState<number>(0);
  const [data, loadData] = useState<HeadWorkSheets[] | undefined>(undefined);

  // const [deliveryFee, setDeliveryFee] = useState<number>(40);
  // const [bookPrice, setBookPrice] = useState<number>(40);

  const [fee, setFee] = useState<InputSettingOnFinish>({
    book_price: 40,
    delivery_fee: 40,
  });
  // const { deliveryFee, setDeliveryFee } = useContext(DeliveryFeeContext);
  // const { bookPrice, setBookPrice } = useContext(BookServiceContext);
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
        position: "absolute",
        bottom: 0,
      },
      type: "success",
      content: "ก็อปปี้ขึ้นคลิปบอร์ดแล้ว",
    });
  };

  const refResult: any = useRef(null);

  const _resetForm = () => {
    // let data = form.getFieldsValue();
    // setFieldsValue(data);
    form.resetFields();

    // form.setFieldsValue(data);
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
    setImageSetting(SettingOnFinish);
    setResultText("");
    setResultAnyName(undefined);
    _resetForm();
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
    _resetForm();
  };

  const onFinishCheckBox = (
    resultAnyName: any,
    ResultOnFinish?: ResultSettingOnFinish
  ) => {
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
    setResultAnyName(resultAnyName);
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
      result += `\n🔴 ${pay} บาท`;
      setResultText(result);
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
              form.submit();
              success();
              setTimeout(() => {
                refResult.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 100);
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
              // console.log(form.getFieldsValue());
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

        <div className="block  lg:hidden">{result()}</div>
      </LayoutDisplay>
    </>
  );
};

export default Home;
