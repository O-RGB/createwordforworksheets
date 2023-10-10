import ButtonCustom from "@/components/common/button";
import CardCustom from "@/components/common/card";
import InputCustom from "@/components/common/input";
import { BgCal, colorSecondary } from "@/config/color";
import { Form, Modal } from "antd";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import SentMail from "./sentMail";
import { getLimitOfDay } from "@/api/fetcher/getLimitOfDay";
import { LoadingOutlined } from "@ant-design/icons";
interface SentEmailGroupProps {
  sheets: IMapDataToSheets[][];
  getMockup?: WorksheetsModelInput[];
  getLocalInput: IUserInput;
}

const SentEmailGroup: React.FC<SentEmailGroupProps> = ({
  sheets,
  getMockup,
  getLocalInput,
}) => {
  const form = Form.useForm();
  const [compoSent, setCompoSent] = useState<ISenttEmailCompo[] | undefined>(
    undefined
  );
  const [countLoad, setCountLoad] = useState<number>(0);

  const [countCompo, setCountCompo] = useState<number>(0);

  const [getlimit, setLimit] = useState<number | undefined>(undefined);
  const getLimit = (url: string) => {
    getLimitOfDay(url).then((data) => {
      if (data) {
        setLimit(100 - data.count);
      }
    });
  };

  useEffect(() => {
    if (getMockup) {
      setCountLoad(0);
      setCountCompo(getMockup.length);
      if (!getlimit) {
        if (getLocalInput.googlesheets) {
          getLimit(getLocalInput.googlesheets);
        }
      }
    }
  }, [sheets, getMockup]);

  const createIFileGoogleDriveInput = (email: string) => {
    let items: ISenttEmailCompo[] = [];
    getMockup?.map((main) => {
      if (main.filename && main.root) {
        items.push({
          workUI: main,
          url: createURLStr({
            email: email,
            fileNames: main.filename,
            path: main.root,
            subject: main.name,
          }),
          objWorkinput: {
            email: email,
            fileNames: main.filename,
            path: main.root,
            subject: main.name,
          },
        });
      }
    });

    return items;
  };

  const onFinish = (e: { email: string }) => {
    let createURL: ISenttEmailCompo[] = [];
    createURL = createIFileGoogleDriveInput(e.email);
    setCompoSent(createURL);
    setCountLoad(createURL.length);
    setTimeout(() => {
      showModal();
    }, 100);
  };

  const createURLStr = (iItemList: IFileGoogleDriveInput) => {
    let sheets: string = getLocalInput.googlesheets ?? "";
    let param: string = `?page=email&path=${iItemList.path}&email=${
      iItemList.email
    }&fileNames=${iItemList.fileNames.join(",")}&subject=${iItemList.subject}`;
    return sheets + param;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="กำลังส่ง"
        open={isModalOpen}
        closable={false}
        closeIcon={false}
        footer={
          <>
            <ButtonCustom
              type="primary"
              disabled={countCompo == countLoad}
              onClick={() => {
                // handleOk();
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
        <div className="flex flex-col gap-2">
          {compoSent?.map((data, index) => {
            return (
              <div key={`copo-sent-${index}`}>
                <SentMail
                  onLoadFinish={() => {
                    let count = countLoad;
                    count = count + 1;
                    setCountLoad(count);
                  }}
                  compoSent={data}
                  filename={data.objWorkinput.fileNames}
                  name={data.workUI.name}
                  email={data.objWorkinput.email}
                ></SentMail>
              </div>
            );
          })}
        </div>
      </Modal>

      <div
        className={` duration-300  p-2 sm:p-3 min-h-screen `}
        style={{ ...BgCal(colorSecondary) }}
      >
        <CardCustom Header={"ตรวจสอบข้อมูล"} className="flex flex-col gap-2">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="flex flex-col gap-2"
          >
            <div className="flex gap-1 items-center">
              ลิมิตส่งเมลวันนี้:
              {getlimit ? (
                <div
                  className={`py-2 text-sm font-bold ${
                    getlimit >= 100 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {getlimit}/100
                </div>
              ) : (
                <>
                  <LoadingOutlined />
                </>
              )}
            </div>
            <InputCustom
              rules={[
                {
                  message: "ห้ามปล่อยว่าง",
                  required: true,
                },
                {
                  message: "อีเมลไม่ถูกต้อง",
                  required: true,
                  type: "email",
                },
              ]}
              name="email"
              label={"ผู้รับ"}
            ></InputCustom>

            {getMockup?.map((data, i) => {
              if (data.filename && data.root) {
                return (
                  <div key={`main-file-${i}`} className="border p-2 rounded-md">
                    <div className="font-bold">{data.name}</div>
                    {data.filename && (
                      <div className="flex flex-col gap-0">
                        {data.filename.map((file, f) => {
                          return <div key={`min-file-${i}-${f}`}>- {file}</div>;
                        })}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={`main-file-${i}`}>
                    <div className="text-gray-500">{data.name}</div>
                  </div>
                );
              }
            })}

            <ButtonCustom htmlType="submit" type="primary" className="w-fit">
              ส่งเมล
            </ButtonCustom>
          </Form>
        </CardCustom>
      </div>
    </>
  );
};

export default SentEmailGroup;
