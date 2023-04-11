import { Form, Input } from "antd";
import React from "react";
const { TextArea } = Input;

interface TextAreaCommonProps {
  name?: string;
  label?: string;
}

const TextAreaCommon: React.FC<TextAreaCommonProps> = ({ name, label }) => {
  return (
    <>
      <Form.Item className="m-0 p-0" name={name} label={label}>
        <TextArea placeholder="Basic usage" style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
};

export default TextAreaCommon;
