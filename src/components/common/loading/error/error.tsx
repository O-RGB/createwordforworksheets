import React, { useEffect, useState } from "react";
import ButtonCustom from "../../button";
import { Result } from "antd";

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
        <Result
          status="error"
          title={mess}
          subTitle={
            <div className="break-all">
              Google Sheets URL: {userInitLocal?.googlesheets}
            </div>
          }
          extra={[
            <ButtonCustom
              type="primary"
              key="console"
              onClick={onClickSettingUrl}
            >
              เปลี่ยนการตั้งค่าใหม่
            </ButtonCustom>,
          ]}
        />
      </div>
    </div>
  );
};

export default ErrorComponent;
