import { Form, Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";

interface ModeSettingProps {
  onFinish?: (data: ResultModeOnFinish) => void;
  disabled?: boolean;
}

const ModeSetting: React.FC<ModeSettingProps> = ({ onFinish, disabled }) => {
  const [form] = Form.useForm();

  const [value, setValue] = useState(1);

  return (
    <>
      <Form
        form={form}
        onFieldsChange={(e) => {
          let temp = form.getFieldsValue();
          onFinish?.(temp);
        }}
        layout="vertical"
        className="w-full"
      >
        <Form.Item name={"mode"} initialValue={1} className="m-0 p-0">
          <Radio.Group
            className="grid gap-2 grid-cols-2 md:grid-cols-4    w-full"
            value={value}
          >
            <Radio className="px-3" value={1}>
              💾 ไฟล์
            </Radio>
            <Radio className="px-3" value={2}>
              📘 ปริ้น
            </Radio>
            <Radio className="px-3" value={3}>
              📕 เข้าเล่ม
            </Radio>
            <Radio className="px-3" value={4}>
              ผสม
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default ModeSetting;
