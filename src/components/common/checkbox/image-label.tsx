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
      <div className="select-none overflow-hidden rounded-md relative w-20 h-20">
        <div
          className={`w-full h-full absolute top-0 duration-200 ${
            select ? "bg-opacity-60 bg-black " : "opacity-0"
          } `}
        >
          <div className="flex items-center justify-center w-full h-full">
            <CheckCircleOutlined className=" text-white text-2xl font-bold" />
          </div>
        </div>

        <img src={url} alt="" className="w-20 h-20 object-cover" />
      </div>
    </>
  );
};

export default CheckBoxImageLabel;
