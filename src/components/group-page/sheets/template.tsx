import React from "react";
import * as htmlToImage from "html-to-image";
import { DateFormat } from "@/lib/date.format";
import moment from "moment";
import { NnumberFormat } from "@/lib/number.format";

interface ImageTemplateProps {
  list: ProductModelData[] | undefined;
  contentToImage: IPreparDataFormSheets | undefined;
  auto?: boolean;
  priceByAdmin?: number;
}

const ImageTemplate: React.FC<ImageTemplateProps> = ({
  list,
  contentToImage,
  auto,
  priceByAdmin,
}) => {
  function Logo() {
    return (
      <>
        <div className="flex gap-2 ">
          <div className="w-8 h-8 aspect-square rounded-full bg-green-500">
            <img src="/logo.png" alt="" />
          </div>
          <div className="flex justify-center items-center">
            <div>สื่อการสอน Worksheets</div>
          </div>
        </div>
      </>
    );
  }
  function Content() {
    return (
      <>
        <div className="flex flex-col border p-2 rounded-lg">
          <div>
            <span className="font-bold">เฟซบุ๊ก</span>:{" "}
            {contentToImage?.facebook}
          </div>
          <div>
            <span className="font-bold">ที่อยู่</span>:{" "}
            {contentToImage?.address}
          </div>
        </div>
      </>
    );
  }
  function Item() {
    return (
      <>
        <div className="-mb-1 ">
          <span className="font-bold">รายการ</span>:{" "}
        </div>
        <div className="flex flex-col pl-3 border p-2 rounded-lg">
          {list?.map((data, index) => {
            return (
              <div key={`item-imgae-${index}`} className="flex gap-2">
                <div className="w-4">{index + 1}.</div>
                <div>{data.list}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`${
          auto ? "" : "w-[500px]"
        }  p-3 flex flex-col gap-2 bg-white border rounded-lg mali`}
      >
        <Logo></Logo>
        <hr />
        นำชื่อเข้าระบบเรียบร้อยแล้ว
        {contentToImage && <Content></Content>}
        {list && <Item></Item>}
        <div className="font-bold text-lg">
          ราคา: {priceByAdmin ? NnumberFormat(priceByAdmin) : ""} บาท
        </div>
        <div className="text-xs text-gray-500 text-right">
          {DateFormat(moment().format())}
        </div>
      </div>
    </>
  );
};

export default ImageTemplate;
