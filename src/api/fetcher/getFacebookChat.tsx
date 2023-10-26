import FetchCustom from "../utils/fetchApi";

export const getFacebookChat = (
  url: string,
  data: any = undefined,
  headers: any,
  met: string = "GET"
) => {
  return FetchCustom<IFacebookChat>(url, data, met, headers);
};

export const getAccount = (url: string, input: IGetConfigNgrok) => {
  url = url + "?page=getconfig" + `&key=${input.key}`;
  return FetchCustom<IResultPageConfigJson>(url);
};
