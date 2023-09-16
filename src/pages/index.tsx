import HomeGroup from "@/components/group-page/home";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Modal } from "antd";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import SiteHeader from "@/components/common/head/NextHead";
import { getLocal } from "@/lib/local";
import { getGoogleSheetsItems } from "@/api/fetcher/getGoogleSheetsItem";
import { MapDataToMinModel } from "@/function/getGoogleSheetsItems/mapDataToMinModel";
import {
  CheckUsernameAndURLIsRuning,
  setUsernameOrURL,
} from "@/lib/checkGoogleSheetsUrl";
import UserForm from "@/components/form/user-from";
import ErrorComponent from "@/components/common/loading/error/error";
import LoadingComponent from "@/components/common/loading/loading/loading";
import { SheetsLoadedContext } from "@/context/sheetsLoaded";
const InterFaceTest: NextPage = () => {
  const [getMockup, setMockup] = useState<HeadWorkSheets[]>([]);
  const [optionMockup, setOptionMockup] = useState<Option[]>([]);
  const [keyMockup, setKeyMockup] = useState<string[]>([]);

  const { sheetsLoaded, setSheetsLoaded } = useContext(SheetsLoadedContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const InitData = (DataForInit: HeadWorkSheets[]) => {
    let optionForSearch: Option[] = [];
    let ketMockup: string[] = [];
    DataForInit.map((work) => {
      work.getHeadWorksheets().worksheets?.map((elem) => {
        let element = elem.getWorksheets();
        if (element) {
          ketMockup.push(element.workSheetsId);
          optionForSearch.push({
            label: element?.name,
            value: element?.workSheetsId,
          });
        }
      });
    });

    setKeyMockup(ketMockup);
    setOptionMockup(optionForSearch);
    setMockup(DataForInit);

    setTimeout(() => {
      setLoading(true);
    }, 100);
  };

  useEffect(() => {
    let sheetes = getLocal("googlesheets");
    if (sheetes) {
      if (!sheetsLoaded) {
        console.log("GET API");
        getGoogleSheetsItems(sheetes)
          .then((x) => {
            MapDataToMinModel(x).then((data) => {
              setSheetsLoaded(data);
              InitData(data);
            });
          })
          .catch((e) => {
            checkUserAnInitData().then((x) => {
              setError("ไม่สามารถโหลดข้อมูล");
            });
          });
      } else {
        console.log("NONE GET API");
        InitData(sheetsLoaded);
      }
    } else {
      checkUserAnInitData().then((x) => {
        setTimeout(() => {
          showModalUser();
        }, 100);
      });
    }
  }, []);

  const [userInitLocal, setUserInitLocal] = useState<IUserInput>();
  const [isModalUser, setIsModalUserOpen] = useState(false);

  const showModalUser = () => {
    setIsModalUserOpen(true);
  };

  const handleOkUser = (output: IUserInput) => {
    setUsernameOrURL(output);
    window.location.reload();
    setIsModalUserOpen(false);
  };

  const checkUserAnInitData = () => {
    return CheckUsernameAndURLIsRuning().then((result) => {
      setUserInitLocal({
        googlesheets: result.local.sheets ? result.local.sheets : undefined,
        username: result.local.username ? result.local.username : undefined,
      });
      return result.result;
    });
  };

  return (
    <>
      <Modal
        title="ความปลอดภัย"
        open={isModalUser}
        // onOk={handleOkUser}
        destroyOnClose
        closable={false}
        // onCancel={handleCancelUser}
        footer={<></>}
      >
        <div className="py-3">
          <div>
            - ใส่เพียงครั้งเดียวเท่านั้น เพื่อความปลอดภัยของระบบ
            ป้องกันไม่ให้มีการจัดการ Google Sheets โดยผู้อื่น
          </div>
          <div className="font-bold ">
            - ถ้าข้อมูลผิด สามารถแก้ไขอีกครั้งได้ที่ปุ่ม ตั้งต่า
          </div>
        </div>
        <UserForm
          removeCancel
          // onCancel={handleCancelUser}
          onFinish={handleOkUser}
          initData={userInitLocal}
        ></UserForm>
      </Modal>
      <SiteHeader
        title="ระบบสร้างรายการ V2"
        description="ไม่ต้องพิมพ์อีกต่อไป.. สร้างรายการออร์เดอร์และคำนวณราคารวม และยังมีระบบคำนวนส่วนลดให้ด้วย"
      ></SiteHeader>

      {loading ? (
        <HomeGroup
          keyMockup={keyMockup}
          optionMockup={optionMockup}
          getMockup={getMockup}
        ></HomeGroup>
      ) : error ? (
        <ErrorComponent
          userInitLocal={userInitLocal}
          onClickSettingUrl={() => {
            checkUserAnInitData().then((x) => {
              setTimeout(() => {
                showModalUser();
              }, 100);
            });
          }}
          mess={error}
        ></ErrorComponent>
      ) : (
        <LoadingComponent></LoadingComponent>
      )}
    </>
  );
};

export default InterFaceTest;
