import { Form, Input } from "antd";
import React from "react";

interface InputCommonProps {
  name?: string;
  label?: string;
}

const InputCommon: React.FC<InputCommonProps> = ({ name, label }) => {
  return (
    <>
      <Form.Item name={name} label={label}>
        <Input placeholder="Basic usage" style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
};

export default InputCommon;
