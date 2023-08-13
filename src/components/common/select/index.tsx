import React from "react";
import { Form, Input, Select, SelectProps } from "antd";
import { TextAreaProps } from "antd/es/input";
import { Rule } from "antd/es/form";
const { TextArea } = Input;

interface SelectCommonProps extends SelectProps {
  label?: string;
  rules?: Rule[] | undefined;
  name?: string;
  initialValue?: any;
  required?: boolean;
}

const SelectCommon: React.FC<SelectCommonProps> = ({
  label,
  rules,
  name,
  initialValue,
  required,
  ...props
}) => {
  return (
    <Form.Item
      style={{ marginBottom: 0, width: "100%" }}
      initialValue={initialValue}
      name={name}
      label={label}
      rules={rules}
      required={required}
    >
      <Select {...props}></Select>
    </Form.Item>
  );
};

export default SelectCommon;
