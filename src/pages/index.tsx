import ResultTextApps from "@/apps/result";
import ResultSettingApps from "@/apps/resultSetting";
import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import CheckBoxCommon from "@/components/common/checkbox";
import LayoutDisplay from "@/components/layout";
import { FloatButton, Form, Modal } from "antd";
import type { NextPage } from "next";
import { createRef, useContext, useEffect, useRef, useState } from "react";

import { ShoppingOutlined, SaveOutlined } from "@ant-design/icons";
import CheckBoxCard from "@/apps/checkBoxCard";
import { GetResult } from "@/lib/getResult";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { WorksheetsModel } from "@/model/worksheets";
import { HeadWorkSheets } from "@/model/headworksheets";
import { WorkSheetsToOption } from "@/lib/worksheetsToOption";
import { DeliveryFeeContext } from "@/context/deliveryFee";
import { BookServiceContext } from "@/context/bookService";
import { CheckRelatrionship } from "@/lib/relatrionship";
import { CreateGoodName } from "@/lib/createGoodname";

const Home: NextPage = () => {
  const [imageSrtting, setImageSetting] = useState<SettingOnFinish>({
    image: false,
    delivery_fee: 0,
    book_price: 0,
  });
  const [resultText, setResultText] = useState<string>("");
  const [shopCount, setShopCount] = useState<number>(0);
  const [data, loadData] = useState<HeadWorkSheets[] | undefined>(undefined);
  const { deliveryFee, setDeliveryFee } = useContext(DeliveryFeeContext);
  const { bookPrice, setBookPrice } = useContext(BookServiceContext);

  const refResult: any = useRef(null);

  const onSettingFinish = (SettingOnFinish: SettingOnFinish) => {
    setImageSetting(SettingOnFinish);
    setDeliveryFee(Number(SettingOnFinish.delivery_fee));
    loadData(undefined);
    setResultText("");
    setTimeout(() => {
      let worksheets = WorkSheetsData(Number(SettingOnFinish.book_price));
      loadData(worksheets);
    }, 1);
  };

  const onFinishCheckBox = (x: any) => {
    GetResult(x, bookPrice).then((data) => {
      let s = CheckRelatrionship(data);
      let text = CreateGoodName(s);
      console.log(text);
      setResultText(text);
    });
  };

  const onFieldsChange = () => {
    setTimeout(() => {
      let fieldData = form.getFieldsValue();
      GetResult(fieldData, bookPrice).then((data) => {
        let cout = 0;
        data.map((x) => {
          cout += x.length;
        });
        setShopCount(cout);
      });
      setShopCount;
    }, 200);
  };

  useEffect(() => {
    let worksheets = WorkSheetsData(bookPrice);
    loadData(worksheets);
  }, [bookPrice]);

  const result = () => {
    return (
      <>
        <div className="layout-card">
          <div className="layout-card-title">ตั้งค่าผลลัพธ์</div>
          <ResultSettingApps onFinish={onSettingFinish}></ResultSettingApps>
        </div>
        <div ref={refResult} className="layout-card">
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
        <FloatButton
          icon={<SaveOutlined />}
          onClick={() => {
            form.submit();
            refResult.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }}
        />
      </FloatButton.Group>
      <LayoutDisplay tabChildren={result()}>
        <div className="layout-card">
          <div className="layout-card-title">ตั้งค่า</div>
          <SettingApps onFinish={onSettingFinish}></SettingApps>
        </div>
        <div className="layout-card sticky -top-11 z-10 shadow-md ">
          <div className="layout-card-title">ค้นหา</div>
          <SearchApps></SearchApps>
        </div>

        <Form
          form={form}
          onFinish={onFinishCheckBox}
          onFieldsChange={onFieldsChange}
        >
          {data?.map((header) => {
            let headerArray = header.getHeadWorksheets();
            if (headerArray.worksheets) {
              return (
                <>
                  {
                    <CheckBoxCard
                      relationship={headerArray.relationship}
                      form={form}
                      name={headerArray.formName}
                      label={headerArray.headerTitle}
                      imageSrtting={!imageSrtting.image}
                      WorksheetsModel={headerArray.worksheets}
                    ></CheckBoxCard>
                  }
                </>
              );
            }
          })}
        </Form>

        <div className="block  lg:hidden">{result()}</div>
      </LayoutDisplay>
    </>
  );
};

export default Home;
