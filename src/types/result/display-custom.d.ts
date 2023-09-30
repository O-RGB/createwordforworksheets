interface IDisplayCustom {
  mode: ModeOnFinish;
  WorksheetsModel: IDisplayCustomItem[];
}

interface IDisplayCustomItem extends WorksheetsModelInput {
  count: number;
}
