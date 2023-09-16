import HomeGroup from "@/components/group-page/home";
import CheckBoxCustom from "@/components/common/check-box";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form, Radio } from "antd";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import SiteHeader from "@/components/common/head/NextHead";
import Router, { useRouter } from "next/router";
import { SheetsContext } from "@/context/sheetsService";
import SheetsGroup from "@/components/group-page/sheets";
import { getLocal } from "@/lib/local";
import { SheetsLoadedContext } from "@/context/sheetsLoaded";

const InterSheets: NextPage = () => {
  const router = useRouter();
  const { param } = router.query;
  const { setSheets, sheets } = useContext(SheetsContext);
  const [getLocalInput, setLocalInput] = useState<IUserInput>();
  const [getMockup, setMockup] = useState<IInitMainData[] | undefined>(
    undefined
  );
  const { sheetsLoaded } = useContext(SheetsLoadedContext);

  HeadWorkSheets;
  useEffect(() => {
    if (sheets.length == 0) {
      Router.push("/");
    }

    let username = getLocal("username");
    let sheetes = getLocal("googlesheets");
    if (sheetes && username) {
      setLocalInput({
        googlesheets: sheetes,
        username: username,
      });
    }

    // WorkSheetsData().then((data) => {
    let optionForSearch: IInitMainData[] = [];
    sheetsLoaded?.map((work) => {
      work.getHeadWorksheets().worksheets?.map((elem) => {
        let element = elem.getWorksheets();
        if (element) {
          optionForSearch.push({
            id: element.workSheetsId,
            name: element.name,
            price: element.price,
            paper: String(element.paper),
          });
        }
      });
      // });
      setMockup(optionForSearch);
    });
  }, []);

  if (!getMockup || !getLocalInput) {
    return <></>;
  }

  return (
    <>
      <SiteHeader
        title="ระบบสร้างรายการ V2"
        description="ไม่ต้องพิมพ์อีกต่อไป.. สร้างรายการออร์เดอร์และคำนวณราคารวม และยังมีระบบคำนวนส่วนลดให้ด้วย"
      ></SiteHeader>
      <SheetsGroup
        data={getMockup}
        sheets={sheets}
        getLocalInput={getLocalInput}
      ></SheetsGroup>
    </>
  );
};

export default InterSheets;
