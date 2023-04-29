import { Checkbox, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import ChlidCheckBox from "./chlid-checkbox";

interface MainCheckboxProps {
  name: string;
  title: string;
  form: FormInstance<any>;
  initialValue: checkBoxSelect[] | undefined;
}

const MainCheckBox: React.FC<MainCheckboxProps> = ({
  name,
  title,
  initialValue,
  form,
}) => {
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (initialValue) {
      if (initialValue.length > 0) {
        setCheck(true);
        form.resetFields([`${name}-value`]);
        form.setFieldValue(`${name}-value`, initialValue);
      }
    }
  }, []);
  return (
    <>
      <Form.Item
        initialValue={
          initialValue ? (initialValue.length > 0 ? true : false) : false
        }
        valuePropName="checked"
        name={name}
        className="w-full p-0 m-0"
      >
        <Checkbox
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
          className="w-full py-2 !m-0"
        >
          {title}
        </Checkbox>
      </Form.Item>

      {check && (
        <Form.Item className="m-0 p-0" name={`${name}-value`}>
          <ChlidCheckBox name={`${name}-value`} form={form}></ChlidCheckBox>
        </Form.Item>
      )}
    </>
  );
};

export default MainCheckBox;
