import { checkServerNgrokUrl, getNgrokUrl } from "@/api/fetcher/getNgrokUrl";
import { NgrokUrlContext } from "@/context/ngrokService";
 
import React, { useContext, useEffect, useMemo, useState } from "react";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";

interface ConnectionProps {
  getLocalInput: IUserInput;
  notificationInstance: any;
}

const Connection: React.FC<ConnectionProps> = ({
  getLocalInput,
  notificationInstance,
}) => {
  const { ngrokUrl, setNgrokUrl } = useContext(NgrokUrlContext);

  const openNotification = (
    message: React.ReactNode,
    InconMessage?: React.ReactNode,
    duration?: number
  ) => {
    notificationInstance.open({
      closeIcon: <></>,
      onClose() {},
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
          notificationInstance.destroy();
          setTimeout(() => {
            openNotification(<div>ติดต่อ Google sheets สำเร็จ</div>);
            setTimeout(() => {
              notificationInstance.destroy();
              openNotification(<div>กำลังติดต่อกับ Ngrok</div>);
              setTimeout(() => {
                checkServerNgrokUrl(googleSheets.configData).then((data) => {
                  setTimeout(() => {
                    setNgrokUrl(googleSheets.configData);
                    notificationInstance.destroy();
                    openNotification(
                      <div className="text-green-500">
                        Server พร้อมส่งอีเมล
                      </div>,
                      <CheckCircleOutlined className="text-green-500" />,
                      5
                    );
                  }, 1000);
                });
              }, 1000);
            }, 1000);
          }, 0);
          setStatus(true);
        }
      })
      .catch((e) => {
        setStatus(false);
        notificationInstance.destroy();
        setTimeout(() => {
          openNotification(
            <div className="text-red-500">Server ไม่พร้อมใช้งาน</div>,
            <CheckCircleOutlined className="text-red-500" />,
            5
          );
        }, 500);
      });
  };

  useEffect(() => {
    if (!ngrokUrl) {
      notificationInstance.destroy();
      setTimeout(() => {
        openNotification("กำลังติดต่อกับ Server");
      }, 500);
      if (getLocalInput.googlesheets) {
        getUrlConfigNgRok(getLocalInput.googlesheets, "ngrok_url");
      } else {
        setStatus(false);
        notificationInstance.destroy();
        setTimeout(() => {
          openNotification(
            <div className="text-red-500">ไม่พบ Google sheets UR</div>,
            <CheckCircleOutlined className="text-red-500" />,
            5
          );
        }, 500);
      }
    }
  }, []);

  return <></>;
};

export default Connection;
