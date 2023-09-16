import { CalColor, colorSecondary } from "@/config/color";
import { Form, Input, InputProps } from "antd";
import { Rule } from "antd/es/form";

import React from "react";

interface InputCustomProps extends InputProps {
  label?: any;
  rules?: Rule[] | undefined;
  name?: string;
  initialValue?: any;
}

const InputCustom: React.FC<InputCustomProps> = ({
  label,
  rules,
  name,
  initialValue,
  ...prpos
}) => {
  return (
    <Form.Item
      style={{ marginBottom: 0, width: "100%" }}
      initialValue={initialValue}
      name={name}
      label={label}
      rules={rules}
      required={prpos.required}
    >
      <Input
        {...prpos}
        style={{
          width: "100%",
          backgroundColor:"#FFFFFF",
        }}
      />
    </Form.Item>
  );
};

export default InputCustom;
