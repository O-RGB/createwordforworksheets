import { FloatButton, ConfigProvider } from "antd";
import React from "react";
import {
  SaveOutlined,
  DeleteOutlined,
  SettingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { PiMicrosoftExcelLogo } from "react-icons/pi";

interface FloatButtonFormProps {
  removeResult?: () => void;
  onSave?: () => void;
  onSetting?: () => void;
  onExcel?: () => void;
  onSentMail?: () => void;
  modeSetting: ModeOnFinish;
}

const FloatButtonForm: React.FC<FloatButtonFormProps> = ({
  removeResult,
  onSave,
  onSetting,
  onExcel,
  onSentMail,
  modeSetting,
}) => {
  return (
    <>
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        {modeSetting == "file" && (
          <FloatButton
            className="ant-float-btn-body-gmail"
            onClick={onSentMail}
            icon={<MailOutlined />}
            type="primary"
            style={{ right: 24 }}
          />
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
