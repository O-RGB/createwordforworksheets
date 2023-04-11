import { Form } from "antd";
import React from "react";
import CheckBox from "./checkbox";

interface CheckBoxCommonProps {
  name?: string;
  label?: string;
  CheckBoxGroupOptions?: CheckBoxGroupOptions[];
  imageMode?: boolean;
}

const CheckBoxCommon: React.FC<CheckBoxCommonProps> = ({
  name,
  label,
  CheckBoxGroupOptions,
  imageMode,
}) => {
  return (
    <>
      <Form.Item name={name} label={label}>
        <div className="flex flex-col gap-1">
          {CheckBoxGroupOptions?.map((x, i) => {
            return (
              <React.Fragment key={`checkBox-key-${i}`}>
                <div className="w-full">
                  <CheckBox
                    imageMode={imageMode}
                    value={x.value}
                    label={x.label}
                  ></CheckBox>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </Form.Item>
    </>
  );
};

export default CheckBoxCommon;
