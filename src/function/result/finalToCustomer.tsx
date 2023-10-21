// ตกแต่ง
export const menuEmo: string = "✅";
export const menuDetailEmo: string = "🟩";
export const header: string = "🔥";
export const deliveryEmoji: string = "🚚";
export const priceAllEmoji: string = "❤️";
export const unit: string = "บาท";
export const gift: string = "🎁";
export const priceForMixMode: string = "🌈";
export const priceForDiscount: string = "✨";
export const emojiFile: string = "💾";
export const emojiPrint: string = "📗";
export const emojiBook: string = "📕";

export const createTextForCustomer = (
  result: ITextResult,
  mode: ModeSetting,
  disabledFee: boolean
) => {
  let customerText: string = "";
  customerText += `${header}${header}รายการแบบ ${result.introducingEmoji} ${result.introducing} ${header}${header}\n`;
  result.goods.map((good, index) => {
    customerText += `${menuEmo} `;
    customerText += `${good.goodsName} (${result.introducingEmoji} ${result.introducing})\n`;
    if (good.type != "file" && good.count > 1) {
      customerText += `${menuDetailEmo} ${good.count} ชุด ${"📚"}\n`;
      customerText += `${menuDetailEmo} ชุดละ ${good.price} ${unit}\n`;
    }
    customerText += `${menuDetailEmo} ราคา ${good.price * good.count} ${unit}`;
    customerText += `\n`;
    if (good.relationship) {
      customerText += `${gift} ${good.relationship.name}\n`;
      customerText += `${gift} ได้รับส่วนลด ${good.relationship.discount} บาท\n`;
    }
    customerText += `\n`;
  });
  if ((mode.mode == "book" || mode.mode == "print") && !disabledFee) {
    customerText += `${deliveryEmoji} ค่าส่ง\n`;
    customerText += `${deliveryEmoji} ${result.delivery_fee} ${unit}\n\n`;
  }

  customerText += `${priceAllEmoji} ราคารวม\n`;
  customerText += `${priceAllEmoji} ${result.priceAddFee.toLocaleString()} ${unit}`;

  if (result.goods.length > 0) {
    return customerText;
  } else {
    return undefined;
  }
};

export const createPriceAllForMixMode = (priceAll: number) => {
  let str = "";
  str += `${priceForMixMode} ราคารวมทั้งหมด\n`;
  str += `${priceForMixMode} ${priceAll.toLocaleString()} บาท`;
  return str;
};

export const createPriceByDiscount = (discount: IFinalResultByDiscount) => {
  let str: string = "";
  str += "";
  str += `${priceForDiscount} ${discount.name}\n`;
  str += `${priceForDiscount} ${discount.priceSum.toLocaleString()} บาท`;
  return str;
};

export const createFeeForMixMode = (fee: number) => {
  let str: string = "";
  str += `${deliveryEmoji} ค่าส่งรวม\n`;
  str += `${deliveryEmoji} ${fee} ${unit}\n\n`;
  return str;
};
