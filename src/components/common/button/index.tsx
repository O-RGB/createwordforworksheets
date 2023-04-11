import { Button, Form } from "antd";
import React from "react";

interface ButtonCommonProps {
  children?: React.ReactNode;
  name?: string;
  label?: string;
}

const ButtonCommon: React.FC<ButtonCommonProps> = ({
  children,
  name,
  label,
}) => {
  return (
    <>
      <Form.Item className="m-0 p-0" name={name} label={label}>
        <Button>{children}</Button>
      </Form.Item>
    </>
  );
};

export default ButtonCommon;
