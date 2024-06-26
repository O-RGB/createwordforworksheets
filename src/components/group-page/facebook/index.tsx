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
import Router from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import ControlerFile from "./control-send";
import { GiTurtle } from "react-icons/gi";
import { RiSpeedMiniFill } from "react-icons/ri";

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
  const [optionSendfile, setOptionSendfile] = useState<boolean>(false);

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
          "participants,messages.limit(10){id,message,attachments{image_data,mime_type,file_url,name},from,sticker},name,updated_time",
        limit: 10,
        access_token: onSelectAccount?.token,
      };

      const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

      const url = `${baseUrl}?${queryString}`;

      getFacebookChat(url, undefined, { "Content-Type": "application/json" })
        .then((data) => {
          setFacebookChat(data);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    }
  };

  useEffect(() => {
    if (!onSelectAccount) {
      showAccount();
    }

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
    Router.push("/");
    setIsModalSendFileOpan(false);
  };

  const createUrlForSend = () => {
    let fileUrl: {
      name: string;
      fileUrl: string;
    }[] = [];
    getMockup?.map((data) => {
      if (data.fileUrlDownload) {
        if (data.fileUrlDownload.length == data.filename?.length) {
          data.fileUrlDownload.map((url, i) => {
            let filename = data.filename ? data.filename[i] : "";
            fileUrl.push({
              name: filename,
              fileUrl: url,
            });
          });
        }
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
              type="default"
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
        <div className="flex flex-col gap-2">
          <div>
            <div>* ข้อมูลนี้ไม่ได้อัปเดตแบบเรียลไทม์</div>
            <div>* แสดงสูงสุดได้ 10 รายการ</div>
          </div>
          <FacebookPreviewUser
            selectUser={selectUser}
            facebookChat={facebookChat!}
            onClickUser={(index) => {
              setSelectUser(index);
            }}
          ></FacebookPreviewUser>
          <FacebookPreviewChat
            IPangConfig={onSelectAccount!}
            facebookChat={facebookChat!}
            selectUser={selectUser}
          ></FacebookPreviewChat>
        </div>
      </Modal>

      <Modal
        title="ยืนยันการส่ง"
        open={isModalConfirm}
        closable={false}
        closeIcon={false}
        footer={
          <>
            <ButtonCustom
              type="default"
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
          <div>
            <div className="font-bold">วิธีส่งไฟล์</div>
            <div className="w-full flex gap-2 ">
              <ButtonCustom
                type={!optionSendfile ? "primary" : undefined}
                onClick={() => {
                  setOptionSendfile(false);
                }}
                className="w-full h-full"
              >
                <div className="flex flex-col items-start">
                  <div className="text-lg flex gap-1 items-center">
                    เร็ว <RiSpeedMiniFill></RiSpeedMiniFill>
                  </div>
                  <div className="text-xs">ส่งแบบสุ่มไม่เรียงลำดับไฟล์</div>
                </div>
              </ButtonCustom>
              <ButtonCustom
                type={optionSendfile ? "primary" : undefined}
                onClick={() => {
                  setOptionSendfile(true);
                }}
                className="w-full h-full"
              >
                <div className="flex flex-col items-start">
                  <div className="text-lg flex gap-1 items-center">
                    ช้า <GiTurtle></GiTurtle>
                  </div>
                  <div className="text-xs">เรียงลำดับทีละไฟล์</div>
                </div>
              </ButtonCustom>
            </div>
          </div>
          <div className="">
            <div className="font-bold">ส่งให้</div>
            <div>
              <FacebookPreviewUser
                selectUser={selectUser}
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
        <div className="flex flex-col gap-2 ">
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
            <>
              <div className="flex justify-center items-center w-full h-20">
                <LoadingOutlined className="text-5xl " />
              </div>
            </>
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
        <div className="flex flex-col gap-1.5">
          <div className="">
            <div className="font-bold">ผู้รับ</div>
            <div className="pt-1 ">
              <FacebookPreviewUser
                selectUser={selectUser}
                facebookChat={facebookChat!}
                onClickUser={(index) => {
                  setSelectUser(index);
                }}
              ></FacebookPreviewUser>
            </div>
          </div>
          <div className="">
            <div>* มือถือ ไม่อนุญาตให้เปลี่ยนหน้าจอเด็ดขาด</div>
            <div>* มือถือ ไม่สามารถทำงานเบื้องหลังได้</div>
            <div className="font-bold">สถานะ</div>
            {sendFileCreateCompo && onSelectAccount && facebookChat && (
              <div className="pt-1 flex flex-col gap-1">
                <ControlerFile
                  disableWaitFuncion={!optionSendfile}
                  adminUserId={onSelectAccount.id}
                  token={onSelectAccount?.token}
                  userId={facebookChat.data[selectUser].participants.data[0].id}
                  sendFileCreateCompo={sendFileCreateCompo}
                ></ControlerFile>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <div
        className={` duration-300  p-2 sm:p-3 min-h-screen `}
        style={{ ...BgCal(colorSecondary) }}
      >
        <CardCustom Header={"ตรวจสอบข้อมูล"} className="flex flex-col gap-2">
          {onGetAccount && (
            <div className="flex gap-2 w-full ">
              <div className="w-full">
                <FacebookSelectAccount
                  showOnlySelect
                  selectedAccount={onSelectAccount}
                  onSelectAccount={(data) => {
                    setSelectAccount(data);
                    onOkAccount();
                    getFacebookData(data);
                  }}
                  accountList={onGetAccount}
                ></FacebookSelectAccount>
              </div>
              <div className="w-fit h-full">
                <ButtonCustom
                  type="primary"
                  className="h-[4.6rem]"
                  onClick={() => {
                    setFacebookChat(undefined);
                    showAccount();
                  }}
                >
                  เปลี่ยนเพจ
                </ButtonCustom>
              </div>
            </div>
          )}

          <FacebookPreviewFile getMockup={getMockup}></FacebookPreviewFile>
          <div className="flex justify-between">
            <div className="font-bold">เลือกผู้รับ</div>
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
            !isModalAccount && (
              <div className="flex justify-center items-center w-full h-20">
                <LoadingOutlined className="text-5xl " />
              </div>
            )
          )}
        </CardCustom>
      </div>
    </>
  );
};

export default FacebookPageGroup;
