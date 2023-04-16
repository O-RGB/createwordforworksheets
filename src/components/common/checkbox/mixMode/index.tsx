import { Checkbox, Form } from "antd";
import React, { useState } from "react";
import ImageNumber from "../element/image-number";
import MixMode from "./mixMode";

interface ImageCheckBookProps {
  onChange?: (checkboxMixMain: checkboxMixMain) => void;
}

const ImageCheckBook: React.FC<ImageCheckBookProps> = ({ onChange }) => {
  const optionsWithDisabled = [
    { label: "ไฟล์", value: "File" },
    { label: "ปริ้น", value: "Print" },
    { label: "เข้าเล่ม", value: "Book" },
  ];

  const [checkboxMixMain, setcheckboxMixMain] = useState<checkboxMixMain>({
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
  });
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
                  setChecked(value);
                  setValueChecked(e);
                  console.log(e, value, count);
                  temp[value].count = count;
                  temp[value].value = value;
                  setcheckboxMixMain(temp);
                  onChange?.(temp);
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
