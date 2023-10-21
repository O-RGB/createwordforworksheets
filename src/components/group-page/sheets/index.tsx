import ButtonCustom from "@/components/common/button";
import CardCustom from "@/components/common/card";
import InputCustom from "@/components/common/input";
import TextAreaCustom from "@/components/common/text-area";
import { HeadWorkSheets } from "@/model/headworksheets";
import { Form, Modal, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Router from "next/router";
import {
  PlusCircleFilled,
  FileTextOutlined,
  RollbackOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { BgCal, CalColor, colorPrimary, colorSecondary } from "@/config/color";
import { pushBookingToSheets } from "@/api/fetcher/pushBookingToSheets";
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
  const [form] = Form.useForm();
  //   if (sheets.length == 0) {
  //     return <>DATA LENGTH IS EMTPY</>;
  //   }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultBooking, setResultBooking] = useState<
    IPushBookingResult | undefined
  >(undefined);
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
    let param: string = `&type=${iItemList.type}&list=${iItemList.list.join(
      ","
    )}&price=${iItemList.price.join(",")}&facebook=${
      iItemList.facebook
    }&address=${iItemList.address}&paper=${iItemList.paper.join(
      ","
    )}&shippingcost=${iItemList.shippingcost}&actor=${getLocalInput.username}`;

    return param;
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
    if (getLocalInput.googlesheets) {
      pushBookingToSheets(getLocalInput.googlesheets, url)
        .then((data) => {
          setResultBooking(data);
        })
        .catch((e) => {
          setResultBooking({
            message: JSON.stringify(e),
            status: false,
          });
        });
    } else {
      setResultBooking({
        message: "เกิดข้อผิดพลาดก่อนส่งข้อมูล",
        status: false,
      });
    }
    setTimeout(() => {
      showModal();
    }, 100);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setResultBooking(undefined);
    }, 500);
  };

  const columns = [
    {
      title: "ชนิด",
      dataIndex: "type",
      key: "type",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "เดือนกันยายน",
      dataIndex: "list",
      key: "list",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "จำนวน",
      dataIndex: "count",
      key: "count",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "แผ่น",
      dataIndex: "paper",
      key: "paper",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "ทุน",
      dataIndex: "sum",
      key: "sum",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "ค่าส่ง",
      dataIndex: "del",
      key: "del",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "กำไร",
      dataIndex: "all",
      key: "all",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "เฟส",
      dataIndex: "face",
      key: "face",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "Print",
      dataIndex: "urlprint",
      key: "urlprint",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "แทร็ก",
      dataIndex: "kerry",
      key: "kerry",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "วันที่",
      dataIndex: "date",
      key: "date",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "ผู้เพิ่มข้อมูล",
      dataIndex: "actor",
      key: "actor",
      render: (value: string) => (
        <div className="whitespace-nowrap">{value}</div>
      ),
    },
    {
      title: "ID สำหรับ URL",
      dataIndex: "createUrl",
      key: "createUrl",
    },
    {
      title: "เข้ารหัส RowID",
      dataIndex: "encodeRowId",
      key: "encodeRowId",
    },
    {
      title: "เว็บ Tracking",
      dataIndex: "webTracking",
      key: "webTracking",
    },
  ];

  return (
    <>
      <Modal
        closeIcon={<></>}
        title="กำลังเพิ่มข้อมูล"
        open={isModalOpen}
        footer={
          <>
            <ButtonCustom
              type="primary"
              disabled={!resultBooking}
              onClick={() => {
                Router.push("/");
              }}
            >
              หน้าแรก
            </ButtonCustom>
          </>
        }
        destroyOnClose
        onOk={handleOk}
      >
        <div className="relative  ">
          {!resultBooking ? (
            <div className=" w-full h-full flex justify-center items-center">
              <div>
                <LoadingOutlined className="text-8xl" />
              </div>
            </div>
          ) : (
            <>
              {resultBooking.status ? (
                <div className="relative z-50">
                  <div className="text-green-500 ">{resultBooking.message}</div>

                  <Table
                    pagination={false}
                    className="Table-Custom overflow-auto"
                    dataSource={resultBooking.data?.list}
                    columns={columns}
                  ></Table>
                </div>
              ) : (
                <div className="text-red-500 ">{resultBooking.message}</div>
              )}
            </>
          )}
        </div>
      </Modal>
      <div
        className={` duration-300  p-2 sm:p-3 min-h-screen `}
        style={{ ...BgCal(colorSecondary) }}
      >
        <CardCustom Header={"ตรวจสอบข้อมูล"}>
          <Form
            form={form}
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
              rules={[{ required: true, message: "ไม่สามารถปล่อยว่าง" }]}
            ></InputCustom>
            <InputCustom
              name="facebook"
              required
              label="Facebook"
              rules={[{ required: true, message: "ไม่สามารถปล่อยว่าง" }]}
            ></InputCustom>
            <TextAreaCustom
              name="address"
              autoSize
              required
              label="ที่อยู่"
              rules={[{ required: true, message: "ไม่สามารถปล่อยว่าง" }]}
            ></TextAreaCustom>
            <TextAreaCustom
              name="shippingcost"
              autoSize
              required
              label="ค่าส่ง"
              initialValue={"32"}
              inputMode="numeric"
              rules={[
                { required: true, message: "ไม่สามารถปล่อยว่าง" },
                {
                  required: true,
                  message: "ตัวเลขเท่านั้น",
                  validator: (rule, value) => {
                    if (Number(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("ใส่ตัวเลขเท่านั้น");
                    }
                  },
                },
              ]}
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
                      <label
                        style={{ color: CalColor(colorPrimary) }}
                        htmlFor=""
                        className="text-sm text-slate-500"
                      >
                        * รายการที่ {i + 1}
                      </label>
                      <div
                        style={{
                          backgroundColor: CalColor(colorPrimary, 0),
                        }}
                        className="flex flex-col gap-0.5  p-0.5 rounded-lg  "
                      >
                        {x.map((y, j) => {
                          return (
                            <div
                              className="rounded-md flex flex-col md:flex-row gap-0.5 w-full   p-2  bg-white"
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
                                <div className="w-fit">
                                  <div className="pb-2 flex gap-1">
                                    <RobotOutlined className="text-xs" /> Auto
                                  </div>
                                  <div className="flex gap-1">
                                    <ButtonCustom
                                      className="w-10"
                                      onClick={() => {
                                        form.setFieldValue(
                                          y.id + "paper" + i + j,
                                          Math.ceil(Number(y.paper) / 2)
                                        );
                                      }}
                                    >
                                      <div className="text-[10px] -ml-2">
                                        หาร 2
                                      </div>
                                    </ButtonCustom>
                                    <ButtonCustom
                                      onClick={() => {
                                        form.setFieldValue(
                                          y.id + "paper" + i + j,
                                          y.paper
                                        );
                                      }}
                                      className="text-[10px] flex justify-center items-center w-1 "
                                    >
                                      <RollbackOutlined />
                                    </ButtonCustom>
                                  </div>
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
