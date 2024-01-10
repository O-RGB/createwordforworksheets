import React from "react";
import * as htmlToImage from "html-to-image";

interface ImageTemplateProps {
  list: ProductModelData[] | undefined;
  contentToImage: IPreparDataFormSheets | undefined;
  auto?: boolean;
  priceByAdmin?: string;
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
          <div className="w-8 h-8 aspect-square rounded-full bg-green-500"></div>
          <div className="flex justify-center items-center">
            <div>สื่อการสอน</div>
          </div>
        </div>
      </>
    );
  }
  function Content() {
    return (
      <>
        <div className="flex flex-col">
          <div>Facebook: {contentToImage?.facebook}</div>
          <div>address: {contentToImage?.address}</div>
        </div>
      </>
    );
  }
  function Item() {
    return (
      <>
        รายการ:
        <div className="flex flex-col">
          {list?.map((data) => {
            return <div>{data.list}</div>;
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
        }  p-3 flex flex-col gap-2 bg-white border rounded-lg`}
      >
        <Logo></Logo>
        {contentToImage && <Content></Content>}
        {list && <Item></Item>}
        ราคารวม: {priceByAdmin}
      </div>
    </>
  );
};

export default ImageTemplate;
