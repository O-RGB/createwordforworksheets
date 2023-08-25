import { FloatButton, ConfigProvider } from "antd";
import React from "react";
import {
  SaveOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface FloatButtonFormProps {
  removeResult?: () => void;
  onSave?: () => void;
  onSetting?: () => void;
}

const FloatButtonForm: React.FC<FloatButtonFormProps> = ({
  removeResult,
  onSave,
  onSetting,
}) => {
  return (
    <>
      <FloatButton.Group shape="circle" style={{ right: 24,   }}>
        <FloatButton
          onClick={onSetting}
          icon={<SettingOutlined />}
          type="primary"
          style={{ right: 24 }}
        />
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#00b96b",
              },
              Input: {
                colorPrimary: "#eb2f96",
              },
            },
          }}
        >
          <FloatButton
            onClick={removeResult}
            icon={<DeleteOutlined />}
            type="primary"
            style={{ right: 24 }}
          />
        </ConfigProvider>
        <FloatButton
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
