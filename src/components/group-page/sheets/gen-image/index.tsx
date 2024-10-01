import React, { useEffect, useState } from "react";
import ImageTemplate from "../template";

interface InitGenImageProps {
  list?: ProductModelData[];
  auto?: boolean;
  contentToImage?: IPreparDataFormSheets;
  inputSumPriceByAdmin?: number;
  mainData?: IInitMainData[][];
}

const InitGenImage: React.FC<InitGenImageProps> = ({
  list,
  auto,
  contentToImage,
  inputSumPriceByAdmin,
  mainData,
}) => {
  const [mapping, setMapping] = useState<ProductModelData[]>([]);
  const mappingImageToRespone = (
    list: ProductModelData[] = [],
    mainData: IInitMainData[][] = []
  ) => {
    let c: number = 0;
    mainData.map((x, i) => {
      x.map((y, j) => {
        let item = list[c];
        item.imagePerview = y.imagePerview;
        c = c + 1;
      });
    });

    return list;
  };

  useEffect(() => {
    let listAndImte = mappingImageToRespone(list, mainData);
    setMapping(listAndImte);
  }, []);
  return (
    <ImageTemplate
      contentToImage={contentToImage}
      list={mapping}
      auto={auto}
      priceByAdmin={inputSumPriceByAdmin}
    ></ImageTemplate>
  );
};

export default InitGenImage;
