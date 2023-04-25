import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import InputCommon from "../../input";
import ButtonCommon from "../../button";

interface ImageNumberProps {
  id: string;
  onChange?: (id: string, value: number) => void;
}

const ImageNumber: React.FC<ImageNumberProps> = ({ onChange, id }) => {
  const [number, onCheck] = useState<string>("1");

  useEffect(() => {
    onCheck("1");
  }, []);
  return (
    <>
      <div className=" flex m-0 p-0 gap-0.5 mt-0.5">
        <div>
          <Input
            value={number}
            readOnly
            defaultValue={1}
            className="w-fit "
            size={"small"}
            style={{ width: "40px" }}
          />
        </div>
        <div className="flex gap-0.5">
          <Button
            onClick={() => {
              let temp = Number(number);
              onCheck((temp + 1).toString());
              onChange?.(id, temp + 1);
            }}
            className=""
            size="small"
          >
            +
          </Button>
          <Button
            onClick={() => {
              let temp = Number(number);
              if (temp > 1) {
                onCheck((temp - 1).toString());
                onChange?.(id, temp - 1);
              }
            }}
            className=""
            size="small"
          >
            -
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImageNumber;
