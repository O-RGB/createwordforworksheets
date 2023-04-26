import { Form, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";
import React from "react";

interface InputCommonProps {
  name?: string;
  label?: string;
  size?: SizeType;
  styleWidth?: string;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  rules?: Rule[];
}

const InputCommon: React.FC<InputCommonProps> = ({
  name,
  label,
  size,
  styleWidth,
  icon,
  prefix,
  suffix,
  rules,
}) => {
  return (
    <>
      <Form.Item
        className="m-0 p-0  "
        name={name}
        rules={rules}
        label={
          <>
            {icon ? (
              <div className="flex gap-2">
                <div>{icon}</div>
                <div>{label}</div>
              </div>
            ) : (
              label
            )}
          </>
        }
      >
        <Input
          prefix={prefix}
          suffix={suffix}
          size={size}
          // placeholder="Basic usage"
          style={{ width: styleWidth ?? "100%" }}
        />
      </Form.Item>
    </>
  );
};

export default InputCommon;
