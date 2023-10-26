import React from "react";
import { BsMeta } from "react-icons/bs";

interface FacebookSelectAccountProps {
  onSelectAccount?: (select: IPangConfig) => void;
  accountList: IPangConfig[];
  selectedAccount?: IPangConfig;
}

const FacebookSelectAccount: React.FC<FacebookSelectAccountProps> = ({
  onSelectAccount,
  accountList,
  selectedAccount,
}) => {
  return (
    <div className="flex flex-col gap-1 ">
      {accountList.map((data, index) => {
        return (
          <div
            key={`ac-k-${index}`}
            className={`p-5  flex gap-3 items-center  cursor-pointer ${
              selectedAccount
                ? selectedAccount.id == data.id
                  ? "bg-blue-200 hover:bg-blue-500 "
                  : "bg-gray-200 hover:bg-gray-300 "
                : "bg-gray-200 hover:bg-gray-300 "
            } duration-300 rounded-md`}
            onClick={() => onSelectAccount?.(data)}
          >
            <div className="w-8 h-8 rounded-full bg-white aspect-square flex justify-center items-center">
              <BsMeta className="text-xl text-blue-500"></BsMeta>
            </div>
            <div>{data.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FacebookSelectAccount;
