import FetchCustom from "../utils/fetchApi";

export const getLimitOfDay = (url: string) => {
  url = url + "?page=emaillmit";
  return FetchCustom<IlimitOfDay>(url);
};
