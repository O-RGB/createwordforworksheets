import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
interface CheckBoxImageLabelProps {
  url: string;
  select: boolean;
}

const CheckBoxImageLabel: React.FC<CheckBoxImageLabelProps> = ({
  url,
  select = false,
}) => {
  return (
    <>
      <div className="select-none overflow-hidden rounded-md relative w-20 h-full">
        <div
          className={`w-full h-full absolute top-0 duration-200 rounded-md  ${
            select ? "bg-opacity-60 bg-black" : "opacity-0"
          } `}
        >
          <div className="flex items-center justify-center h-full ">
            <CheckCircleOutlined className=" text-white text-2xl font-bold" />
          </div>
        </div>
        <div>
          <div className="h-full w-full object-cover">
            <img src={url} className="h-20 w-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckBoxImageLabel;
