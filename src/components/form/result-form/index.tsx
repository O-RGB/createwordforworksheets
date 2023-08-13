import InputCustom from "@/components/common/input";
import SelectCommon from "@/components/common/select";
import { Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";

interface ResultSettingFromProps {
  feeSetting?: ResltSetting;
  onChange?: (value: number) => void;
  form?: FormInstance<any>;
  setPriceAll?: number;
}

const ResultSetting: React.FC<ResultSettingFromProps> = ({
  feeSetting,
  onChange,
  setPriceAll = 4000,
  form,
}) => {
  const [onDiscountChange, setDiscountChange] = useState<boolean>(false);
  const [unit, setUnit] = useState<string>("1");
  const [olePrice, setOldPrice] = useState<number>(0);

  useEffect(() => {
    if (setPriceAll) {
      setOldPrice(setPriceAll);
    }
  }, [setPriceAll]);

  return (
    <Form
      form={form}
      onFieldsChange={(e) => {
        if (e.length > 0) {
          if (e[0].name == "discount") {
            if (e[0].value != "") {
              setDiscountChange(true);
            } else {
              setDiscountChange(false);
              setOldPrice(setPriceAll);
            }
          }
        }
      }}
      layout="vertical"
      className="  "
      style={{ width: "100%" }}
    >
      <div className="flex gap-4 w-full  items-center   ">
        <div className="flex flex-col gap-1">
          <label htmlFor="">ราคา</label>
          <div className="text-lg font-bold border border-solid p-5 rounded-md">
            {setPriceAll}฿
          </div>
        </div>

        <div
          className={`flex flex-col gap-1 justify-center  ${
            onDiscountChange ? "min-w-min " : "w-0 opacity-0 "
          } duration-300 transition-all`}
        >
          <label htmlFor="">ราคาใหม่</label>
          <div className="text-lg font-bold border border-solid p-5 rounded-md text-green-500">
            {olePrice}฿
          </div>
        </div>

        <div className="flex gap-2 w-full  ">
          <div className="w-full">
            <InputCustom
              className="w-full"
              initialValue={feeSetting?.discount}
              onChange={(e) => {
                let clone = feeSetting;
                if (clone) {
                  clone.discount = Number(e.target.value);
                }
                if (unit == "1") {
                  let newPrice = Math.ceil(
                    setPriceAll - (Number(e.target.value) / 100) * setPriceAll
                  );
                  setOldPrice(newPrice);
                  onChange?.(newPrice);
                } else if (unit == "2") {
                  let newPrice = setPriceAll - Number(e.target.value);
                  setOldPrice(newPrice);
                  onChange?.(newPrice);
                }
              }}
              placeholder="ถ้ามี"
              name="discount"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^(?!0$)(?!0\d)\d+(\.\d+)?$/),
                  message: "",
                },
                unit == "1"
                  ? {
                      required: true,
                      pattern: new RegExp(/^0*(?:[1-9][0-9]?|100)$/),
                      message: "1-100",
                    }
                  : {},
              ]}
              label="ส่วนลด"
            ></InputCustom>
          </div>
          <SelectCommon
            style={{ width: "50%" }}
            className="w-10"
            label="หน่วย"
            onChange={(e) => {
              setUnit(e);
            }}
            defaultValue={"1"}
            options={[
              {
                value: "1",
                label: "%",
              },
              {
                value: "2",
                label: "฿",
              },
            ]}
          ></SelectCommon>
        </div>
      </div>
    </Form>
  );
};

export default ResultSetting;
