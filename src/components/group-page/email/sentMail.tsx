import { getFile } from "@/api/fetcher/getFile";
import React, { useContext, useEffect, useState } from "react";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import * as nodemailer from "nodemailer";
import { NgrokUrlContext } from "@/context/ngrokService";
import { sendMailServerNgrokUrl } from "@/api/fetcher/getNgrokUrl";

interface SentMailProps {
  compoSent: ISenttEmailCompo;
  name: string;
  filename: string[];
  email: string;
  rootToFile: string[];
  onLoadFinish?: () => void;
}

interface BlobName {
  blob: Blob;
  filename: string;
}
interface BaseAndName {
  base: string;
  filename: string;
}

interface IAttachments {
  filename: string;
  content: string;
  encoding: string;
  contentType: string;
}

const SentMail: React.FC<SentMailProps> = ({
  compoSent,
  name,
  filename,
  email,
  rootToFile,
  onLoadFinish,
}) => {
  const [strStatus, setStrStatus] = useState<string>("");
  const [finish, setFinish] = useState<boolean | undefined>(undefined);
  const [sentmail, setSentmail] = useState<boolean>(false);
  const [download, setDownload] = useState<boolean>(false);
  const [startUp, setStartUp] = useState<boolean>(false);
  const [detect, setDetect] = useState<boolean>(true);
  const [detectChangeApp, setDetectChangeApp] = useState<boolean>(true);
  const { ngrokUrl } = useContext(NgrokUrlContext);
  const [detailEror, setDetailError] = useState<string>("");

  const handleOnSwapApp = () => {
    const handleFocus = () => {
      setDetectChangeApp(true);
    };

    const handleBlur = () => {
      setDetectChangeApp(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
  };

  useEffect(() => {
    handleOnSwapApp();
    if (!download && !startUp!) {
      setStartUp(true);
      setStrStatus("รอการตอบกลับจาก Ngrok");

      if (compoSent && detectChangeApp && ngrokUrl) {
        sendMailServerNgrokUrl(ngrokUrl, {
          filepaths: rootToFile,
          recipient: email,
          subject: name,
        })
          .then((data) => {
            if (data) {
              if (data.status) {
                setSentmail(true);
                setStrStatus("สำเร็จ");
                setFinish(true);
              } else {
                setSentmail(true);
                setStrStatus("ไม่สำเร็จ");
                setFinish(false);
                setDetailError(data.message);
              }

              setDownload(true);
              onLoadFinish?.();
            }
          })
          .catch((er) => {
            setStrStatus("ไม่สำเร็จ");
            setFinish(false);
          });
      }
    }
  }, [compoSent, download, handleOnSwapApp]);

  if (!compoSent) {
    return <></>;
  }
  if (!detectChangeApp) {
    return <></>;
  }
  return (
    <>
      <div
        className={`border p-2 rounded-md flex justify-between gap-2 ${
          finish == true
            ? "border-green-500 text-green-500"
            : finish == false
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
          <div>{strStatus}</div>
          <div>
            {finish == true ? (
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
      {detailEror && (
        <div className="text-right text-xs text-red-500 py-0.5 w-full flex justify-end">
          <div className="w-1/2">รายละเอียด: {detailEror}</div>
        </div>
      )}
    </>
  );
};

export default SentMail;
