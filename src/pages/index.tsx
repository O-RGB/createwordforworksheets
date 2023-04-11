import SettingApps from "@/apps/setting";
import SearchApps from "@/apps/srarch";
import AutoCompleteCommon from "@/components/common/autoComplete";
import CheckBoxCommon from "@/components/common/checkbox";
import LayoutDisplay from "@/components/layout";
import { AutoComplete, Form, Switch } from "antd";
import type { NextPage } from "next";
import { Head } from "next/document";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  return (
    <>
      <LayoutDisplay>
        <div className="layout-card">
          <div className="layout-card-title">ตั้งค่า</div>
          <SettingApps onFinish={onSettingFinish}></SettingApps>
        </div>
        <div className="layout-card">
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
      </LayoutDisplay>
    </>
  );
};

export default Home;
