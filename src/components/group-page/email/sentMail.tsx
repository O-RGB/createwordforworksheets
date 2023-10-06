import { getFile } from "@/api/fetcher/getFile";
import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import * as nodemailer from "nodemailer";

interface SentMailProps {
  compoSent: ISenttEmailCompo;
  name: string;
  filename: string[];
  email: string;
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
  onLoadFinish,
}) => {
  const [strStatus, setStrStatus] = useState<string>("");
  const [finish, setFinish] = useState<boolean | undefined>(undefined);
  const [sentmail, setSentmail] = useState<boolean>(false);
  const [download, setDownload] = useState<boolean>(false);
  const [startUp, setStartUp] = useState<boolean>(false);
  const [detect, setDetect] = useState<boolean>(true);
  const [detectChangeApp, setDetectChangeApp] = useState<boolean>(true);

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

  function conventStrginToBlob(content: string, contentType = "") {
    const byteNumbers = new Array(content.length);
    for (let i = 0; i < content.length; i++) {
      byteNumbers[i] = content.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: contentType,
    });
    return blob;
  }

  const blobToBase64 = async (blob: Blob): Promise<any> => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const cleanBase64String = base64String.substring(
          "data:application/pdf;base64,".length
        );
        resolve(cleanBase64String);
      };
    });
  };

  const perparFile = async (blobList: BlobName[]): Promise<IAttachments[]> => {
    const filePromises = blobList.map((x) =>
      blobToBase64(x.blob).then((file) => ({
        content: file,
        contentType: "application/pdf",
        encoding: "base64",
        filename: x.filename,
      }))
    );

    return Promise.all(filePromises);
  };

  const sentMail = async (blobList: BlobName[]) => {
    setStrStatus("กำลังส่งอีเมล");

    // emaillmit

    // const fileList = await perparFile(blobList);
    // fetch("/api/contact", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: name,
    //     message: "messtest",
    //     email: email,
    //     attachments: fileList,
    //   }),
    // }).then((res) => {
    //   if (res.status === 200) {
    //     setSentmail(true);
    //     setStrStatus("สำเร็จ");
    //     setFinish(true);
    //   } else {
    //     setSentmail(true);
    //     setStrStatus("ไม่สำเร็จ");
    //     setFinish(false);
    //   }
    // });
  };

  useEffect(() => {
    handleOnSwapApp();
    if (!download && !startUp) {
      setStartUp(true);
      setStrStatus("กำลังติดต่อ Google Sheets");

      if (compoSent && detectChangeApp) {
        getFile(compoSent.url)
          .then((data) => {
            setStrStatus("ดาวน​์โหลดไฟล์สำเร็จ");
            setStrStatus("กำลังเตรียมไฟล์");
            if (data) {
              console.log(data.reault.LabelType);

              if (data.reault.LabelType == "INBOX") {
                setSentmail(true);
                setStrStatus("สำเร็จ");
                setFinish(true);
              } else {
                setSentmail(true);
                setStrStatus("ไม่สำเร็จ");
                setFinish(false);
              }

              // let blobList: BlobName[] = [];
              // data.reault.map((file) => {
              //   try {
              //     const isoString = file.content;
              //     const blob = conventStrginToBlob(isoString, file.mimeType);
              //     blobList.push({ blob: blob, filename: file.filename });
              //   } catch (error) {
              //     setStrStatus("ไม่สำเร็จ");
              //     setFinish(false);
              //     console.error("Error decoding Base64:", error);
              //   }
              // });
              // setStrStatus("เตรียมไฟล์สำเร็จ");
              // sentMail(blobList);
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
    </>
  );
};

export default SentMail;
