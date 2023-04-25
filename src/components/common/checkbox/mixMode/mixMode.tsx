import React, { useState } from "react";
import ImageNumber from "../element/image-number";
import { Checkbox, Form } from "antd";

interface MixModeProps {
  label: string;
  value: ResultWorkSheetsMode;
  checked: boolean;
  strChecked: string;
  onChange?: (
    onClick: boolean,
    value: ResultWorkSheetsMode,
    count: number
  ) => void;
}

const MixMode: React.FC<MixModeProps> = ({
  value,
  label,
  checked = false,
  strChecked,
  onChange,
}) => {
  const [checkState, setCheckState] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="flex gap-4 justify-start items-start ">
        {value != "File" && checkState && (
          <div className="-mt-1">
            <ImageNumber
              id={""}
              onChange={(id, count) => {
                if (checkState) {
                  setCount(count);
                  onChange?.(checkState, value, count);
                } else {
                  setCount(0)
                  onChange?.(checkState, value, 0);
                }
              }}
            ></ImageNumber>
          </div>
        )}

        <Checkbox
          //   defaultChecked={value == "File"}
          onChange={(e) => {
            setCheckState(e.target.checked);
            if (e.target.checked) {
              onChange?.(e.target.value, value, count + 1);
            } else {
              setCount(0)
              onChange?.(e.target.value, value, 0);
            }
          }}
          value={value}
        >
          {label}
        </Checkbox>
      </div>
    </>
  );
};

export default MixMode;
