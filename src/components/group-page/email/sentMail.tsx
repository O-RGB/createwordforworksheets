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

  const handleVisibilityChange = () => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        console.log("tab is active");
      } else {
        console.log("tab is inactive");
      }
    });
  };

  useEffect(() => {
    handleVisibilityChange();
    if (compoSent) {
      getFile(compoSent.url).then((data) => {
        //   updateState();
        //   setTimeout(() => {
        setSent(true);
        onLoadFinish?.();
        //   }, 5000);
      });
    }
  }, [compoSent, handleVisibilityChange, sent]);

  if (!compoSent) {
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
