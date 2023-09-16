import InputCustom from "@/components/common/input";
import { Form, FormInstance } from "antd";
import React from "react";

interface FeeFromProps {
  feeSetting?: FeeSetting;
  onChange?: (value: string, key: InputSetting) => void;
  form?: FormInstance<any>;
}

const FeeFrom: React.FC<FeeFromProps> = ({ feeSetting, onChange, form }) => {
  return (
    <Form form={form} layout="vertical" className="grid grid-cols-4 gap-2 ">
      <InputCustom
        initialValue={feeSetting?.delivery_fee}
        onChange={(e) => {
          let clone = feeSetting;
          if (clone) {
            clone.delivery_fee = Number(e.target.value);
            //   clone.book_price = feeSetting.book_price;
            //   onChange?.(clone);
          }
          onChange?.(e.target.value, "delivery_fee");
        }}
        required
        name="deliveryFee"
        rules={[{ message: "'ค่าส่ง' is required", required: true }]}
        label="ค่าส่ง"
        inputMode="numeric"
      ></InputCustom>
      {/* <InputCustom
        initialValue={feeSetting?.book_price}
        onChange={(e) => {
          let clone = feeSetting;
          if (clone) {
            clone.book_price = Number(e.target.value);
            //   clone.delivery_fee = feeSetting.delivery_fee;
            //   onChange?.(clone);
          }
          onChange?.(e.target.value, "book_price");
        }}
        required
        name="book"
        rules={[{ message: "'บวกเข้าเล่ม' is required", required: true }]}
        label="บวกค่าส่ง"
      ></InputCustom> */}
    </Form>
  );
};

export default FeeFrom;
