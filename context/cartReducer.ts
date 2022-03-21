import { Dispatch, SetStateAction } from "react";
import { Action } from "../types/Action";
import { CartItem } from "../types/CartItem";

const cartReducer = (
  state: CartItem[],
  action: Action,
  setCartState: Dispatch<SetStateAction<CartItem[]>>
) => {
  switch (action.type) {
    case "addToCart": {
      const productExists = state.find(
        (product) => product.product.productId === action.payload.productId
      );
      if (productExists) {
        productExists.quantity++;
      } else {
        state.push({ product: action.payload, quantity: 1 });
      }
      setCartState(state);
      state.map((product) =>
        console.log(product.product.name, product.quantity)
      );
      break;
    }
    case "removeFromCart": {
      const newState = state.filter(
        (product) => product.product.productId !== action.payload.productId
      );
      setCartState(newState);
      break;
    }
    case "decreaseQuantity": {
      const product = state.find(
        (product) => product.product.productId === action.payload.productId
      );
      if (!product) {
        throw new Error("Product doesn't exist in cart");
      }
      product.quantity++;
      setCartState(state);
      break;
    }

    default:
      break;
  }
};

export default cartReducer;
