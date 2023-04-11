import SwitchCommon from "@/components/common/switch";
import { Form, Switch } from "antd";
import React from "react";

interface SettingAppsProps {
  onFinish?: (data: SettingOnFinish) => void;
}

const SettingApps: React.FC<SettingAppsProps> = ({ onFinish }) => {
  const [form] = Form.useForm();
  return (
    <>
      <Form
        form={form}
        onFieldsChange={() => {
          let temp = form.getFieldsValue();
          onFinish?.(temp);
        }}
        layout="vertical"
        className="grid grid-cols-4"
      >
        <SwitchCommon name="image" labal="แสดงรูปภาพ"></SwitchCommon>
        {/* <SwitchCommon name="darkMode" labal="ดาร์กโหมด"></SwitchCommon> */}
      </Form>
    </>
  );
};

export default SettingApps;
