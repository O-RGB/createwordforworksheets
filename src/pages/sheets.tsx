import HomeGroup from "@/components/group-page/home";
import CheckBoxCustom from "@/components/common/check-box";
import { WorkSheetsData } from "@/mock/workSheetsData";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form, Radio } from "antd";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import SiteHeader from "@/components/common/head/NextHead";
import { useRouter } from "next/router";
import { SheetsContext } from "@/context/sheetsService";
import SheetsGroup from "@/components/group-page/sheets";

const InterSheets: NextPage = () => {
  const router = useRouter();
  const { param } = router.query;
  const { setSheets, sheets } = useContext(SheetsContext);
  const [getMockup, setMockup] = useState<IInitMainData[] | undefined>(
    undefined
  );
  HeadWorkSheets;
  useEffect(() => {
    WorkSheetsData().then((data) => {
      let optionForSearch: IInitMainData[] = [];
      data.map((work) => {
        work.getHeadWorksheets().worksheets?.map((elem) => {
          let element = elem.getWorksheets();
          if (element) {
            optionForSearch.push({
              id: element.workSheetsId,
              name: element.name,
              price: element.price,
            });
          }
        });
      });
      setMockup(optionForSearch);
    });
  }, []);

  if (!getMockup) {
    return <></>;
  }

  return (
    <>
      <SiteHeader
        title="ระบบสร้างรายการ V2"
        description="ไม่ต้องพิมพ์อีกต่อไป.. สร้างรายการออร์เดอร์และคำนวณราคารวม และยังมีระบบคำนวนส่วนลดให้ด้วย"
      ></SiteHeader>
      <SheetsGroup data={getMockup} sheets={sheets}></SheetsGroup>
    </>
  );
};

export default InterSheets;
