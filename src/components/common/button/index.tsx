import { BgCal, colorPrimary } from "@/config/color";
import { Button, ButtonProps } from "antd";
import React from "react";

interface ButtonCustomProps extends ButtonProps {
  btnColor?: string;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ btnColor, ...props }) => {
  return (
    <Button
      style={
        props.type == "primary"
          ? {
              ...BgCal(btnColor ? btnColor : colorPrimary),
              color: "white",
              opacity: props.disabled != true ? "1" : "0.5",
            }
          : undefined
      }
      {...props}
    ></Button>
  );
};

export default ButtonCustom;
