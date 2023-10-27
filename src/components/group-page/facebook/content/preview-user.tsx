import React from "react";
import { UserOutlined } from "@ant-design/icons";

interface FacebookPreviewUserProps {
  facebookChat: IFacebookChat;
  selectUser?: number;
  onClickUser?: (index: number) => void;
}

const FacebookPreviewUser: React.FC<FacebookPreviewUserProps> = ({
  facebookChat,
  selectUser = undefined,
  onClickUser,
}) => {
  return (
    <>
      <div className=" flex flex-col gap-2">
        {facebookChat?.data?.map((chat, index) => {
          if (
            selectUser != undefined
              ? selectUser === index
                ? true
                : false
              : true
          ) {
            return (
              <div
                key={`user-key-fb-${index}`}
                onClick={() =>
                  selectUser != undefined ? undefined : onClickUser?.(index)
                }
                className={`p-2 border bg-gray-200  ${
                  selectUser != undefined
                    ? ""
                    : "hover:bg-gray-300 cursor-pointer"
                } duration-300 rounded-lg`}
              >
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-white aspect-square flex justify-center items-center">
                    <UserOutlined className="text-gray-300" />
                  </div>

                  <div>{chat.participants.data[0].name}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default FacebookPreviewUser;
