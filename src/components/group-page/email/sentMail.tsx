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

  useEffect(() => {
    if (compoSent) {
      getFile(compoSent.url).then((data) => {
        //   setTimeout(() => {
        setSent(true);
        onLoadFinish?.();
        //   }, 5000);
      });
    }
  }, [compoSent]);

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
