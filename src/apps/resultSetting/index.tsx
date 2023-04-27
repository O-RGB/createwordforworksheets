import SwitchCommon from "@/components/common/switch";
import TextAreaCommon from "@/components/common/textArea";
import { Form, Input } from "antd";
import React, { useEffect } from "react";

interface ResultSettingAppsProps {
  onFinish?: (data: ResultSettingOnFinish) => void;
  disabled?: boolean;
}

const ResultSettingApps: React.FC<ResultSettingAppsProps> = ({
  onFinish,
  disabled,
}) => {
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
        <SwitchCommon
          disabled={disabled}
          defaultChecked
          name="price"
          labal="ราคา"
        ></SwitchCommon>
        <SwitchCommon
          disabled={disabled}
          defaultChecked
          name="type"
          labal="ชนิดสินค้า"
        ></SwitchCommon>
        {/* <SwitchCommon
          disabled={disabled}
          defaultChecked
          name="header"
          labal="หัวข้อ"
        ></SwitchCommon> */}
        <SwitchCommon
          disabled={disabled}
          defaultChecked
          name="price_all"
          labal="ราคารวม"
        ></SwitchCommon>
        <SwitchCommon
          disabled={disabled}
          defaultChecked
          name="delivery"
          labal="ค่าส่ง"
        ></SwitchCommon>
      </Form>
    </>
  );
};

export default ResultSettingApps;
