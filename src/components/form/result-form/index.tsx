import ButtonCustom from "@/components/common/button";
import InputCustom from "@/components/common/input";
import SelectCommon from "@/components/common/select";
import { Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";

interface ResultSettingFromProps {
  feeSetting?: ResltSetting;
  onChange?: (value: number) => void;
  cancel?: () => void;

  setPriceAll?: number;
}

const ResultSetting: React.FC<ResultSettingFromProps> = ({
  feeSetting,
  cancel,
  onChange,
  setPriceAll = 4000,
}) => {
  const [onDiscountChange, setDiscountChange] = useState<boolean>(false);
  const [onDiscountChangeForHidden, setDiscountChangeForHidden] =
    useState<boolean>(false);
  const [unit, setUnit] = useState<string>("1");
  const [olePrice, setOldPrice] = useState<number>(0);

  const [form] = Form.useForm();

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
              setDiscountChangeForHidden(true);
              setDiscountChange(true);
            } else {
              setDiscountChange(false);
              setTimeout(() => {
                setDiscountChangeForHidden(false);
              }, 300);
              setOldPrice(setPriceAll);
            }
          }
        }
      }}
      layout="vertical"
      className="  "
      style={{ width: "100%" }}
    >
      <div className="flex flex-col md:flex-row gap-4 w-full  md:items-center   ">
        <div className="flex gap-2  w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <label htmlFor="">ราคา</label>
            <div className="text-lg font-bold border border-solid p-5 rounded-md  w-full md:w-auto  ">
              {setPriceAll}฿
            </div>
          </div>

          {onDiscountChangeForHidden && (
            <div
              className={`flex flex-col gap-1 justify-center w-full md:w-auto ${
                onDiscountChange ? "min-w-min " : "w-0 opacity-0 "
              } duration-300 transition-all`}
            >
              <label htmlFor="" className="whitespace-nowrap">
                ราคาใหม่
              </label>
              <div className="text-lg font-bold border border-solid p-5 rounded-md text-green-500">
                {olePrice}฿
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full  ">
          <div className="w-full">
            <InputCustom
              className="w-full"
              initialValue={feeSetting?.discount}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  let clone = feeSetting;
                  if (clone) {
                    clone.discount = Number(e.target.value);
                  }
                  if (unit == "1") {
                    let newPrice = Math.ceil(
                      setPriceAll - (Number(e.target.value) / 100) * setPriceAll
                    );
                    setOldPrice(newPrice);
                    // onChange?.(newPrice);
                  } else if (unit == "2") {
                    let newPrice = setPriceAll - Number(e.target.value);
                    setOldPrice(newPrice);
                    // onChange?.(newPrice);
                  }
                }
              }}
              placeholder="ถ้ามี"
              name="discount"
              rules={[
                {
                  //   required: true,
                  pattern: new RegExp(/^(?!0$)(?!0\d)\d+(\.\d+)?$/),
                  message: "",
                },
                unit == "1"
                  ? {
                      //   required: true,
                      pattern: new RegExp(/^0*(?:[1-9][0-9]?|100)$/),
                      message: "1-100",
                    }
                  : {},
              ]}
              label="ส่วนลด"
            ></InputCustom>
          </div>
          <div className="w-24">
            <SelectCommon
              // style={{ width: "50%" }}
              className="w-10"
              label="หน่วย"
              onChange={(e) => {
                setUnit(e);
                setDiscountChange(false);

                setTimeout(() => {
                  setDiscountChangeForHidden(false);
                }, 300);

                form.resetFields(["discount"]);
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
      </div>
      <div className="flex gap-2 pt-4">
        <ButtonCustom
          disabled={!onDiscountChange}
          onClick={() => {
            let input = form.getFieldValue("discount");
            if (input.length > 0) {
              let clone = feeSetting;
              if (clone) {
                clone.discount = Number(input);
              }
              if (unit == "1") {
                let newPrice = Math.ceil(
                  setPriceAll - (Number(input) / 100) * setPriceAll
                );
                setOldPrice(newPrice);
                onChange?.(newPrice);
              } else if (unit == "2") {
                let newPrice = setPriceAll - Number(input);
                setOldPrice(newPrice);
                onChange?.(newPrice);
              }
            }
          }}
        >
          เพิ่มส่วนลด
        </ButtonCustom>
        <ButtonCustom
          disabled={!onDiscountChange}
          onClick={() => {
            cancel?.();
            setDiscountChange(false);
            setTimeout(() => {
              setDiscountChangeForHidden(false);
            }, 300);
            setUnit("1");
            setOldPrice(0);
            form.resetFields();
          }}
        >
          ลบออก
        </ButtonCustom>
      </div>
    </Form>
  );
};

export default ResultSetting;
