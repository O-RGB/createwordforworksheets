import InputCommon from "@/components/common/input";
import SwitchCommon from "@/components/common/switch";
import { BookServiceContext } from "@/context/bookService";
import { DeliveryFeeContext } from "@/context/deliveryFee";
import { Form, Switch } from "antd";
import React, { useContext, useEffect } from "react";
import { BsImage } from "react-icons/bs";
import { RxMixerHorizontal } from "react-icons/rx";

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
          <div className="flex gap-6">
            <SwitchCommon
              icon={<BsImage className="mt-1" />}
              name="image"
              labal="แสดงรูปภาพ"
            ></SwitchCommon>
            <SwitchCommon
              icon={<RxMixerHorizontal className="mt-1" />}
              name="mixData"
              labal="เลือกแบบผสม"
            ></SwitchCommon>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SettingApps;
