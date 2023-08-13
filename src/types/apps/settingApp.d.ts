interface DisplaySetting {
  image: boolean;
  grid: boolean;
}

type DisplayOnFinish = "image" | "grid";
interface FeeSetting {
  delivery_fee: number;
}

type InputSetting = "delivery_fee";
interface ModeSetting {
  mode: ModeOnFinish;
}

type ModeOnFinish = "file" | "print" | "book" | "mix";
// 1 == file
// 2 == print
// 3 == book
// 4 == mix

type ReslutSettingOnFinish = "discount";
interface ResltSetting {
  discount: number;
}
