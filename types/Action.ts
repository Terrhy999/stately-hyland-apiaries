import { Product } from "./Product";

export interface Action {
  type: "addToCart" | "removeFromCart" | "decreaseQuantity";
  payload: Product;
}
