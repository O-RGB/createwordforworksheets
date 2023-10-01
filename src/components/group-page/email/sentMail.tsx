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
      //   handleVisibilityChange();
      if (compoSent && detectChangeApp) {
        getFile(compoSent.url).then((data) => {
          // setTimeout(() => {
          setSent(true);
          onLoadFinish?.();
          // }, 5000);
        });
      }
    }
  }, [compoSent, sent, handleOnSwapApp]);

  if (!compoSent) {
    return <></>;
  }
  if (!detectChangeApp) {
    return <></>;
  }
  return (
    <>
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
