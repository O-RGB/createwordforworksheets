// ตกแต่ง
const menuEmo: string = "✅";
const menuDetailEmo: string = "🟩";
const header: string = "🔥";
const deliveryEmoji: string = "🚚";
const priceAllEmoji: string = "❤️";
const unit: string = "บาท";
const gift: string = "🎁";

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
    customerText += `${deliveryEmoji} ค่าส่ง ${result.delivery_fee} ${unit}\n`;
  }

  customerText += `${priceAllEmoji} ราคารวม\n`;
  customerText += `${priceAllEmoji} ${result.priceAddFee} ${unit}`;

  if (result.goods.length > 0) {
    return customerText;
  } else {
    return undefined;
  }
};
