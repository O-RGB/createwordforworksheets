import InputCommon from "@/components/common/input";
import SwitchCommon from "@/components/common/switch";
import { BookServiceContext } from "@/context/bookService";
import { DeliveryFeeContext } from "@/context/deliveryFee";
import { Form, Switch, Tooltip } from "antd";
import React, { useContext, useEffect } from "react";
import { BookOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { TbTruckDelivery } from "react-icons/tb";
import { BiBook } from "react-icons/bi";

interface InputSettingAppsProps {
  onFinish?: (data: InputSettingOnFinish) => void;
}

const InputSettingApps: React.FC<InputSettingAppsProps> = ({ onFinish }) => {
  // const { deliveryFee } = useContext(DeliveryFeeContext);
  // const { bookPrice } = useContext(BookServiceContext);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue("delivery_fee", "40");
    form.setFieldValue("book_price", "40");
  }, []);
  return (
    <>
      <Form
        form={form}
        onFieldsChange={(e) => {
          let temp = form.getFieldsValue();
          onFinish?.(temp);
        }}
        layout="vertical"
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="w-full">
            <InputCommon
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[0-9.]*$/),
                  message: "ตัวเลขเท่านั้น",
                },
                {
                  required: true,
                  message: "'ค่าส่ง' ไม่สามารถว่างไว้",
                },
              ]}
              prefix={
                <>
                  <div className="w-5 -mt-0.5 text-lg text-gray-500 select-none">
                    ฿
                  </div>
                </>
              }
              suffix={
                <Tooltip title="ค่าส่ง (ไม่มีระบบคำนวนอัตโนมัติ)">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              name="delivery_fee"
              icon={<TbTruckDelivery className="text-lg mt-0.5" />}
              label="ค่าส่ง"
            ></InputCommon>
          </div>
          <InputCommon
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[0-9.]*$/),
                message: "ตัวเลขเท่านั้น",
              },
              {
                required: true,
                message: "'บวกเพิ่มเข้าเล่ม' ไม่สามารถว่างไว้",
              },
            ]}
            icon={<BiBook className="text-lg mt-0.5" />}
            prefix={
              <>
                <div className="w-5 -mt-0.5 text-lg text-gray-500 select-none">
                  ฿
                </div>
              </>
            }
            suffix={
              <Tooltip title="ค่าเข้าเล่มให้ (ไม่มีระบบคำนวนอัตโนมัติ)">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
            name="book_price"
            label="บวกเพิ่มเข้าเล่ม"
          ></InputCommon>
        </div>
      </Form>
    </>
  );
};

export default InputSettingApps;
