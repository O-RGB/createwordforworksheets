import { Checkbox } from "antd";
import React, { useState } from "react";
import CheckBoxImageLabel from "./image-image";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import ImageDetail from "./image-detail";

interface CheckBoxProps {
  value: string;
  label: string;
  imageMode?: boolean;
  onSelect?: (value: CheckBoxGroupOptions, select: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  label,
  imageMode = false,
  onSelect,
}) => {
  const [checkBoxOnChange, setOnChange] = useState<boolean>(false);
  const onCheck = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setOnChange(true);
      onSelect?.(
        {
          label: label,
          value: value,
        },
        true
      );
    } else {
      setOnChange(false);
      onSelect?.(
        {
          label: label,
          value: value,
        },
        false
      );
    }
  };
  return (
    <>
      <Checkbox
        onChange={(e) => {
          onCheck(e);
        }}
        className={`${
          imageMode ? "p-2" : "p-2 pb-4"
        } rounded-md w-full duration-200 ${
          checkBoxOnChange ? "bg-slate-100" : ""
        }`}
        value={value}
      >
        <div className={`flex flex-col gap-2`}>
          {label}
          <div hidden={imageMode}>
            <div className="flex gap-3">
              <CheckBoxImageLabel
                url="https://picsum.photos/800/1300"
                select={checkBoxOnChange}
              ></CheckBoxImageLabel>
              <ImageDetail
                ImageDetailPrice={{
                  book: 84,
                  tool: 9,
                  file: 8,
                  print: 9,
                }}
              ></ImageDetail>
            </div>
          </div>
        </div>
      </Checkbox>
    </>
  );
};

export default CheckBox;
