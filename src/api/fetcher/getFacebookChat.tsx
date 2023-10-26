import FetchCustom from "../utils/fetchApi";

export const getFacebookChat = (url: string, headers: any) => {
  return FetchCustom<IFacebookChat>(url, undefined, "GET", headers);
};
