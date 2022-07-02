import { IProduct } from "../types";

export const getPriceLocaleString = (product: IProduct) =>
  (product.unitAmount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export const getFormattedDate = (date: string) => {
  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };
  return dateObject.toLocaleDateString("en-us", options);
};
