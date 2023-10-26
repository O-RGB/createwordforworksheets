import { getFacebookChat } from "@/api/fetcher/getFacebookChat";
import ButtonCustom from "@/components/common/button";
import CardCustom from "@/components/common/card";
import { BgCal, colorSecondary } from "@/config/color";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import FacebookPreviewFile from "./content/perview-file";
import FacebookPreviewChat from "./content/perview-chat";
import FacebookPreviewUser from "./content/preview-user";

interface FacebookPageGroupProps {
  getLocalInput: IFacebookTokenInput | undefined;
  getMockup?: WorksheetsModelInput[];
}

const FacebookPageGroup: React.FC<FacebookPageGroupProps> = ({
  getLocalInput,
  getMockup,
}) => {
  const [facebookChat, setFacebookChat] = useState<IFacebookChat | undefined>(
    undefined
  );

  const [selectUser, setSelectUser] = useState<number>(0);
  useEffect(() => {
    if (getLocalInput?.facebookToken && !facebookChat) {
      const baseUrl = "https://graph.facebook.com/v18.0/me/conversations";
      const params: any = {
        fields:
          "participants,messages.limit(10){id,message,attachments{image_data,mime_type,file_url,name},from},name",
        limit: 10,
        access_token: getLocalInput?.facebookToken,
      };

      const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

      const url = `${baseUrl}?${queryString}`;

      getFacebookChat(url, { "Content-Type": "application/json" })
        .then((data) => {
          setFacebookChat(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    }
  }, [getLocalInput]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    if (facebookChat) {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const [isModalConfirm, setIsModalConfirmOpan] = useState(false);
  const showConfirm = () => {
    setIsModalConfirmOpan(true);
  };

  const confirm = () => {
    setIsModalConfirmOpan(false);
  };
  return (
    <>
      <Modal
        title="แสดงผลแชท"
        open={isModalOpen}
        closable={false}
        closeIcon={false}
        footer={
          <>
            <ButtonCustom
              type="primary"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              ยกเลิก
            </ButtonCustom>
            <ButtonCustom
              type="primary"
              //   disabled={countCompo == countLoad}
              onClick={() => {
                handleOk();
                showConfirm();
              }}
            >
              ตกลง
            </ButtonCustom>
          </>
        }
        destroyOnClose
        onOk={handleOk}
      >
        * ข้อมูลนี้ไม่ได้อัปเดตแบบเรียวไทม
        <FacebookPreviewChat
          facebookChat={facebookChat!}
          selectUser={selectUser}
        ></FacebookPreviewChat>
      </Modal>

      <Modal
        title="ยืนยันการส่ง"
        open={isModalConfirm}
        closable={false}
        closeIcon={false}
        footer={
          <>
            <ButtonCustom
              type="primary"
              onClick={() => {
                setIsModalOpen(false);
                setIsModalConfirmOpan(false);
              }}
            >
              ยกเลิก
            </ButtonCustom>
            <ButtonCustom
              type="primary"
              //   disabled={countCompo == countLoad}
              //   onClick={() => {
              //     // handleOk();
              //     Router.push("/");
              //   }}
            >
              ตกลง
            </ButtonCustom>
          </>
        }
        destroyOnClose
        onOk={handleOk}
      >
        <div className="flex flex-col gap-2">
          <FacebookPreviewFile getMockup={getMockup}></FacebookPreviewFile>
          <div className="font-bold">
            <div>ส่งให้</div>
            <div>
              <FacebookPreviewUser
                selectUser={0}
                facebookChat={facebookChat!}
                onClickUser={(index) => {
                  setSelectUser(index);
                  showModal();
                }}
              ></FacebookPreviewUser>
            </div>
          </div>
        </div>
      </Modal>

      <div
        className={` duration-300  p-2 sm:p-3 min-h-screen `}
        style={{ ...BgCal(colorSecondary) }}
      >
        <CardCustom Header={"ตรวจสอบข้อมูล"} className="flex flex-col gap-2">
          <FacebookPreviewFile getMockup={getMockup}></FacebookPreviewFile>
          <div className="font-bold">เลือกผู้รับ</div>
          <div className="text-sm">
            <div>* ไม่รอบรับการแสดงภาพผู้ใช้งาน</div>
            <div>* แสดงได้สูงสุด 10 รายการ</div>
          </div>
          {facebookChat ? (
            <div className=" rounded-md">
              <FacebookPreviewUser
                facebookChat={facebookChat}
                onClickUser={(index) => {
                  setSelectUser(index);
                  showModal();
                }}
              ></FacebookPreviewUser>
              {/* <div className=" flex flex-col gap-2">
                {facebookChat?.data?.map((chat, index) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectUser(index);
                        showModal();
                      }}
                      className="p-2 border bg-gray-200 cursor-pointer hover:bg-gray-500 duration-300 rounded-lg"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-white aspect-square"></div>

                        <div>{chat.participants.data[0].name}</div>
                      </div>
                    </div>
                  );
                })}
              </div> */}
            </div>
          ) : (
            <>Loaing</>
          )}
        </CardCustom>
      </div>
    </>
  );
};

export default FacebookPageGroup;
