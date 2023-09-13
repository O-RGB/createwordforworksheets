import ButtonCustom from "@/components/common/button";
import CardCustom from "@/components/common/card";
import InputCustom from "@/components/common/input";
import TextAreaCustom from "@/components/common/text-area";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form } from "antd";
import React, { useEffect, useState } from "react";

interface SheetsGroupProps {
  sheets: IMapDataToSheets[][];
  data: IInitMainData[];
}

const SheetsGroup: React.FC<SheetsGroupProps> = ({ sheets, data }) => {
  //   if (sheets.length == 0) {
  //     return <>DATA LENGTH IS EMTPY</>;
  //   }

  const [temp, setTemp] = useState<IInitMainData[][] | undefined>(undefined);
  const initData = async () => {
    let test: IInitMainData[][] = [];
    for (let i = 0; i < sheets.length; i++) {
      let test2: IInitMainData[] = [];
      for (let j = 0; j < sheets[i].length; j++) {
        let search = data.find((x) => x.id == sheets[i][j].id);
        if (search) {
          console.log(search.name);
          test2.push({
            id: search.id,
            name:
              search.name +
              (sheets[i][j].mode == "book"
                ? " (เข้าเล่ม หน้าหลัง)"
                : sheets[i][j].mode == "print"
                ? ""
                : ""),
            price: search.price,
            priceOfStr:
              sheets[i][j].mode == "book"
                ? (search.price as WorkSheetsDetailPrice).book?.toString()
                : sheets[i][j].mode == "print"
                ? (search.price as WorkSheetsDetailPrice).print?.toString()
                : "",
          });
        }
      }

      test.push(test2);
    }
    console.log(test);
    return test;
  };

  useEffect(() => {
    initData().then((x) => {
      setTimeout(() => {
        setTemp(x);
      }, 10);
    });
  }, []);
  if (!temp) {
    return <></>;
  }
  return (
    <>
      <div className={` duration-300  p-2 sm:p-3  `}>
        <CardCustom Header={"ตรวจสอบข้อมูล"}>
          <Form layout="vertical" className="flex flex-col gap-3">
            <InputCustom
              required
              label="ชนิด"
              disabled
              value={"เอกสาร"}
            ></InputCustom>
            <InputCustom required label="Facebook"></InputCustom>
            <TextAreaCustom autoSize required label="ที่อยู่"></TextAreaCustom>

            <div className="py-3">
              <div className="pb-1.5">
                <label htmlFor="" className="text-[14px] ">
                  Preview
                </label>
              </div>
              {/* <table>
                <thead> */}
              <div className="flex flex-col gap-1">
                {temp.map((x, i) => {
                  return (
                    <div className="" key={`sheets-i-${i}`}>
                      {x.map((y, j) => {
                        return (
                          <div
                            className="rounded-md flex gap-1 w-full"
                            key={`sheets-j-${i}-${j}`}
                          >
                            <div className="w-[100%]">
                              <InputCustom
                                className="w-full"
                                name={y.id + "input"}
                                initialValue={y.name}
                              ></InputCustom>
                            </div>

                            <div className="w-[20%]">
                              <InputCustom
                                className="w-full"
                                name={y.id + "price"}
                                initialValue={y.priceOfStr}
                              ></InputCustom>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              {/* </thead>
              </table> */}
              {/* <div>เชาว์ปัญญาอนุบาล 1 (เข้าเล่ม หน้าหลัง)</div>
            <div>somo</div>
            <div>
              อชิรญา มิตรชัย 9/149 หมู่บ้านลลิลกรีนวิลล์ ถ.สุขาภิบาล5 ซ.72
              แขวงออเงิน เขตสายไหม กรุงเทพฯ 10220 Tel.081-599-8990
            </div> */}
            </div>

            <div className="flex justify-center items-center">
              <ButtonCustom type="primary">
                บันทึกเข้า Google Sheets
              </ButtonCustom>
            </div>
          </Form>
          {/* <iframe
            className="rounded-md overflow-hidden"
            width={"100%"}
            height={"100%"}
            src="https://script.google.com/macros/s/AKfycbw8KEnR2IwYQ6sScXfZ0kVfmO69aS3bKVTYuuOf7Esxx9ffNCtNizqzB2w9N2wEC9iQ/exec"
            frameBorder="0"
          ></iframe> */}
        </CardCustom>
      </div>
    </>
  );
};

export default SheetsGroup;
