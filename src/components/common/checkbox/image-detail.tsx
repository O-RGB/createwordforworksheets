import React from "react";
import { AiFillPrinter, AiTwotoneFileAdd } from "react-icons/ai";
import { FaBook, FaTools } from "react-icons/fa";
interface ImageDetailProps {
  ImageDetailPrice?: WorkSheetsDetailPrice;
}

const ImageDetail: React.FC<ImageDetailProps> = ({ ImageDetailPrice }) => {
  const detial = (
    price: number,
    detail: string,
    icon: React.ReactNode,
    bg: string
  ) => {
    return (
      <>
        <div className="flex gap-2">
          <div className="flex items-center justify-center">
            <div className={`p-1 ${bg} rounded-md`}>{icon}</div>
          </div>
          <div>{detail}</div>
          <div>{price}฿</div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col gap-1 ">
        {ImageDetailPrice?.print && (
          <>
            {detial(
              ImageDetailPrice?.print,
              "ปริ้น",
              <AiFillPrinter className="text-xs text-white"></AiFillPrinter>,
              "bg-sky-400"
            )}
          </>
        )}
        {ImageDetailPrice?.book && (
          <>
            {detial(
              ImageDetailPrice?.book,
              "เข้าเล่ม",
              <FaBook className="text-xs text-white"></FaBook>,
              "bg-emerald-500"
            )}
          </>
        )}
        {ImageDetailPrice?.tool && (
          <>
            {detial(
              ImageDetailPrice?.tool,
              "ชื้นงาน",
              <FaTools className="text-xs text-white "></FaTools>,
              "bg-violet-400"
            )}
          </>
        )}
        {ImageDetailPrice?.file && (
          <>
            {detial(
              ImageDetailPrice?.file,
              "ไฟล์",
              <AiTwotoneFileAdd className="text-xs text-white"></AiTwotoneFileAdd>,
              "bg-red-400"
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ImageDetail;
