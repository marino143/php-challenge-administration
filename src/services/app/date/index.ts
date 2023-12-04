// Vendors
import moment, { Moment } from "moment";

const getDateFormat = (date: string): string => {
  return moment(date).format("DD.MM.YYYY.");
};

export { getDateFormat };
