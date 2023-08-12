// ตกแต่ง
const menuEmo: string = "✅";
const menuDetailEmo: string = "🟩";
const header: string = "🔥";
const deliveryEmoji: string = "🚚";
const priceAllEmoji: string = "❤️";
const unit: string = "บาท";

// เว้นวรรค
const one_space: string = " ";

export const createTextForCustomer = (
  result: ITextResult,
  mode: ModeSetting
) => {
  let customerText: string = "";
  customerText += `${header}${header}รายการแบบ${one_space}${result.introducingEmoji}${one_space}${result.introducing}${one_space}นะครับ${header}${header}\n\n`;
  result.goods.map((good, index) => {
    customerText += `${menuEmo}${one_space}`;
    customerText += `${good.goodsName}${one_space}(${result.introducing})\n`;
    if (good.type != "file" && good.count > 1) {
      customerText += `${menuDetailEmo}${one_space}${
        good.count
      }${one_space}ชุด${one_space}${"📚"}\n`;
      customerText += `${menuDetailEmo}${one_space}ชุดละ${one_space}${good.price}${one_space}${unit}\n`;
    }
    customerText += `${menuDetailEmo}${one_space}ราคา${one_space}${
      good.price * good.count
    }${one_space}${unit}`;
    customerText += `\n\n`;
  });

  if (mode.mode != "file") {
    customerText += `${deliveryEmoji}${one_space}ค่าส่ง${one_space}${result.delivery_fee}${one_space}${unit}\n`;
    // customerText += `${menuDetailEmo}${one_space}ชุดละ${one_space}${good.price}${one_space}บาท\n`;
    // customerText += `\n`;
  }

  customerText += `${priceAllEmoji}${one_space}ราคารวม${one_space}${result.priceAddFee}${one_space}${unit}`;
  //   customerText += `${menuEmo}${one_space}ราคารวม${one_space}${result.priceAddFee}`;

  if (result.goods.length > 0) {
    return customerText;
  } else {
    return undefined;
  }
};
