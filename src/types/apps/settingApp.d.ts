interface DisplaySetting {
  image: boolean;
  grid: boolean;
}

type DisplayOnFinish = "image" | "grid";
// 1 == image
// 2 == grid
// 3 == book
// 4 == mix

interface InputSettingOnFinish {
  book_price: number;
  delivery_fee: number;
}

type InputSetting = "delivery_fee" | "book_price";
// interface ResultSettingOnFinish {
//   delivery: boolean;
//   type: boolean;
//   price: boolean;
//   price_all: boolean;
// }
interface ModeSetting {
  mode: ModeOnFinish;
}

type ModeOnFinish = 1 | 2 | 3 | 4;
// 1 == file
// 2 == print
// 3 == book
// 4 == mix
