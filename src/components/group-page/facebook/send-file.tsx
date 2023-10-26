import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { getFacebookChat } from "@/api/fetcher/getFacebookChat";

interface FacebookSendFileProps {
  urlFile: string;
  name: string;
  userId: string;
  token: string;
  adminUserId: string;
}

const FacebookSendFile: React.FC<FacebookSendFileProps> = ({
  urlFile,
  name,
  userId,
  token,
  adminUserId,
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
        .then((data) => {
          setStatus("ส่งไฟล์สำเร็จ");
          setOnResult(true);
        })
        .catch((error) => {
          setOnResult(false);
          setOnError(JSON.stringify(error));
          console.error("Error: " + error);
        });
    }
  };

  useEffect(() => {
    if (!onFetch) {
      sendFile();
      setOnFetch(true);
    }
  }, []);

  return (
    <>
      <div
        className={`border p-2 rounded-md flex flex-col sm:flex-row justify-between gap-2 ${
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
        <div className="flex gap-2">
          <div>
            <ApartmentOutlined />
          </div>
          <div>{status}</div>
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
        <div className="text-right text-xs text-red-500 py-0.5 w-full flex justify-end">
          <div className="w-1/2">รายละเอียด: {onError}</div>
        </div>
      )}
    </>
  );
};

export default FacebookSendFile;
