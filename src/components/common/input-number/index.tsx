import { Button, Form, FormInstance, Input, InputNumber } from "antd";
import React, { useEffect, useMemo, useState } from "react";

interface ImageNumberProps {
  id: string;
  name?: string;
  onChange?: (id: string, value: number) => void;
  value?: string;
  disabled?: boolean;
  form?: FormInstance<any>;
  isStartWithZero?: boolean;
  maxOne?: boolean;
}

const ImageNumber: React.FC<ImageNumberProps> = ({
  onChange,
  id,
  value,
  name,
  disabled = false,
  isStartWithZero = false,
  maxOne = false,
  form,
}) => {
  const [number, setNumber] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!number) {
      return;
    }
    setNumber(value);
  }, [value]);

  return (
    <div key={`${id}-${name}`}>
      <div className=" flex m-0 p-0 gap-0.5 mt-0.5 select-none">
        <div className="-mt-[3px] ">
          <Input
            disabled={disabled}
            value={value}
            readOnly
            defaultValue={value}
            className="w-fit "
            size={"small"}
            style={{ width: "50px" }}
          />
        </div>
        <div className="flex gap-0.5">
          <Button
            disabled={disabled}
            onClick={() => {
              let temp = Number(number);
              if (maxOne ? temp + 1 <= 1 : true) {
                setNumber(undefined);
                setTimeout(() => {
                  setNumber((temp + 1).toString());
                  onChange?.(id, temp + 1);
                }, 1);
              }
            }}
            className="bg-white -mt-[3px] w-8"
            size="small"
          >
            +
          </Button>
          <Button
            disabled={disabled}
            onClick={() => {
              let temp = Number(number);
              if (temp > (isStartWithZero ? 0 : 1)) {
                setTimeout(() => {
                  setNumber(undefined);
                  setNumber((temp - 1).toString());
                  onChange?.(id, temp - 1);
                }, 1);
              }
            }}
            className="bg-white -mt-[3px] w-8"
            size="small"
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageNumber;
