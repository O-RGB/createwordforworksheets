import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { getFacebookChat } from "@/api/fetcher/getFacebookChat";
import ButtonCustom from "@/components/common/button";

interface FacebookSendFileProps {
  urlFile: string;
  name: string;
  userId: string;
  token: string;
  adminUserId: string;
  disableWaitFuncion?: boolean;
  id?: number;
  setFinish?: (id: number) => void;
  start?: boolean;
  wait?: boolean;
}

const FacebookSendFile: React.FC<FacebookSendFileProps> = ({
  urlFile,
  name,
  userId,
  token,
  adminUserId,
  id,
  setFinish,
  start = true,
  wait = false,
  disableWaitFuncion = true,
}) => {
  const [onFetch, setOnFetch] = useState<boolean | undefined>(undefined);
  const [onResult, setOnResult] = useState<boolean | undefined>(undefined);
  const [onError, setOnError] = useState<string>();
  const [status, setStatus] = useState<string>("กำลังติดต่อไปที่ Facebook");

  const sendFile = () => {
    if (token) {
      const baseUrl = `https://graph.facebook.com/v18.0/${adminUserId}/messages`;

      const data = {
        recipient: { id: userId },
        message: {
          attachment: {
            type: "file",
            payload: {
              url: urlFile,
            },
          },
        },
      };

      const params: any = {
        access_token: token,
      };

      const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

      const url = `${baseUrl}?${queryString}`;

      getFacebookChat(
        url,
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
        },
        "POST"
      )
        .then((data: any) => {
          if (id != undefined) {
            setFinish?.(id);
          }
          if (data["error"]) {
            setOnResult(false);
            setOnError(JSON.stringify(data["error"]));
          } else {
            setStatus("ส่งไฟล์สำเร็จ");
            setOnResult(true);
          }
        })
        .catch((error) => {
          setOnResult(false);
          setOnError(JSON.stringify(error));
          console.error("Error: " + error);
          if (id != undefined) {
            setFinish?.(id);
          }
        });
    }
  };

  useEffect(() => {
    if (disableWaitFuncion) {
      if (!onFetch) {
        sendFile();
        setOnFetch(true);
      }
    } else {
      if (!onResult) {
        setStatus("กำลังรอ");
      }
      if (start) {
        if (!onFetch) {
          sendFile();
          setOnFetch(true);
        }
        setStatus("กำลังติดต่อไปที่ Facebook");
      }
    }
  }, [start, wait]);

  return (
    <>
      <div className="flex  gap-1">
        <div
          className={`border p-2 rounded-md flex flex-col sm:flex-row justify-between gap-2 w-full ${
            onResult == true
              ? "border-green-500 text-green-500"
              : onResult == false
              ? "border-red-500 text-red-500"
              : ""
          }`}
        >
          <div className="flex gap-2">
            <div>
              <FilePdfOutlined />
            </div>
            <div>{name}</div>
          </div>
          <div className="flex gap-2 text-right sm:items-center sm:w-full sm:justify-end">
            <div>
              <ApartmentOutlined />
            </div>
            <div className="">{status}</div>
            <div>
              {onResult == true ? (
                <>
                  <CheckCircleOutlined />
                </>
              ) : (
                <>
                  <LoadingOutlined />
                </>
              )}
            </div>
          </div>
        </div>
        {onError && (
          <div className="w-fit">
            <ButtonCustom
              onClick={() => {
                sendFile();
                setOnFetch(undefined);
                setOnResult(undefined);
                setOnError(undefined);
                setStatus("กำลังติดต่อไปที่ Facebook");
              }}
              className="block h-full border border-green-400 text-[10px]"
            >
              <div className="-mx-2 text-green-500">ส่งใหม่</div>
            </ButtonCustom>
          </div>
        )}
      </div>
      {onError && (
        <div className="text-right text-xs text-red-500 py-0.5 w-full flex justify-end">
          <div className="w-1/2">รายละเอียด: {onError}</div>
        </div>
      )}
    </>
  );
};

export default FacebookSendFile;
