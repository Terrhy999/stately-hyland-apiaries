import { IProduct } from "../types";

export const getPriceLocaleString = (product: IProduct) =>
  (product.unitAmount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
