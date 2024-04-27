import InputCustom from "@/components/common/input";
import { menuDetailEmo } from "@/function/result/finalToCustomer";
import React, { useState } from "react";

interface InputPriceProps {
  count: number;
  price: number;
  name: string;
}

const InputPrice: React.FC<InputPriceProps> = ({ count, price, name }) => {
  const [onCountTwoItem, setCountTwoItem] = useState<number>(price);

  return (
    <>
      <div>
        <div className="flex gap-3 justify-center items-center w-fit">
          <div className="w-20 whitespace-nowrap">
            {menuDetailEmo} {count > 1 ? "ชุดละ" : "ราคา"}
          </div>
          <InputCustom
            rules={[
              {
                validator(rule, value, callback) {
                  if (Number(value)) {
                    return Promise.resolve();
                  } else {
                    if (value === 0 || value === "0") {
                      return Promise.reject(
                        <div>
                          <div>ไม่สามารถใส่ 0</div>
                        </div>
                      );
                    }
                    return Promise.reject("ตัวเลขเท่านั้น");
                  }
                },
              },
            ]}
            inputMode="numeric"
            initialValue={Number(price)}
            onChange={(e) => {
              setCountTwoItem(Number(e.target.value));
            }}
            style={{ width: "20%" }}
            className="w-10"
            name={name}
          ></InputCustom>
          <div>บาท</div>
        </div>
      </div>
      {count > 1 && (
        <div className="flex flex-col gap-1 w-fit">
          <div>
            {menuDetailEmo} ราคา {onCountTwoItem * count} บาท
          </div>
        </div>
      )}
    </>
  );
};

export default InputPrice;
