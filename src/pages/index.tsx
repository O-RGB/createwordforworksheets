import ResultTextApps from "@/apps/result";
import ResultSettingApps from "@/apps/resultSetting";
import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import LayoutDisplay from "@/components/layout";
import { ConfigProvider, FloatButton, Form, Modal, message } from "antd";
import type { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { ShoppingOutlined, SaveOutlined } from "@ant-design/icons";
import CheckBoxCard from "@/apps/checkBoxCard";
import { GetResult } from "@/lib/getResult";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { HeadWorkSheets } from "@/model/headworksheets";
import { DeliveryFeeContext } from "@/context/deliveryFee";
import { BookServiceContext } from "@/context/bookService";
import { CheckRelatrionship } from "@/lib/relatrionship";
import { CreateGoodName } from "@/lib/createGood/createGoodname";
import React from "react";
import { SplitFileOutObj } from "@/lib/splitFileOutObj";
import { CreateGoodNameMixMode } from "@/lib/createGood/createGoodnameMix";
import InputSettingApps from "@/apps/setting/input-index";
import CheckBoxClone from "@/components/common/checkbox-clone";

const Home: NextPage = () => {
  const [resultText, setResultText] = useState<string>("");
  const [shopCount, setShopCount] = useState<number>(0);
  const [data, loadData] = useState<HeadWorkSheets[] | undefined>(undefined);
  const { deliveryFee, setDeliveryFee } = useContext(DeliveryFeeContext);
  const { bookPrice, setBookPrice } = useContext(BookServiceContext);
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

  const onResultFinish = (ResultOnFinish: ResultSettingOnFinish) => {
    if (saveResultAnyName) {
      onFinishCheckBox(saveResultAnyName, ResultOnFinish);
      setResultOnFinish(ResultOnFinish);
    }
  };
  const onSettingFinish = (SettingOnFinish: SettingOnFinish) => {
    setImageSetting(SettingOnFinish);
    loadData(undefined);
    setResultText("");
    setResultAnyName(undefined);
  };
  const onInputSettingFinish = (SettingOnFinish: InputSettingOnFinish) => {
    setDeliveryFee(Number(SettingOnFinish.delivery_fee));
    loadData(undefined);
    setResultText("");
    setResultAnyName(undefined);
    setTimeout(() => {
      let worksheets = WorkSheetsData(Number(SettingOnFinish.book_price));
      loadData(worksheets);
    }, 1);
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
    GetResult(resultAnyName, bookPrice).then((data) => {
      // console.log(data);
      let checkRealt = CheckRelatrionship(data);
      let mainfile = SplitFileOutObj(checkRealt);
      let mainbookOrPrint = SplitFileOutObj(checkRealt, false);
      console.log(mainfile, "MainFile");
      console.log(mainbookOrPrint, "MainBookOrPrint");
      let result: string = ``;
      let file = CreateGoodName(
        mainfile,
        "File",
        {
          book_price: bookPrice,
          delivery_fee: deliveryFee,
        },
        "🔥🔥รายการ 💾 (ไฟล์) 🔥🔥\n",
        Resultsetting
      );

      let print = CreateGoodName(
        mainbookOrPrint,
        "Print",
        {
          book_price: bookPrice,
          delivery_fee: deliveryFee,
        },
        "🔥🔥รายการ 📘📕 (ชิ้นงาน) 🔥🔥\n",
        Resultsetting
      );
      if (mainfile.length > 0) {
        result += file.good + "\n";
      }
      if (mainbookOrPrint.length > 0) {
        result += print.good + "\n";
      }
      result += "🔴 ราคารวมทั้งหมด";
      result += `\n🔴 ${file.price + print.price} บาท`;
      setResultText(result);

      if (!imageSrtting.mixData) {
      } else {
        //   let perparDataForMixMode = CreateGoodNameMixMode(data);
        //   let mixdata_File = CheckRelatrionship(perparDataForMixMode.File ?? []);
        //   let mixdata_Print = CheckRelatrionship(
        //     perparDataForMixMode.Print ?? []
        //   );
        //   let result: string = ``;
        //   let file = CreateGoodName(
        //     mixdata_File,
        //     "File",
        //     {
        //       book_price: bookPrice,
        //       delivery_fee: deliveryFee,
        //     },
        //     "🔥🔥รายการ 💾 (ไฟล์) 🔥🔥\n",
        //     Resultsetting
        //   );
        //   let print = CreateGoodName(
        //     mixdata_Print,
        //     "Print",
        //     {
        //       book_price: bookPrice,
        //       delivery_fee: deliveryFee,
        //     },
        //     "🔥🔥รายการ 📘📕 (ชิ้นงาน) 🔥🔥\n",
        //     Resultsetting
        //   );
        //   if (mixdata_File.length > 0) {
        //     result += file.good + "\n";
        //   }
        //   if (mixdata_Print.length > 0) {
        //     result += print.good + "\n";
        //   }
        //   result += "🔴 ราคารวมทั้งหมด";
        //   result += `\n🔴 ${file.price + print.price} บาท`;
        //   setResultText(result);
      }
    });
  };

  const onFieldsChange = () => {
    // setTimeout(() => {
    //   let fieldData = form.getFieldsValue();
    //   // GetResult(fieldData, bookPrice).then((data) => {
    //   //   let cout = 0;
    //   //   data.map((x) => {
    //   //     cout += x.length;
    //   //   });
    //   //   setShopCount(cout);
    //   // });
    //   setShopCount;
    // }, 200);
  };

  useEffect(() => {
    let worksheets = WorkSheetsData(bookPrice);
    loadData(worksheets);
  }, [bookPrice, imageSrtting]);

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
        <div className="layout-card sticky -top-11 z-10 shadow-md ">
          <div className="layout-card-title">ค้นหา</div>
          <SearchApps></SearchApps>
        </div>

        <Form
          form={form}
          onFinish={onFinishCheckBox}
          // onFieldsChange={onFieldsChange}
          // onFinish={(e) => {
          //   console.log(e);

          //   Object.keys(e).forEach((key) => {
          //     let value = e[key];
          //     if (value) {

          //     }
          //   });

          // }}
        >
          {data?.map((header, i) => {
            let headerArray = header.getHeadWorksheets();
            if (headerArray.worksheets) {
              return (
                <React.Fragment key={`${headerArray.formName}-key-i-${i}`}>
                  {
                    <>
                      {/* <CheckBoxCard
                          relationship={headerArray.relationship}
                          form={form}
                          name={headerArray.formName}
                          label={headerArray.headerTitle}
                          imageSrtting={!imageSrtting.image}
                          mixMode={!imageSrtting.mixData}
                          WorksheetsModel={headerArray.worksheets}
                        ></CheckBoxCard> */}
                      <CheckBoxClone
                        form={form}
                        WorksheetsModel={headerArray.worksheets}
                      ></CheckBoxClone>
                    </>
                  }
                </React.Fragment>
              );
            }
          })}
          <div
            onClick={() => {
              form.submit();
            }}
          >
            test
          </div>
        </Form>

        <div className="block  lg:hidden">{result()}</div>
      </LayoutDisplay>
    </>
  );
};

export default Home;
