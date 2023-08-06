import React from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
const { TextArea } = Input;

interface TextAreaCustomProps extends TextAreaProps {}

const TextAreaCustom: React.FC<TextAreaCustomProps> = ({}) => {
  return <TextArea></TextArea>;
};

export default TextAreaCustom;
