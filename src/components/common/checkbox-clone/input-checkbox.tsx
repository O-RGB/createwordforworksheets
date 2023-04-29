import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";
import ImageNumber from "../checkbox/element/image-number";

interface InputCheckboxProps {
  label: string;
  type: ResultWorkSheetsMode;
  checked?: boolean | undefined;
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
  type,
}) => {
  const [onCheck, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (checked) {
      setCheck(checked);
    }
  }, [checked]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <Checkbox
          checked={checked}
          onChange={(e) => {
            setCheck(e.target.checked);
            onChange?.(e.target.checked, e.target.checked ? 1 : 0, type);
          }}
        >
          {label}
        </Checkbox>
        {onCheck && (
          <ImageNumber
            onChange={(e, input) => {
              onChange?.(true, input, type);
            }}
            id={""}
          ></ImageNumber>
        )}
      </div>
    </>
  );
};

export default InputCheckbox;
