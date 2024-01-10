import moment from "moment";
import "moment/locale/th";
moment.locale("th");

export function DateFormat(date?: string | Date) {
  return date ? moment(date).add(543, "year").format("LLL") : "";
}
