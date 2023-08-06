import { AutoComplete, AutoCompleteProps } from "antd";
import React, { useEffect, useState } from "react";

interface AutoCompleteCustomProps extends AutoCompleteProps {
  option: Option[];
}

const AutoCompleteCustom: React.FC<AutoCompleteCustomProps> = ({
  option,
  ...props
}) => {
  const [fakeValue, setFakeValue] = useState<string>("");
  const [tempOption, setOption] = useState<Option[]>([]);

  const search = (search: string) => {
    if (search.length > 0) {
      let optionTemp: Option[] = [];
      option.map((data) => {
        var re = search;
        var str = data.label;
        if (str.search(re) != -1) {
          optionTemp.push(data);
        }
      });
      return optionTemp;
    } else {
      return option;
    }
  };

  useEffect(() => {
    if (option) {
      setOption(option);
    }
  }, [option]);

  return (
    <>
      <AutoComplete
        {...props}
        options={tempOption}
        value={fakeValue}
        style={{ width: "100%" }}
        onSearch={(e) => {
          setFakeValue(e);
          setOption(search(e));
        }}
        onSelect={(...select) => {
          setFakeValue(select[1].label);
          props.onSelect?.(select[0], select[1]);
        }}
        placeholder="Search"
      />
      
    </>
  );
};

export default AutoCompleteCustom;
