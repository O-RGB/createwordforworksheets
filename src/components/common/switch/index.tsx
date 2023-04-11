import { Form, Switch } from "antd";
import React from "react";

interface SwitchCommonProps {
  labal?: string;
  name?: string;
  checked?: boolean;
}

const SwitchCommon: React.FC<SwitchCommonProps> = ({
  labal,
  name,
  checked = undefined,
}) => {
  return (
    <>
      <Form.Item name={name} label={labal} className="m-0 p-0">
        <Switch checked={checked} />
      </Form.Item>
    </>
  );
};

export default SwitchCommon;
