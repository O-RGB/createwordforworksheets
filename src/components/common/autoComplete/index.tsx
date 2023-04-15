import { AutoComplete, Form } from "antd";
import React from "react";

interface AutoCompleteProps {
  name?: string;
  label?: string;
  placeholder?: string;
  options?: any[];
  onSelect?: (e: any) => void;
  onSearch?: (text: string) => void;
}

const AutoCompleteCommon: React.FC<AutoCompleteProps> = ({
  name,
  label,
  options,
  onSelect,
  placeholder,
  onSearch,
}) => {
  return (
    <>
      <Form.Item className="m-0 p-0 w-full" name={name} label={label}>
        <AutoComplete
          options={options}
          style={{ width: "100%" }}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder={placeholder}
        />
      </Form.Item>
    </>
  );
};

export default AutoCompleteCommon;
