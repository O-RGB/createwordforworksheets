import { Form, Switch } from "antd";
import React from "react";

interface SwitchCommonProps {
  labal?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SwitchCommon: React.FC<SwitchCommonProps> = ({
  labal,
  name,
  checked = undefined,
  icon,
  defaultChecked,
  disabled,
}) => {
  return (
    <>
      <Form.Item
        name={name}
        initialValue={defaultChecked}
        label={
          <>
            {icon ? (
              <div className="flex gap-2">
                <div>{icon}</div>
                <div>{labal}</div>
              </div>
            ) : (
              labal
            )}
          </>
        }
        className="m-0 p-0"
      >
        <Switch
          disabled={disabled}
          defaultChecked={defaultChecked}
          checked={checked}
        />
      </Form.Item>
    </>
  );
};

export default SwitchCommon;
