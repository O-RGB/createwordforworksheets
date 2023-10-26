import FetchCustom from "../utils/fetchApi";

export const getFacebookChat = (url: string, headers: any) => {
  return FetchCustom<IFacebookChat>(url, undefined, "GET", headers);
};

export const getAccount = (url: string, input: IGetConfigNgrok) => {
  url = url + "?page=getconfig" + `&key=${input.key}`;
  return FetchCustom<IResultPageConfigJson>(url);
};
