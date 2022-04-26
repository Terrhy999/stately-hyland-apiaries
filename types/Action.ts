import { ICartItem } from "./CartItem";

export interface Action {
  type:
    | "addToCart"
    | "removeFromCart"
    | "decreaseQuantity"
    | "increaseQuantity"
    | "setQuantity";
  payload: ICartItem;
}
