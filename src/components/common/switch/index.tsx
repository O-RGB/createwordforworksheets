import { Form, Switch } from "antd";
import React from "react";

interface SwitchCommonProps {
  labal?: string;
  name?: string;
}

const SwitchCommon: React.FC<SwitchCommonProps> = ({ labal, name }) => {
  return (
    <>
      <Form.Item
        name={name}
        label={labal}
        valuePropName="checked"
        className="m-0 p-0"
      >
        <Switch />
      </Form.Item>
    </>
  );
};

export default SwitchCommon;
