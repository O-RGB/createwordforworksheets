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

  const [temp, setTemp] = useState<IMapDataToSheets[][] | undefined>(undefined);
  const initData = async () => {
    let test: IMapDataToSheets[][] = [];
    for (let i = 0; i < sheets.length; i++) {
      let test2: IMapDataToSheets[] = [];
      for (let j = 0; j < sheets[i].length; j++) {
        let search = data.find((x) => x.id == sheets[i][j].id);
        if (search) {
          test2.push({
            id: search.name,
            mode: sheets[i][j].mode,
          });
        }
      }
      test.push(test2);
    }
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
          </Form>
          <div className="py-3">
            <div className="pb-1.5">
              <label htmlFor="" className="text-[14px] ">
                Preview
              </label>
            </div>
            <table>
              {temp.map((x, i) => {
                return (
                  <React.Fragment key={`sheets-i-${i}`}>
                    {x.map((y, j) => {
                      return (
                        <tr className="rounded-md">
                          <td key={`sheets-j-${i}-${j}`} className="w-full">
                            {y.id + " "}
                            {y.mode == "book"
                              ? "(เข้าเล่ม หน้าหลัง)"
                              : y.mode == "print"
                              ? ""
                              : ""}
                          </td>
                          <td>{y.mode}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </table>
            {/* <div>เชาว์ปัญญาอนุบาล 1 (เข้าเล่ม หน้าหลัง)</div>
            <div>somo</div>
            <div>
              อชิรญา มิตรชัย 9/149 หมู่บ้านลลิลกรีนวิลล์ ถ.สุขาภิบาล5 ซ.72
              แขวงออเงิน เขตสายไหม กรุงเทพฯ 10220 Tel.081-599-8990
            </div> */}
          </div>

          <div className="flex justify-center items-center">
            <ButtonCustom type="primary">บันทึกเข้า Google Sheets</ButtonCustom>
          </div>

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
