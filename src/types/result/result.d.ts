interface IGoodsRelationship {
  name: string;
  discount: number;
}

interface IGoods extends FeeSetting {
  workSheetsType: WorkSheetsType;
  goodsName: string;
  type: ModeOnFinish;
  price: number;
  count: number;
  relationship?: IGoodsRelationship;
}

interface ITextResult {
  introducing: stirng;
  goods: IGoods[];
  priceAll: number;
}
