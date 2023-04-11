import { Checkbox } from "antd";
import React, { useState } from "react";
import CheckBoxImageLabel from "./image-label";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface CheckBoxProps {
  value: string;
  label: string;
  imageMode?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  label,
  imageMode = false,
}) => {
  const [checkBoxOnChange, setOnChange] = useState<boolean>(false);
  const onCheck = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setOnChange(true);
    } else {
      setOnChange(false);
    }
  };
  return (
    <>
      <Checkbox
        onChange={(e) => onCheck(e)}
        className={`${
          imageMode ? "p-2" : "p-2 pb-4"
        } rounded-md w-full duration-200 ${
          checkBoxOnChange ? "bg-slate-100" : ""
        }`}
        value={value}
      >
        <div className={`flex flex-col gap-2   `}>
          {label}
          <div hidden={imageMode}>
            <CheckBoxImageLabel
              url="https://picsum.photos/200/200"
              select={checkBoxOnChange}
            ></CheckBoxImageLabel>
          </div>
        </div>
      </Checkbox>
    </>
  );
};

export default CheckBox;
