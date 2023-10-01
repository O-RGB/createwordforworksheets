import FetchCustom from "../utils/fetchApi";

export const getFile = (url: string) => {
  return FetchCustom<IFileGoogleDrive[]>(url);
};
