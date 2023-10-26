import { Form, Modal, Radio } from "antd";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import SiteHeader from "@/components/common/head/NextHead";
import FacebookPageGroup from "@/components/group-page/facebook";
import { FBTokenContext } from "@/context/facebookToken";
import { getFbToken, setFbToken } from "@/lib/checkGoogleSheetsUrl";
import FacebookTokenForm from "@/components/form/facebook-token-form";
import { SheetsContext } from "@/context/sheetsService";
import Router, { useRouter } from "next/router";
import { SheetsLoadedContext } from "@/context/sheetsLoaded";

const FacebookPage: NextPage = () => {
  const router = useRouter();
  const [getLocalInput, setLocalInput] = useState<
    IFacebookTokenInput | undefined
  >(undefined);
  const { setSheets, sheets } = useContext(SheetsContext);
  const { FbToken, setFbTokenContext } = useContext(FBTokenContext);
  const [isModalUser, setIsModalUserOpen] = useState(false);
  const [getMockup, setMockup] = useState<WorksheetsModelInput[] | undefined>(
    undefined
  );

  const { sheetsLoaded } = useContext(SheetsLoadedContext);

  useEffect(() => {
    if (sheets.length == 0) {
      Router.push("/");
    }

    let fbToken = getFbToken();
    console.log(sheets);
    if (fbToken.fbToken) {
      setFbTokenContext(fbToken.fbToken ?? undefined);
      setLocalInput({
        facebookToken: fbToken.fbToken ?? undefined,
      });
    } else {
      setIsModalUserOpen(true);
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

  const handleOkUser = (output: IFacebookTokenInput) => {
    setFbTokenContext(output.facebookToken);
    setFbToken({ facebookToken: output.facebookToken });
    setIsModalUserOpen(false);
  };

  return (
    <>
      <SiteHeader
        title="ระบบสร้างรายการ V2"
        description="ไม่ต้องพิมพ์อีกต่อไป.. สร้างรายการออร์เดอร์และคำนวณราคารวม และยังมีระบบคำนวนส่วนลดให้ด้วย"
      ></SiteHeader>
      <Modal
        title="ความปลอดภัย"
        open={isModalUser}
        destroyOnClose
        closable={false}
        footer={<></>}
      >
        <div className="py-3">
          <div>
            - ใส่เพียงครั้งเดียวเท่านั้น เพื่อความปลอดภัยของระบบ
            ป้องกันไม่ให้มีการจัดการ Facebook Page โดยผู้อื่น
          </div>
          <div className="font-bold ">
            - ถ้าข้อมูลผิด สามารถแก้ไขอีกครั้งได้ที่ปุ่ม ตั้งค่า
          </div>
        </div>
        <FacebookTokenForm
          removeCancel
          onFinish={handleOkUser}
          initData={getLocalInput}
        ></FacebookTokenForm>
      </Modal>
      <FacebookPageGroup
        getMockup={getMockup}
        getLocalInput={getLocalInput}
      ></FacebookPageGroup>
    </>
  );
};

export default FacebookPage;
