interface IGoodsRelationship {
  name: string;
  discount: number;
  relationshipId: string[];
}

interface IGoods {
  workSheetsType: WorkSheetsType;
  goodsName: string;
  type: ModeOnFinish;
  price: number;
  count: number;
  relationship?: IGoodsRelationship;
}

interface ITextResult extends FeeSetting {
  introducing: stirng;
  introducingEmoji: stirng;
  goods: IGoods[];
  priceAll: number;
  priceAddFee: number;
}
