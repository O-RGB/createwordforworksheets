import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React from "react";

interface InputCommonProps {
  name?: string;
  label?: string;
  size?: SizeType;
  styleWidth?: string;
}

const InputCommon: React.FC<InputCommonProps> = ({
  name,
  label,
  size,
  styleWidth,
}) => {
  return (
    <>
      <Form.Item className="m-0 p-0" name={name} label={label}>
        <Input
          size={size}
          // placeholder="Basic usage"
          style={{ width: styleWidth ?? "100%" }}
        />
      </Form.Item>
    </>
  );
};

export default InputCommon;
