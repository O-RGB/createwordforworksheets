import { getAccount, getFacebookChat } from "@/api/fetcher/getFacebookChat";
import ButtonCustom from "@/components/common/button";
import CardCustom from "@/components/common/card";
import { BgCal, colorSecondary } from "@/config/color";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import FacebookPreviewFile from "./content/perview-file";
import FacebookPreviewChat from "./content/perview-chat";
import FacebookPreviewUser from "./content/preview-user";
import FacebookSelectAccount from "./content/preview-account";
import FacebookSendFile from "./send-file";
import Router from "next/router";

interface FacebookPageGroupProps {
  getLocalInput: IUserInput | undefined;
  getMockup?: WorksheetsModelInput[];
}

const FacebookPageGroup: React.FC<FacebookPageGroupProps> = ({
  getLocalInput,
  getMockup,
}) => {
  const [facebookChat, setFacebookChat] = useState<IFacebookChat | undefined>(
    undefined
  );

  const [onGetAccount, setGetAccount] = useState<IPangConfig[] | undefined>(
    undefined
  );

  const [onSelectAccount, setSelectAccount] = useState<IPangConfig | undefined>(
    undefined
  );

  const [selectUser, setSelectUser] = useState<number>(0);

  const [sendFileCreateCompo, setSendFileCreateCompo] = useState<
    | {
        name: string;
        fileUrl: string;
      }[]
    | undefined
  >(undefined);

  const getFacebookData = (onSelectAccount: IPangConfig) => {
    if (onSelectAccount?.token) {
      const baseUrl = "https://graph.facebook.com/v18.0/me/conversations";
      const params: any = {
        fields:
          "participants,messages.limit(10){id,message,attachments{image_data,mime_type,file_url,name},from},name",
        limit: 10,
        access_token: onSelectAccount?.token,
      };

      const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

      const url = `${baseUrl}?${queryString}`;

      getFacebookChat(url, undefined, { "Content-Type": "application/json" })
        .then((data) => {
          console.log(data);
          setFacebookChat(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    }
  };

  useEffect(() => {
    showAccount();

    if (getLocalInput?.googlesheets) {
      getAccount(getLocalInput.googlesheets, {
        key: "page_token",
      }).then((data) => {
        if (data.configData) {
          let json: IPangConfig[] = JSON.parse(data.configData);
          setGetAccount(json);
        }
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
    createUrlForSend();

    setIsModalConfirmOpan(false);
  };

  const [isModalAccount, setIsModalAccountOpan] = useState(false);
  const showAccount = () => {
    setIsModalAccountOpan(true);
  };

  const onOkAccount = () => {
    setIsModalAccountOpan(false);
  };

  const [isModalSendFile, setIsModalSendFileOpan] = useState(false);
  const showSendFile = () => {
    setIsModalSendFileOpan(true);
  };

  const onOkSendFile = () => {
    Router.push("/")
    setIsModalSendFileOpan(false);
  };

  const createUrlForSend = () => {
    let fileUrl: {
      name: string;
      fileUrl: string;
    }[] = [];
    getMockup?.map((data) => {
      if (data.fileUrlDownload) {
        data.fileUrlDownload.map((url) => {
          fileUrl.push({
            name: data.name,
            fileUrl: url,
          });
        });
      }
    });
    setSendFileCreateCompo(fileUrl);
    showSendFile();
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
            <ButtonCustom onClick={confirm} type="primary">
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
                }}
              ></FacebookPreviewUser>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="เลือกเพจที่ต้องการ"
        open={isModalAccount}
        closable={false}
        closeIcon={false}
        footer={<></>}
        destroyOnClose
        onOk={handleOk}
      >
        <div className="flex flex-col gap-2">
          {onGetAccount ? (
            <FacebookSelectAccount
              selectedAccount={onSelectAccount}
              onSelectAccount={(data) => {
                setSelectAccount(data);
                onOkAccount();
                getFacebookData(data);
              }}
              accountList={onGetAccount}
            ></FacebookSelectAccount>
          ) : (
            <>loaing</>
          )}
        </div>
      </Modal>

      <Modal
        title="กำลังส่ง"
        open={isModalSendFile}
        closable={false}
        closeIcon={false}
        footer={
          <>
            <ButtonCustom
              type="primary"
              onClick={() => {
                onOkSendFile();
              }}
            >
              หน้าแรก
            </ButtonCustom>
          </>
        }
        destroyOnClose
        onOk={handleOk}
      >
        <div className="">
          <div className="font-bold">ผู้รับ</div>
          <div className="pt-1">
            <FacebookPreviewUser
              selectUser={0}
              facebookChat={facebookChat!}
              onClickUser={(index) => {
                setSelectUser(index);
              }}
            ></FacebookPreviewUser>
          </div>
        </div>
        <div className="">
          <div className="font-bold">สภานะ</div>
          {sendFileCreateCompo && onSelectAccount && facebookChat && (
            <div className="pt-1">
              {sendFileCreateCompo?.map((data, index) => {
                return (
                  <div key={`copo-sent-${index}`}>
                    <FacebookSendFile
                      adminUserId={onSelectAccount.id}
                      token={onSelectAccount?.token}
                      userId={
                        facebookChat.data[selectUser].participants.data[0].id
                      }
                      name={data.name}
                      urlFile={data.fileUrl}
                    ></FacebookSendFile>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal>

      <div
        className={` duration-300  p-2 sm:p-3 min-h-screen `}
        style={{ ...BgCal(colorSecondary) }}
      >
        <CardCustom Header={"ตรวจสอบข้อมูล"} className="flex flex-col gap-2">
          <FacebookPreviewFile getMockup={getMockup}></FacebookPreviewFile>
          <div className="flex justify-between">
            <div className="font-bold">เลือกผู้รับ</div>
            <div>
              <ButtonCustom
                onClick={() => {
                  setFacebookChat(undefined);
                  showAccount();
                }}
              >
                เปลี่ยนเพจ
              </ButtonCustom>
            </div>
          </div>
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
