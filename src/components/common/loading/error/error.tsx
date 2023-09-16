import React, { useEffect, useState } from "react";
import ButtonCustom from "../../button";

interface ErrorProps {
  mess: string;
  userInitLocal?: IUserInput;
  onClickSettingUrl: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({
  mess,
  onClickSettingUrl,
  userInitLocal,
}) => {
  return (
    <div className="fixed w-full h-screen bg-black/10 flex justify-center items-center p-3">
      <div className="p-5 max-w-3xl rounded-md overflow-hidden shadow-md flex flex-col gap-3 justify-center items-center bg-white">
        <div className="p-2 rounded-md bg-red-500 text-white">Error</div>
        <div>
          <div>Message: {mess}</div>
          <div className="break-all">Google Sheets URL: {userInitLocal?.googlesheets}</div>
        </div>
        <ButtonCustom type="primary" onClick={onClickSettingUrl}>
          เปลี่ยนการตั้งค่าใหม่
        </ButtonCustom>
      </div>
    </div>
  );
};

export default ErrorComponent;
