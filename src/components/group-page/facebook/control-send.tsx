import React, { useState } from "react";
import FacebookSendFile from "./send-file";

interface ControlerFileProps {
  sendFileCreateCompo: {
    name: string;
    fileUrl: string;
  }[];
  userId: string;
  token: string;
  adminUserId: string;
  disableWaitFuncion?: boolean;
}

const ControlerFile: React.FC<ControlerFileProps> = ({
  sendFileCreateCompo,

  userId,
  token,
  adminUserId,
  disableWaitFuncion = true,
}) => {
  const [runner, setRunner] = useState<number>(0);
  const genIdForWait = (nextId: number) => {
    setRunner(nextId);
  };

  const setFinish = (id: number) => {
    console.log("check");
    genIdForWait(id + 1);
  };

  return (
    <>
      {sendFileCreateCompo?.map((data, index) => {
        return (
          <div key={`copo-sent-${index}`}>
            <FacebookSendFile
              id={index}
              start={runner == index}
              setFinish={setFinish}
              adminUserId={adminUserId}
              token={token}
              userId={userId}
              name={data.name}
              urlFile={data.fileUrl}
              wait={runner == index}
              disableWaitFuncion={disableWaitFuncion}
            ></FacebookSendFile>
          </div>
        );
      })}
    </>
  );
};

export default ControlerFile;
