import { CalColor, colorSecondary } from "@/config/color";
import { Radio, RadioGroupProps } from "antd";
import React from "react";

interface RadioCustomProps extends RadioGroupProps {
  radioOption: Option[];
}

const RadioCustom: React.FC<RadioCustomProps> = ({ radioOption, ...props }) => {
  return (
    <Radio.Group {...props}>
      {radioOption.map((data, index) => {
        return (
          <Radio key={`radio-key-${index}`} value={data.value}>
            {data.label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default RadioCustom;
