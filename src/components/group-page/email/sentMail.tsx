import { getFile } from "@/api/fetcher/getFile";
import React, { useEffect, useState } from "react";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";

interface SentMailProps {
  compoSent: ISenttEmailCompo;
  name: string;
  filename: string[];
  onLoadFinish?: () => void;
}

const SentMail: React.FC<SentMailProps> = ({
  compoSent,
  name,
  filename,
  onLoadFinish,
}) => {
  const [sent, setSent] = useState<boolean>(false);
  const [senting, setSenting] = useState<boolean>(false);
  const [detect, setDetect] = useState<boolean>(true);
  const [detectChangeApp, setDetectChangeApp] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  //   const handleVisibilityChange = () => {
  //     document.addEventListener("visibilitychange", (event) => {
  //       if (document.visibilityState == "visible") {
  //         // console.log("tab is active");
  //         setDetect(true);
  //       } else {
  //         setDetect(false);
  //         // console.log("tab is inactive");
  //       }
  //     });
  //   };

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
    if (!sent && !senting) {
      setSenting(true);

      if (compoSent && detectChangeApp) {
        getFile(compoSent.url).then((data) => {
          console.log(data);
          if (data) {
            data.reault.map((file) => {
              try {
                const isoString = file.content;

                // Convert ISO-8859-1 string to byte array
                const byteNumbers = new Array(isoString.length);
                for (let i = 0; i < isoString.length; i++) {
                  byteNumbers[i] = isoString.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);

                // Convert byte array to Blob
                const blob = new Blob([byteArray], {
                  type: file.mimeType,
                });

                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = file.fileName || "download";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // ลบ URL object เมื่อเสร็จสิ้นเพื่อป้องกัน memory leak
                URL.revokeObjectURL(url);
              } catch (error) {
                console.error("Error decoding Base64:", error);
              }
            });
          }

          // setTimeout(() => {
          //   setData(data);
          setSent(true);
          onLoadFinish?.();
          // }, Math.floor(Math.random() * (10 - 5 + 1) + 5) * 1000);
        });
      }
    }
  }, [compoSent, sent, handleOnSwapApp, data]);

  if (!compoSent) {
    return <></>;
  }
  if (!detectChangeApp) {
    return <></>;
  }
  return (
    <>
      {JSON.stringify(sent)}
      {JSON.stringify(data)}
      {!sent ? (
        <div className="border p-2 rounded-md flex gap-2">
          <div>
            <LoadingOutlined />
          </div>
          <div>{name}</div>
        </div>
      ) : (
        <div className="border p-2 rounded-md flex gap-2 text-green-500">
          <div>
            <CheckCircleOutlined />
          </div>
          <div>{name}</div>
        </div>
      )}
    </>
  );
};

export default SentMail;
