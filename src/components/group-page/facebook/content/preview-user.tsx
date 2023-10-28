import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/th"; // without this line it didn't work
import { BgCal, colorPrimary, colorSecondary } from "@/config/color";
moment.locale("th");

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
                  selectUser != undefined
                    ? undefined
                    : moment(chat.updated_time).isAfter(
                        moment().subtract(1, "day")
                      )
                    ? onClickUser?.(index)
                    : undefined
                }
                style={
                  selectUser != undefined
                    ? { ...BgCal(colorPrimary), color: "white" }
                    : undefined
                }
                className={`p-2 ${
                  selectUser != undefined
                    ? ""
                    : moment(chat.updated_time).isAfter(
                        moment().subtract(1, "day")
                      )
                    ? "hover:bg-gray-300 cursor-pointer  bg-gray-200"
                    : "opacity-50 cursor-not-allowed bg-gray-200"
                } duration-300 rounded-lg flex justify-between  `}
              >
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-white aspect-square flex justify-center items-center">
                    <UserOutlined className="text-gray-300" />
                  </div>
                  <div className="flex flex-col leading-4">
                    <div>{chat.participants.data[0].name}</div>
                    <div
                      className="text-[10px] text-gray-600"
                      style={
                        selectUser != undefined ? { color: "white" } : undefined
                      }
                    >
                      {moment(chat.updated_time)
                        .locale("th")
                        .format("HH:mm น.")}
                    </div>
                  </div>
                </div>
                <div
                  style={
                    selectUser != undefined ? { color: "white" } : undefined
                  }
                  className="text-gray-500 text-xs text-right"
                >
                  <div>
                    {moment(chat.updated_time)
                      .locale("th")
                      .format("DD MMM YYYY")}
                  </div>
                  <div className="text-red-500">
                    {moment(chat.updated_time).isAfter(
                      moment().subtract(1, "day")
                    )
                      ? ""
                      : "เกิน 1 วันไม่ตอบกลับ"}
                  </div>
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
