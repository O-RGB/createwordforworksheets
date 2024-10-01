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
          <img src="/logo.png" alt="" className="w-8 h-8 object-contain" />
          <div className="-mt-1">
            <div className="pb-2">สื่อการสอน Worksheets</div>
          </div>
        </div>
      </>
    );
  }
  function Content() {
    return (
      <span className="flex flex-col pb-4 border px-2 rounded-lg">
        <span>
          <span className="font-bold">เฟซบุ๊ก</span>: {contentToImage?.facebook}
        </span>
        <span>
          <span className="font-bold">ที่อยู่</span>: {contentToImage?.address}
        </span>
      </span>
    );
  }
  function Item() {
    return (
      <>
        <div className="">
          <span className="font-bold">รายการ</span>:{" "}
        </div>
        <div className="flex gap-2 flex-col pl-3 border p-2 rounded-lg">
          {list?.map((data, index) => {
            return (
              <div
                key={`perview-img-${index}`}
                className="flex gap-2 items-center"
              >
                <div className="w-[38px] h-[54px] object-cover">
                  {data.imagePerview ? (
                    <img
                      src={data.imagePerview}
                      alt=""
                      className="w-[38px] h-[54px] rounded-md overflow-hidden object-cover"
                    />
                  ) : (
                    <div className="w-[38px] h-[54px] rounded-md overflow-hidden bg-gray-100"></div>
                  )}
                </div>
                <div key={`item-imgae-${index}`} className="flex -mt-3">
                  <div className="w-4">{index + 1}.</div>
                  <div className="">{data.list}</div>
                </div>
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
