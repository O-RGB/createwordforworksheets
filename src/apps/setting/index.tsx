import InputCommon from "@/components/common/input";
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
      
      >
        <div className="flex flex-col gap-3 w-full">
          <div>
            <SwitchCommon name="image" labal="แสดงรูปภาพ"></SwitchCommon>
          </div>
          <div className="flex gap-3 w-full">
            <InputCommon name="sunk" label="ค่าส่ง"></InputCommon>
            <InputCommon name="sunk" label="บวกเพิ่มเข้าเล่ม"></InputCommon>
          </div>
        </div>
        {/* <SwitchCommon name="darkMode" labal="ดาร์กโหมด"></SwitchCommon> */}
      </Form>
    </>
  );
};

export default SettingApps;
