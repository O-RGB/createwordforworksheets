import { Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";

interface ImageConditionProps {
  id: string;
  onChange?: (id: string, value: ResultWorkSheetsMode) => void;
}

const ImageCondition: React.FC<ImageConditionProps> = ({ onChange, id }) => {
  const optionsWithDisabled = [
    { label: "ไฟล์", value: "File" },
    { label: "ปริ้น", value: "Print" },
    { label: "เข้าเล่ม", value: "Book" },
  ];
  const [value1, setValue1] = useState("File");
  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    setValue1(value);
    onChange?.(id, value);
  };

  return (
    <>
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange1}
        value={value1}
        buttonStyle="solid"
        optionType="button"
      />
    </>
  );
};

export default ImageCondition;
