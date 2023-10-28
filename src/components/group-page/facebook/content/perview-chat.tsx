import Link from "next/link";
import React from "react";
import { FilePdfFilled } from "@ant-design/icons";

interface FacebookPreviewChatProps {
  facebookChat: IFacebookChat;
  selectUser: number;
  IPangConfig: IPangConfig;
}

const FacebookPreviewChat: React.FC<FacebookPreviewChatProps> = ({
  facebookChat,
  selectUser,
  IPangConfig,
}) => {
  return (
    <>
      <div className="flex flex-col-reverse gap-2  overflow-y-auto h-80 border rounded-md">
        <div className=" w-full">
          {facebookChat?.data?.map((chat, index) => {
            if (index == selectUser)
              return (
                <div
                  key={`fac-k-${index}`}
                  className="p-2  flex flex-col-reverse gap-1"
                >
                  {chat.messages?.data.map((ca, cai) => {
                    return (
                      <div
                        key={`mes-i-${cai}`}
                        className={`flex ${
                          ca.from.id != IPangConfig.id
                            ? "justify-start text-start "
                            : "justify-end text-end"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] sm:max-w-[60%] flex flex-col  ${
                            ca.from.id != IPangConfig.id
                              ? "items-start text-start "
                              : "items-end text-end"
                          }`}
                        >
                          <div className="text-xs text-gray-400">
                            {ca.from.name}
                          </div>
                          <div
                            className={` break-all w-fit p-2  ${
                              ca.sticker ? "" : "bg-blue-500"
                            }  rounded-2xl text-white`}
                          >
                            {ca.message != "" ? (
                              <div className=" ">{ca.message}</div>
                            ) : ca.sticker != undefined ? (
                              <div key={`img-st-${cai}`}>
                                <img
                                  className="w-fit h-20 object-contain bg-white"
                                  src={ca?.sticker}
                                />
                              </div>
                            ) : (
                              <div className={"flex gap-1 w-fit "}>
                                {ca.attachments?.data.map((at, ati) => {
                                  if (at.mime_type == "image/jpeg") {
                                    return (
                                      <div
                                        key={`at-k-${ati}`}
                                        className="w-fit"
                                      >
                                        <img
                                          className="w-fit h-20 object-contain"
                                          src={at.image_data?.url}
                                        />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <Link
                                        href={at.file_url ?? ""}
                                        key={`at-k-${ati}`}
                                      >
                                        <div className="flex rounded-md  w-fit gap-1">
                                          <div>
                                            <FilePdfFilled className=""></FilePdfFilled>
                                          </div>
                                          <div>{at.name}</div>
                                        </div>
                                      </Link>
                                    );
                                  }
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
};

export default FacebookPreviewChat;
