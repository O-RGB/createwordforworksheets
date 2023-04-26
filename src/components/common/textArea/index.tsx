import { Form, Input } from "antd";
import React from "react";
const { TextArea } = Input;

interface TextAreaCommonProps {
  name?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
}

const TextAreaCommon: React.FC<TextAreaCommonProps> = ({
  name,
  label,
  value,
  disabled,
}) => {
  return (
    <>
      <Form.Item className="m-0 p-0" name={name} label={label}>
        <TextArea
          readOnly={disabled}
          autoSize
          value={value}
          placeholder="Basic usage"
          style={{ width: "100%" }}
        />
      </Form.Item>
    </>
  );
};

export default TextAreaCommon;
