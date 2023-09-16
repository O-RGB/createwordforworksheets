import FetchCustom from "../utils/fetchApi";

export const getGoogleSheetsItems = (url: string) => {
  return FetchCustom<GoogleSheetsGetItem[]>(url);
};
