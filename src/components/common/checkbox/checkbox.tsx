import { Checkbox } from "antd";
import React, { useState } from "react";
import CheckBoxImageLabel from "./image-image";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import ImageDetail from "./image-detail";
import ImageCondition from "./image-condition";
import ImageNumber from "./image-number";

interface CheckBoxProps {
  value: string;
  label: string;
  imageMode?: boolean;
  onSelect?: (value: CheckBoxGroupOptions, select: boolean) => void;
  onUpdate?: (value: CheckBoxGroupOptions) => void;
  imageUrl?: string;
  price?: WorkSheetsDetailPrice;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  label,
  imageMode = false,
  onSelect,
  onUpdate,
  imageUrl,
  price,
}) => {
  const [checkBoxOnChange, setOnChange] = useState<boolean>(false);
  const [countNumber, setCountNumber] = useState<number>(1);
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
          number: 1,
        },
        true
      );
    } else {
      setModeCheckBox("File");
      setCountNumber(1);
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
      number: 1,
    });
  };

  const numberOnChange = (id: string, number: number) => {
    console.log(number);
    setCountNumber(number);
    onUpdate?.({
      label: label,
      value: value,
      image: imageUrl ?? "",
      mode: modeCheckBox,
      number: number,
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
          imageMode ? "p-2" : "p-2 "
        }   rounded-md w-full duration-200 ${
          checkBoxOnChange ? "bg-slate-100" : ""
        }`}
        value={value}
      >
        <div
          className={`${
            imageMode ? "flex flex-col sm:flex-row" : ""
          } w-full gap-4`}
        >
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
                    book: price?.book,
                    tool: price?.tool,
                    file: price?.file,
                    print: price?.print,
                  }}
                ></ImageDetail>
              </div>
            </div>
          </div>
          {checkBoxOnChange && (
            <div
              className={`flex flex-col sm:flex-row  ${
                imageMode ? "gap-3 sm:gap-5" : "sm:items-end gap-3 pt-3"
              }  select-none -mt-0.5  `}
            >
              {modeCheckBox != "File" && (
                <div>
                  <ImageNumber
                    id={value}
                    onChange={(id, value) => {
                      if (checkBoxOnChange) {
                        numberOnChange(id, value);
                      }
                    }}
                  ></ImageNumber>
                </div>
              )}

              <div className="flex pt-1 ">
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
