import ResultTextApps from "@/apps/result";
import ResultSettingApps from "@/apps/resultSetting";
import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import CheckBoxCommon from "@/components/common/checkbox";
import LayoutDisplay from "@/components/layout";
import { FloatButton, Form } from "antd";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { ShoppingOutlined, SaveOutlined } from "@ant-design/icons";
import CheckBoxCard from "@/apps/checkBoxCard";
import { GetResult } from "@/lib/getResult";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { WorksheetsModel } from "@/model/worksheets";
import { HeadWorkSheets } from "@/model/headworksheets";
import { WorkSheetsToOption } from "@/lib/worksheetsToOption";

const Home: NextPage = () => {
  const [imageSrtting, setImageSetting] = useState<SettingOnFinish>({
    image: false,
  });
  const [resultText, setResultText] = useState<string>("");
  const [shopCount, setShopCount] = useState<number>(0);
  const [data, loadData] = useState<HeadWorkSheets[] | undefined>(undefined);

  const onSettingFinish = (SettingOnFinish: SettingOnFinish) => {
    setImageSetting(SettingOnFinish);
    console.log(SettingOnFinish);
  };

  const onFinishCheckBox = (x: any) => {
    GetResult(x).then((data) => {
      setResultText(JSON.stringify(data));
    });
  };

  const onFieldsChange = () => {
    setTimeout(() => {
      let fieldData = form.getFieldsValue();
      GetResult(fieldData).then((data) => {
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
    let worksheets = WorkSheetsData();
    loadData(worksheets);
  }, []);

  const result = () => {
    return (
      <>
        <div className="layout-card">
          <div className="layout-card-title">ตั้งค่าผลลัพธ์</div>
          <ResultSettingApps onFinish={onSettingFinish}></ResultSettingApps>
        </div>
        <div className="layout-card">
          <div className="layout-card-title">ผลลัพธ์</div>
          <ResultTextApps value={resultText}></ResultTextApps>
        </div>
      </>
    );
  };

  const [form] = Form.useForm();

  return (
    <>
      <FloatButton.Group shape="circle">
        <FloatButton badge={{ count: shopCount }} icon={<ShoppingOutlined />} />
        <FloatButton icon={<SaveOutlined />} />
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
          <button type="submit">sub</button>
        </Form>

        <div className="block  lg:hidden">{result()}</div>
      </LayoutDisplay>
    </>
  );
};

export default Home;
