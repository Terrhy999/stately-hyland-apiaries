import { Product } from "./types/Product";

export const getPriceLocaleString = (product: Product) =>
  (product.unitAmount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
