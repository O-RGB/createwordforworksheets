import { Cascader, Form } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React from "react";

interface CascaderCommonProps {
  options: Option[];
  onChange?: (value: any) => void;
  name?: string;
  label?: string;
}

const CascaderCommon: React.FC<CascaderCommonProps> = ({
  options,
  onChange,
  name,
  label,
}) => {
  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );
  return (
    <>
      <Form.Item name={name} label={label} className="m-0 p-0 w-full">
        <Cascader
          rootClassName=""
          className="w-full"
          options={options}
          onChange={onChange}
          placeholder="ค้นหา"
          showSearch={{ filter }}
          onSearch={(value) => console.log(value)}
        />
      </Form.Item>
    </>
  );
};

export default CascaderCommon;
