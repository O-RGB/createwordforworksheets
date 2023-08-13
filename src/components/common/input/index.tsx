import { Form, Input, InputProps } from "antd";
import { Rule } from "antd/es/form";

import React from "react";

interface InputCustomProps extends InputProps {
  label?: string;
  rules?: Rule[] | undefined;
  name?: string;
  initialValue?: number;
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
      style={{ marginBottom: 0 }}
      initialValue={initialValue}
      name={name}
      label={label}
      rules={rules}
      required={prpos.required}
    >
      <Input {...prpos} style={{ width: "100%" }} />
    </Form.Item>
  );
};

export default InputCustom;
