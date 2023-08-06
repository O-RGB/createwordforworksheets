import { AutoComplete, AutoCompleteProps } from "antd";
import React from "react";

interface AutoCompleteCustomProps extends AutoCompleteProps {
  option: Option[];
}

const AutoCompleteCustom: React.FC<AutoCompleteCustomProps> = ({
  option,
  ...props
}) => {
  return (
    <>
      <AutoComplete
        {...props}
        options={option}
        style={{ width: "100%" }}
        placeholder="Search"
      />
    </>
  );
};

export default AutoCompleteCustom;
