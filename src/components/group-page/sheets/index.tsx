import ButtonCustom from "@/components/common/button";
import CardCustom from "@/components/common/card";
import InputCustom from "@/components/common/input";
import TextAreaCustom from "@/components/common/text-area";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Router from "next/router";
import { PlusCircleFilled, FileTextOutlined } from "@ant-design/icons";
interface SheetsGroupProps {
  sheets: IMapDataToSheets[][];
  data: IInitMainData[];
  getLocalInput: IUserInput;
}

const SheetsGroup: React.FC<SheetsGroupProps> = ({
  sheets,
  data,
  getLocalInput,
}) => {
  //   if (sheets.length == 0) {
  //     return <>DATA LENGTH IS EMTPY</>;
  //   }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlFame, setURLFame] = useState<string | undefined>(undefined);
  const [temp, setTemp] = useState<IInitMainData[][] | undefined>(undefined);
  const initData = async () => {
    let test: IInitMainData[][] = [];
    for (let i = 0; i < sheets.length; i++) {
      let test2: IInitMainData[] = [];
      for (let j = 0; j < sheets[i].length; j++) {
        let search = data.find((x) => x.id == sheets[i][j].id);

        if (search) {
          let addName = "";
          let price = "";
          if (sheets[i][j].mode == "book") {
            addName = " (เข้าเล่ม หน้าหลัง)";
            let bookprice = (search.price as WorkSheetsDetailPrice).book;
            if (bookprice) {
              price = bookprice.toString();
            }
          } else if (sheets[i][j].mode == "print") {
            addName = "";
            let bookprice = (search.price as WorkSheetsDetailPrice).print;
            if (bookprice) {
              price = bookprice.toString();
            }
          }

          test2.push({
            id: search.id,
            name: search.name + addName,
            price: search.price,
            priceOfStr: price,
            paper: search.paper,
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

  const createURLForSheets = (item: IPreparDataFormSheets) => {
    // type
    // list
    // price
    // facebook
    // address

    let type = item.type;
    let list: string[] = [];
    let price: string[] = [];
    let facebook: string = item.facebook;
    let address: string = item.address;
    let shippingcost: string = item.shippingcost;
    let paper: string[] = [];
    item.items?.map((x) => {
      list.push(x.name);
      price.push(x.price);
      paper.push(x.paper);
    });

    let data: IItemsToURL = {
      address,
      facebook,
      list,
      price,
      type,
      shippingcost,
      paper,
    };

    return data;
  };

  const createURLStr = (iItemList: IItemsToURL) => {
    let sheets: string = getLocalInput.googlesheets ?? "";
    let param: string = `?page=index&type=${
      iItemList.type
    }&list=${iItemList.list.join(",")}&price=${iItemList.price.join(
      ","
    )}&facebook=${iItemList.facebook}&address=${
      iItemList.address
    }&paper=${iItemList.paper.join(",")}&shippingcost=${
      iItemList.shippingcost
    }&actor=${getLocalInput.username}`;

    return sheets + param;
  };

  const perparData = (output: IPreparDataFormSheets | any) => {
    let item: IPreparItemsSheets[] = [];
    temp.map((x, i) => {
      x.map((y, j) => {
        item.push({
          name: output[y.id + "input" + i + j],
          price: output[y.id + "price" + i + j],
          paper: output[y.id + "paper" + i + j],
        });
      });
    });

    (output as IPreparDataFormSheets).items = item;
    let iItemList = createURLForSheets(output);
    let url = createURLStr(iItemList);
    setTimeout(() => {
      console.log(url);
      setURLFame(url);
      showModal();
    }, 100);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setURLFame(undefined);
    }, 500);
  };

  return (
    <>
      <Modal
        title="กำลังเพิ่มข้อมูล"
        open={isModalOpen}
        footer={
          <>
            <ButtonCustom
              type="primary"
              onClick={() => {
                Router.push("/");
              }}
            >
              OK
            </ButtonCustom>
          </>
        }
        destroyOnClose
        onOk={handleOk}
      >
        <div className="relative">
          <div className="z-20 absolute w-full h-full flex justify-center items-center">
            <div>
              <LoadingOutlined className="text-8xl" />
            </div>
          </div>
          <div className="relative z-50">
            {urlFame && (
              <iframe
                id="myIframe"
                className="rounded-md overflow-hidden h-[50vh] z-50"
                width={"100%"}
                height={"100%"}
                src={urlFame}
              ></iframe>
            )}
          </div>
        </div>
      </Modal>
      <div className={` duration-300  p-2 sm:p-3  `}>
        <CardCustom Header={"ตรวจสอบข้อมูล"}>
          <Form
            layout="vertical"
            className="flex flex-col gap-3"
            onFinish={perparData}
          >
            <InputCustom
              required
              label="ชนิด"
              name="type"
              disabled
              initialValue={"เอกสาร"}
              value={"เอกสาร"}
            ></InputCustom>
            <InputCustom
              name="facebook"
              required
              label="Facebook"
            ></InputCustom>
            <TextAreaCustom
              name="address"
              autoSize
              required
              label="ที่อยู่"
            ></TextAreaCustom>
            <TextAreaCustom
              name="shippingcost"
              autoSize
              required
              label="ค่าส่ง"
              initialValue={"32"}
            ></TextAreaCustom>

            <div className="py-3">
              <div className="pb-1.5">
                <label htmlFor="" className="text-[14px] ">
                  Preview
                </label>
              </div>
              {/* <table>
                <thead> */}
              <div className="flex flex-col gap-2">
                {temp.map((x, i) => {
                  return (
                    <div key={`sheets-i-${i}`} className="">
                      <label htmlFor="" className="text-sm text-slate-500">
                        * รายการเดียวกัน {i + 1} (อาจจหลายจำนวน)
                      </label>
                      <div className="flex flex-col gap-2 border border-solid p-2 rounded-md bg-slate-100">
                        {x.map((y, j) => {
                          return (
                            <div
                              className="rounded-md flex flex-col md:flex-row gap-2 w-full border border-solid p-2  bg-white"
                              key={`sheets-j-${i}-${j}`}
                            >
                              <div className="w-[100%]">
                                <InputCustom
                                  label={
                                    <div className=" flex gap-1 justify-center items-center">
                                      <PlusCircleFilled className="text-gray-500 text-xs" />
                                      <div>งาน</div>
                                    </div>
                                  }
                                  required
                                  rules={[
                                    {
                                      message: "ห้ามปล่อยว่าง",
                                      required: true,
                                    },
                                  ]}
                                  className="w-full"
                                  name={y.id + "input" + i + j}
                                  initialValue={y.name}
                                ></InputCustom>
                              </div>

                              <div className="flex  flex-row  gap-2 w-full md:w-[40%]">
                                <div className="w-full">
                                  <InputCustom
                                    required
                                    rules={[
                                      {
                                        message: "ห้ามปล่อยว่าง",
                                        required: true,
                                      },
                                    ]}
                                    label={
                                      <div className=" flex gap-1 justify-center items-center">
                                        <div className="text-gray-500 text-xs">
                                          ฿
                                        </div>
                                        <div>ราคา</div>
                                      </div>
                                    }
                                    className="w-full"
                                    name={y.id + "price" + i + j}
                                    initialValue={y.priceOfStr}
                                  ></InputCustom>
                                </div>
                                <div className="w-full">
                                  <InputCustom
                                    required
                                    rules={[
                                      {
                                        message: "ห้ามปล่อยว่าง",
                                        required: true,
                                      },
                                    ]}
                                    label={
                                      <div className=" flex gap-1 justify-center items-center">
                                        <FileTextOutlined className="text-gray-500 text-xs" />
                                        <div>แผ่น</div>
                                      </div>
                                    }
                                    className="w-full"
                                    name={y.id + "paper" + i + j}
                                    initialValue={y.paper}
                                  ></InputCustom>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <ButtonCustom type="primary" htmlType="submit">
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
