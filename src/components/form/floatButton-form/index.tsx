import { FloatButton, ConfigProvider } from "antd";
import React, { useContext } from "react";
import {
  SaveOutlined,
  DeleteOutlined,
  SettingOutlined,
  MailOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  FacebookFilled,
} from "@ant-design/icons";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { NgrokUrlContext } from "@/context/ngrokService";
import { BsMessenger } from "react-icons/bs";

interface FloatButtonFormProps {
  removeResult?: () => void;
  onSave?: () => void;
  onSetting?: () => void;
  onExcel?: () => void;
  onSentMail?: () => void;
  onFacebook?: () => void;
  modeSetting: ModeOnFinish;
}

const FloatButtonForm: React.FC<FloatButtonFormProps> = ({
  removeResult,
  onSave,
  onSetting,
  onExcel,
  onSentMail,
  onFacebook,
  modeSetting,
}) => {
  const { ngrokUrl } = useContext(NgrokUrlContext);
  return (
    <>
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        {modeSetting == "file" && (
          <>
            <FloatButton
              className="ant-float-btn-body-gmail"
              onClick={onSentMail}
              icon={
                <div className="relative">
                  {ngrokUrl ? (
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <CheckCircleFilled className="text-[0.5rem] text-green-500 bg-white rounded-full border border-white" />
                    </div>
                  ) : (
                    <div className="absolute -bottom-1 -right-1">
                      <CloseCircleFilled className="text-[0.5rem] text-red-500 bg-white rounded-full border border-white" />
                    </div>
                  )}
                  <MailOutlined />
                </div>
              }
              type="primary"
              style={{ right: 24 }}
            />
            <FloatButton
              className="ant-float-btn-body-facebook"
              onClick={onFacebook}
              icon={<BsMessenger />}
              type="primary"
              style={{ right: 24 }}
            />
          </>
        )}
        {modeSetting != "file" && (
          <FloatButton
            className="ant-float-btn-body-excel"
            onClick={onExcel}
            icon={<PiMicrosoftExcelLogo />}
            type="primary"
            style={{ right: 24 }}
          />
        )}
        <FloatButton
          onClick={onSetting}
          className="ant-float-btn-body-secondary"
          icon={<SettingOutlined />}
          type="primary"
          style={{ right: 24 }}
        />
        <FloatButton
          className="ant-float-btn-body-red"
          onClick={removeResult}
          icon={<DeleteOutlined />}
          type="primary"
          style={{ right: 24 }}
        />
        <FloatButton
          className="ant-float-btn-body-green"
          onClick={onSave}
          icon={<SaveOutlined />}
          type="primary"
          style={{ right: 24 }}
        />
      </FloatButton.Group>
    </>
  );
};

export default FloatButtonForm;
