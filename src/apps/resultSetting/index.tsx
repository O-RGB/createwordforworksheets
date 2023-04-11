import SwitchCommon from "@/components/common/switch";
import TextAreaCommon from "@/components/common/textArea";
import { Form, Input } from "antd";
import React from "react";

interface ResultSettingAppsProps {
  onFinish?: (data: SettingOnFinish) => void;
}

const ResultSettingApps: React.FC<ResultSettingAppsProps> = ({ onFinish }) => {
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
        <SwitchCommon checked name="price" labal="ราคา"></SwitchCommon>
        <SwitchCommon checked name="price" labal="หัวข้อ"></SwitchCommon>
        <SwitchCommon checked name="price" labal="ราคารวม"></SwitchCommon>
      </Form>
    </>
  );
};

export default ResultSettingApps;
