import React from "react";

interface FacebookPreviewChatProps {
  facebookChat: IFacebookChat;
  selectUser: number;
}

const FacebookPreviewChat: React.FC<FacebookPreviewChatProps> = ({
  facebookChat,
  selectUser,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2  overflow-y-auto h-80 border">
        <div className=" w-full">
          {facebookChat?.data?.map((chat, index) => {
            if (index == selectUser)
              return (
                <div
                  key={`fac-k-${index}`}
                  className="p-2 border flex flex-col gap-1"
                >
                  {chat.messages.data.map((ca, cai) => {
                    return (
                      <div
                        key={`mes-i-${cai}`}
                        className={`flex ${
                          ca.from.id != "463082010924848"
                            ? "justify-start text-start "
                            : "justify-end text-end"
                        }`}
                      >
                        <div className="max-w-[50%]">
                          <div className="text-xs text-gray-400">
                            {ca.from.name}
                          </div>
                          <div
                            className={` break-all  p-2  bg-blue-500 rounded-2xl text-white`}
                          >
                            {ca.message != "" ? (
                              <div>{ca.message}</div>
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
