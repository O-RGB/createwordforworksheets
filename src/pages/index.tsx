import ResultTextApps from "@/apps/result";
import ResultSettingApps from "@/apps/resultSetting";
import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import AutoCompleteCommon from "@/components/common/autoComplete";
import CheckBoxCommon from "@/components/common/checkbox";
import LayoutDisplay from "@/components/layout";
import { AutoComplete, FloatButton, Form, Switch } from "antd";
import type { NextPage } from "next";
import { Head } from "next/document";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { QuestionCircleOutlined } from "@ant-design/icons";

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

  return (
    <>
      <FloatButton.Group shape="circle">
        <FloatButton badge={{ count: 12 }} icon={<QuestionCircleOutlined />} />
        <FloatButton badge={{ count: 123, overflowCount: 999 }} />
        <FloatButton.BackTop visibilityHeight={0} />
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
        <div className="layout-card">
          <div className="layout-card-title">คณิตศาสตร์</div>
          <Form layout="vertical">
            <CheckBoxCommon
              CheckBoxGroupOptions={optionsWithDisabled}
              imageMode={!imageSrtting.image}
            ></CheckBoxCommon>
          </Form>
        </div>
        <div className="layout-card">
          <Form layout="vertical">
            <CheckBoxCommon
              CheckBoxGroupOptions={optionsWithDisabled}
              imageMode={!imageSrtting.image}
              label="eigjow"
            ></CheckBoxCommon>
          </Form>
        </div>
        <div className="layout-card">
          <div className="layout-card-title">คณิตศาสตร์</div>
          <Form layout="vertical">
            <CheckBoxCommon
              CheckBoxGroupOptions={optionsWithDisabled}
              imageMode={!imageSrtting.image}
            ></CheckBoxCommon>
          </Form>
        </div>
        <div className="layout-card">
          <div className="layout-card-title">คณิตศาสตร์</div>
          <Form layout="vertical">
            <CheckBoxCommon
              CheckBoxGroupOptions={optionsWithDisabled}
              imageMode={!imageSrtting.image}
            ></CheckBoxCommon>
          </Form>
        </div>
        <div className="block  lg:hidden">{result()}</div>
      </LayoutDisplay>
    </>
  );
};

export default Home;
