import ResultTextApps from "@/apps/result";
import ResultSettingApps from "@/apps/resultSetting";
import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import CheckBoxCommon from "@/components/common/checkbox";
import LayoutDisplay from "@/components/layout";
import { FloatButton, Form } from "antd";
import type { NextPage } from "next";
import { useState } from "react";

import { ShoppingOutlined, SaveOutlined } from "@ant-design/icons";
import CheckBoxCard from "@/apps/checkBoxCard";

const Home: NextPage = () => {
  const optionsWithDisabled: CheckBoxGroupOptions[] = [
    { label: "ใบงานคณิตสาสตร์ อ.2", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];

  const [imageSrtting, setImageSetting] = useState<SettingOnFinish>({
    image: false,
  });

  const onSettingFinish = (SettingOnFinish: SettingOnFinish) => {
    setImageSetting(SettingOnFinish);
    console.log(SettingOnFinish);
  };

  const result = () => {
    return (
      <>
        <div className="layout-card">
          <div className="layout-card-title">ตั้งค่าผลลัพธ์</div>
          <ResultSettingApps onFinish={onSettingFinish}></ResultSettingApps>
        </div>
        <div className="layout-card">
          <div className="layout-card-title">ผลลัพธ์</div>
          <ResultTextApps></ResultTextApps>
        </div>
      </>
    );
  };

  const [form] = Form.useForm();

  return (
    <>
      <FloatButton.Group shape="circle">
        <FloatButton badge={{ count: 12 }} icon={<ShoppingOutlined />} />
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

        <Form form={form} onFinish={(e) => console.log(e)}>
          <CheckBoxCard
            form={form}
            name="np1"
            label="คณิตศาสตร์"
            imageSrtting={!imageSrtting.image}
            optionsWithDisabled={optionsWithDisabled}
          ></CheckBoxCard>
          <CheckBoxCard
            form={form}
            name="np2"
            label="คณิตศาสตร์"
            imageSrtting={!imageSrtting.image}
            optionsWithDisabled={optionsWithDisabled}
          ></CheckBoxCard>
          <button type="submit">sub</button>
        </Form>

        <div className="block  lg:hidden">{result()}</div>
      </LayoutDisplay>
    </>
  );
};

export default Home;
