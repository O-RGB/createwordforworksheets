import FetchCustom from "../utils/fetchApi";

export const getNgrokUrl = (url: string, input: IGetConfigNgrok) => {
  url = url + "?page=getconfig" + `&key=${input.key}`;
  return FetchCustom<IReslutConfigNgrok>(url);
};

export const checkServerNgrokUrl = (url: string) => {
  url = url + "/check";
  return FetchCustom<IReslutConfigNgrok>(url, {}, "POST");
};
export const sendMailServerNgrokUrl = (url: string, input: ISendMailNgrok) => {
  url = url + "/send_email";
  return FetchCustom<ISendMailResultNgrok>(url, JSON.stringify(input), "POST", {
    "Content-Type": "application/json",
  });
};
