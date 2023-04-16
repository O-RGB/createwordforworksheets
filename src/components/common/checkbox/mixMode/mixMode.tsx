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
                setCount(count);
                onChange?.(checkState, value, count);
              }}
            ></ImageNumber>
          </div>
        )}

        <Checkbox
          //   defaultChecked={value == "File"}
          onChange={(e) => {
            setCheckState(e.target.checked);
            onChange?.(e.target.value, value, count + 1);
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
