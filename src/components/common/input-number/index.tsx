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
}

const ImageNumber: React.FC<ImageNumberProps> = ({
  onChange,
  id,
  value,
  name,
  disabled = false,
  isStartWithZero = false,
  form,
}) => {
  const [number, setNumber] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!number) {
      setNumber(value);
    }
  }, [value]);

  return (
    <div key={`${id}-${name}`}>
      <div className=" flex m-0 p-0 gap-0.5 mt-0.5 select-none">
        <div className="-mt-[3px] ">
          <Input
            disabled={disabled}
            value={number}
            readOnly
            // defaultValue={1}
            className="w-fit "
            size={"small"}
            style={{ width: "40px" }}
          />
        </div>
        <div className="flex gap-0.5">
          <Button
            disabled={disabled}
            onClick={() => {
              let temp = Number(number);
              setNumber(undefined);
              setTimeout(() => {
                setNumber((temp + 1).toString());
                onChange?.(id, temp + 1);
              }, 1);
            }}
            className="bg-white -mt-[3px]"
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
            className="bg-white -mt-[3px]"
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
