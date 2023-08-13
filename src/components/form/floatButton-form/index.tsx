import { FloatButton, ConfigProvider } from "antd";
import React from "react";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

interface FloatButtonFormProps {
  removeResult?: () => void;
  onSave?: () => void;
}

const FloatButtonForm: React.FC<FloatButtonFormProps> = ({
  removeResult,
  onSave,
}) => {
  return (
    <>
      <FloatButton.Group shape="circle" style={{ right: 24, bottom: 15 }}>
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
