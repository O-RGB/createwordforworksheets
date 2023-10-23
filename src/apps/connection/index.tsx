import { checkServerNgrokUrl, getNgrokUrl } from "@/api/fetcher/getNgrokUrl";
import { NgrokUrlContext } from "@/context/ngrokService";
import { notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";

interface ConnectionProps {
  getLocalInput: IUserInput;
}

const Connection: React.FC<ConnectionProps> = ({ getLocalInput }) => {
  const { ngrokUrl, setNgrokUrl } = useContext(NgrokUrlContext);

  const openNotification = (
    message: React.ReactNode,
    InconMessage?: React.ReactNode,
    duration?: number
  ) => {
    notification.open({
      closeIcon: false,
      message: (
        <div className="flex gap-3 text-xs">
          {message}
          {InconMessage ? InconMessage : <LoadingOutlined></LoadingOutlined>}
        </div>
      ),
      icon: (
        <>
          <img src="/network.gif" alt="" className="w-6 h-6 -mt-1" />
        </>
      ),
      //   description: "ewg",
      onClick: () => {},
      duration: duration ? duration : 100,
    });
  };

  const [getNgrok, setNgrok] = useState<IReslutConfigNgrok | undefined>(
    undefined
  );

  const [status, setStatus] = useState<boolean | undefined>(undefined);

  const getUrlConfigNgRok = (url: string, key: string) => {
    getNgrokUrl(url, {
      key: key,
    })
      .then((googleSheets) => {
        if (googleSheets) {
          setNgrok(googleSheets);
          notification.destroy();
          setTimeout(() => {
            openNotification(<div>ติดต่อ Google sheets สำเร็จ</div>);
            setTimeout(() => {
              notification.destroy();
              checkServerNgrokUrl(googleSheets.configData).then((data) => {
                setTimeout(() => {
                  setNgrokUrl(googleSheets.configData);
                  openNotification(
                    <div className="text-green-500">Server พร้อมส่งอีเมล</div>,
                    <CheckCircleOutlined className="text-green-500" />,
                    5
                  );
                }, 1000);
              });
            }, 1000);
          }, 1000);
          setStatus(true);
        }
      })
      .catch((e) => {
        setStatus(false);
        notification.destroy();
        setTimeout(() => {
          openNotification(
            <div className="text-red-500">Server ไม่พร้อมใช้งาน</div>,
            <CheckCircleOutlined className="text-red-500" />,
            5
          );
        }, 1000);
      });
  };

  useEffect(() => {
    if (!ngrokUrl) {
      notification.destroy();
      setTimeout(() => {
        openNotification("กำลังติดต่อกับ Server");
      }, 1000);
      if (getLocalInput.googlesheets) {
        getUrlConfigNgRok(getLocalInput.googlesheets, "ngrok_url");
      } else {
        setStatus(false);
        notification.destroy();
        setTimeout(() => {
          openNotification(
            <div className="text-red-500">ไม่พบ Google sheets UR</div>,
            <CheckCircleOutlined className="text-red-500" />,
            5
          );
        }, 1000);
      }
    }
  }, []);

  return <></>;
};

export default Connection;
