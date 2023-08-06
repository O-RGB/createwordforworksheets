import { Button, ButtonProps } from "antd";
import React from "react";

interface ButtonCustomProps extends ButtonProps {}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ ...props }) => {
  return (
    <>
      <Button {...props} type="primary"></Button>
    </>
  );
};

export default ButtonCustom;
