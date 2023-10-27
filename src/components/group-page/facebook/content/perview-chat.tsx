import React from "react";

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
                            className={` break-all w-fit p-2  bg-blue-500 rounded-2xl text-white`}
                          >
                            {ca.message != "" ? (
                              <div className=" ">{ca.message}</div>
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
                                      <div
                                        key={`at-k-${ati}`}
                                        className="flex p-4 rounded-md bg-red-300 w-fit"
                                        onClick={() => {
                                          window.open(at.file_url);
                                        }}
                                      >
                                        {at.name}
                                      </div>
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
