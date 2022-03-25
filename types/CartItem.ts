import type { Product } from "./Product";

export interface ICartItem {
  product: Product;
  quantity: number;
}
