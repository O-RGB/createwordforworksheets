interface IResultPageConfigJson {
  configData: string;
}

interface IResultPageConfig {
  configData: IPangConfig[];
}

interface IPangConfig {
  name: string;
  id: stirng;
  token: string;
}
