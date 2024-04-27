import FetchCustom from "../utils/fetchApi";

export const getConfigUrl = async (url: string, input: IGetConfig) => {
  url = url + "?page=getconfig" + `&key=${input.key}`;
  return await FetchCustom<IReslutConfig>(url);
};
