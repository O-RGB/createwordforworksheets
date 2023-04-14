import { Checkbox } from "antd";
import React, { useState } from "react";
import CheckBoxImageLabel from "./image-image";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import ImageDetail from "./image-detail";
import ImageCondition from "./image-condition";

interface CheckBoxProps {
  value: string;
  label: string;
  imageMode?: boolean;
  onSelect?: (value: CheckBoxGroupOptions, select: boolean) => void;
  onUpdate?: (value: CheckBoxGroupOptions) => void;
  imageUrl?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  label,
  imageMode = false,
  onSelect,
  onUpdate,
  imageUrl,
}) => {
  const [checkBoxOnChange, setOnChange] = useState<boolean>(false);
  const [modeCheckBox, setModeCheckBox] =
    useState<ResultWorkSheetsMode>("File");
  const onCheck = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setOnChange(true);
      onSelect?.(
        {
          label: label,
          value: value,
          image: imageUrl ?? "",
          mode: modeCheckBox,
        },
        true
      );
    } else {
      setOnChange(false);
      onSelect?.(
        {
          label: label,
          value: value,
          image: imageUrl ?? "",
          mode: modeCheckBox,
        },
        false
      );
    }
  };

  const radioOnChange = (result: ResultWorkSheetsMode) => {
    onUpdate?.({
      label: label,
      value: value,
      image: imageUrl ?? "",
      mode: result,
    });
  };

  return (
    <>
      <Checkbox
        onChange={(e) => {
          onCheck(e);
        }}
        rootClassName="w-full"
        className={`${
          imageMode ? "p-2" : "p-2 pb-4"
        }   rounded-md w-full duration-200 ${
          checkBoxOnChange ? "bg-slate-100" : ""
        }`}
        value={value}
      >
        <div className={`${imageMode ? "flex" : ""} w-full gap-4  `}>
          <div className={`flex flex-col gap-2 `}>
            <div>{label}</div>
            <div hidden={imageMode}>
              <div className="flex gap-3">
                {imageUrl && (
                  <CheckBoxImageLabel
                    url={imageUrl}
                    select={checkBoxOnChange}
                  ></CheckBoxImageLabel>
                )}
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
          {checkBoxOnChange && (
            <div
              className={`flex items-center justify-center select-none -mt-0.5`}
            >
              <div>
                {!imageMode && <br />}
                <ImageCondition
                  id={value}
                  onChange={(id, value) => {
                    if (checkBoxOnChange) {
                      radioOnChange(value);
                      setModeCheckBox(value);
                    }
                  }}
                ></ImageCondition>
              </div>
            </div>
          )}
        </div>
      </Checkbox>
    </>
  );
};

export default CheckBox;
