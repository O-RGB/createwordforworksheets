import InputCommon from "@/components/common/input";
import SwitchCommon from "@/components/common/switch";
import { BookServiceContext } from "@/context/bookService";
import { DeliveryFeeContext } from "@/context/deliveryFee";
import { Form, Switch } from "antd";
import React, { useContext, useEffect } from "react";

interface SettingAppsProps {
  onFinish?: (data: SettingOnFinish) => void;
}

const SettingApps: React.FC<SettingAppsProps> = ({ onFinish }) => {
  const { deliveryFee } = useContext(DeliveryFeeContext);
  const { bookPrice } = useContext(BookServiceContext);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue("delivery_fee", deliveryFee.toString());
    form.setFieldValue("book_price", bookPrice.toString());
  }, []);
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
            <InputCommon name="delivery_fee" label="ค่าส่ง"></InputCommon>
            <InputCommon
              name="book_price"
              label="บวกเพิ่มเข้าเล่ม"
            ></InputCommon>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SettingApps;
