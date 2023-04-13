import { Checkbox, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import CheckBox from "./checkbox";

interface CheckBoxCommonProps {
  name?: string;
  label?: string;
  CheckBoxGroupOptions?: CheckBoxGroupOptions[];
  imageMode?: boolean;
  form?: FormInstance<any>;
}

const CheckBoxCommon: React.FC<CheckBoxCommonProps> = ({
  name,
  label,
  CheckBoxGroupOptions,
  imageMode,
  form,
}) => {
  useEffect(() => {}, [form]);

  const [checkBoxArray, setCheckBoxArray] = useState<CheckBoxGroupOptions[]>(
    []
  );

  const createArraySelect = (value: CheckBoxGroupOptions, select: boolean) => {
    setTimeout(() => {
      let temp = checkBoxArray;
      if (select) {
        temp?.push(value);
        setCheckBoxArray(temp);
        form?.setFieldValue(name ?? "", temp);
      } else {
        let checkTemp: CheckBoxGroupOptions[] = [];
        temp?.map((data) => {
          if (data.value != value.value) {
            checkTemp.push(data);
          }
        });
        setCheckBoxArray(checkTemp);
        form?.setFieldValue(name ?? "", checkTemp);
      }
    }, 50);
  };

  return (
    <>
      <Form.Item name={name} label={label} initialValue={checkBoxArray}>
        <div className="flex flex-col gap-2">
          {CheckBoxGroupOptions?.map((x, i) => {
            return (
              <React.Fragment key={`checkBox-key-${i}`}>
                <div className="w-full">
                  <CheckBox
                    onSelect={createArraySelect}
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
