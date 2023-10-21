import FetchCustom from "../utils/fetchApi";

export const pushBookingToSheets = (url: string, input: string) => {
  url = url + "?page=appendbooking" + input;

  return FetchCustom<IPushBookingResult>(url);
};
