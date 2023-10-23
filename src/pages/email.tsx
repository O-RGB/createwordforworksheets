import { getFile } from "@/api/fetcher/getFile";
import SiteHeader from "@/components/common/head/NextHead";
import SentEmailGroup from "@/components/group-page/email";
import { SheetsLoadedContext } from "@/context/sheetsLoaded";
import { SheetsContext } from "@/context/sheetsService";
import { getLocal } from "@/lib/local";
import { WorksheetsModel } from "@/model/worksheets";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Email: NextPage = () => {
  const router = useRouter();
  const { param } = router.query;
  const { setSheets, sheets } = useContext(SheetsContext);
  const [getLocalInput, setLocalInput] = useState<IUserInput>();
  const [getMockup, setMockup] = useState<WorksheetsModelInput[] | undefined>(
    undefined
  );
  const { sheetsLoaded } = useContext(SheetsLoadedContext);

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

    let mainWork: WorksheetsModelInput[] = [];
    sheets.map((list) => {
      list.map((id) => {
        sheetsLoaded?.map((work) => {
          work.getHeadWorksheets().worksheets?.map((elem) => {
            let element = elem.getWorksheets();
            if (element?.workSheetsId == id.id) {
              mainWork.push(element);
            }
          });
        });
      });
    });

    setMockup(mainWork);
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
      <SentEmailGroup
        getMockup={getMockup}
        sheets={sheets}
        getLocalInput={getLocalInput}
      ></SentEmailGroup>
    </>
  );
};

export default Email;
