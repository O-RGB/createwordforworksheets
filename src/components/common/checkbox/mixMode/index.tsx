import { Checkbox, Form } from "antd";
import React, { useState } from "react";
import ImageNumber from "../element/image-number";
import MixMode from "./mixMode";

interface ImageCheckBookProps {
  mainId: string;
  onChange?: (checkboxMixMain: checkboxMixMain) => void;
}

const ImageCheckBook: React.FC<ImageCheckBookProps> = ({
  onChange,
  mainId,
}) => {
  const optionsWithDisabled = [
    { label: "ไฟล์", value: "File" },
    { label: "ปริ้น", value: "Print" },
    { label: "เข้าเล่ม", value: "Book" },
  ];

  const defaultValue: checkboxMixMain = {
    mainId: mainId,
    Book: {
      count: 0,
      value: "Book",
    },
    File: {
      count: 0,
      value: "File",
    },
    Print: {
      count: 0,
      value: "Print",
    },
  };

  const [checkboxMixMain, setcheckboxMixMain] =
    useState<checkboxMixMain>(defaultValue);
  const [valuCchecked, setValueChecked] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>("File");

  return (
    <>
      <div className="flex flex-col gap-3">
        {optionsWithDisabled.map((data, i) => {
          return (
            <React.Fragment key={`${data.label}-key-${i}`}>
              <MixMode
                checked={valuCchecked}
                strChecked={checked}
                onChange={(e, value, count) => {
                  let temp = checkboxMixMain;
                  // setTimeout(() => {
                  // console.log(temp);
                  setChecked(value);
                  setValueChecked(e);
                  if (e) {
                    temp[value].count = count;
                  } else {
                    temp[value].count = 0;
                  }
                  temp[value].value = value;
                  console.log(temp,count)
                  setcheckboxMixMain(temp);
                  onChange?.(temp);
                  // }, 10);
                }}
                label={data.label}
                value={data.value as ResultWorkSheetsMode}
              ></MixMode>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default ImageCheckBook;
