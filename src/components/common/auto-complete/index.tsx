import { CalColor, colorSecondary } from "@/config/color";
import { AutoComplete, AutoCompleteProps } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface AutoCompleteCustomProps extends AutoCompleteProps {
  option: Option[];
}

const AutoCompleteCustom: React.FC<AutoCompleteCustomProps> = ({
  option,
  ...props
}) => {
  const [fakeValue, setFakeValue] = useState<string>("");
  const [tempOption, setOption] = useState<Option[]>([]);
  const ref: any = useRef(null);

  const search = (search: string) => {
    if (search.length > 0) {
      let optionTemp: Option[] = [];
      option.map((data) => {
        var re = search;
        var str = data.label;
        if (typeof str === "string") {
          if (str.search(re) != -1) {
            optionTemp.push(data);
          }
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
        ref={ref}
        {...props}
        options={tempOption}
        value={fakeValue}
        style={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
        }}
        onSearch={(e) => {
          setFakeValue(e);
          setOption(search(e));
        }}
        onSelect={(...select) => {
          ref?.current.blur();
          if (typeof select[1].label === "string") {
            setFakeValue(select[1].label);
            props.onSelect?.(select[0], select[1]);
          }
        }}
        placeholder="Search"
      />
    </>
  );
};

export default AutoCompleteCustom;
