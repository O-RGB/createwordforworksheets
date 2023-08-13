import React from "react";
import { Form, Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import { Rule } from "antd/es/form";
const { TextArea } = Input;

interface TextAreaCustomProps extends TextAreaProps {
  label?: string;
  rules?: Rule[] | undefined;
  name?: string;
  initialValue?: any;
  required?: boolean;
}

const TextAreaCustom: React.FC<TextAreaCustomProps> = ({
  label,
  rules,
  name,
  initialValue,
  required,
  ...props
}) => {
  return (
    <Form.Item
      style={{ marginBottom: 0 }}
      initialValue={initialValue}
      name={name}
      label={label}
      rules={rules}
      required={required}
    >
      <TextArea {...props}></TextArea>
    </Form.Item>
  );
};

export default TextAreaCustom;
