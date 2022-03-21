import { Dispatch, SetStateAction } from "react";
import { Action } from "../types/Action";
import { Product } from "../types/Product";

const cartReducer = (
  state: Product[],
  action: Action,
  setCartState: Dispatch<SetStateAction<Product[]>>
) => {
  switch (action.type) {
    case "addToCart": {
      const newCart = [...state, action.payload];
      setCartState(newCart);
      break;
    }

    default:
      break;
  }
};

export default cartReducer;
