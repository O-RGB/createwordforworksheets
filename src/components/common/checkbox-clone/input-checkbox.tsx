import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";
import ImageNumber from "../checkbox/element/image-number";

interface InputCheckboxProps {
  label: string;
  type: ResultWorkSheetsMode;
  checked?: boolean | undefined;
  inputOnly?: boolean;
  className?: string;
  value?: string;
  onChange?: (
    select: boolean,
    value: number,
    type: ResultWorkSheetsMode
  ) => void;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  label,
  onChange,
  checked,
  className,
  type,
  inputOnly,
  value,
}) => {
  const [onCheck, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (checked) {
      setCheck(checked);
    }
  }, [checked]);

  return (
    <>
      <div className={`flex gap-3 ${className}`}>
        <Checkbox
          className={`w-full md:w-auto ${inputOnly ? " hidden" : ""}`}
          checked={checked}
          onChange={(e) => {
            setCheck(e.target.checked);
            onChange?.(e.target.checked, e.target.checked ? 1 : 0, type);
          }}
        >
          {label}
        </Checkbox>
        {onCheck && (
          <div className="-mt-[3px]">
            <ImageNumber
              value={value}
              onChange={(e, input) => {
                onChange?.(true, input, type);
              }}
              id={""}
            ></ImageNumber>
          </div>
        )}
      </div>
    </>
  );
};

export default InputCheckbox;
