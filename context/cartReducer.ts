import { IAction } from "../types";
import { ICartItem } from "../types";

const cartReducer = (state: ICartItem[], action: IAction): ICartItem[] => {
  switch (action.type) {
    case "addToCart": {
      // if (action.payload == null) {
      //   throw new Error(
      //     "Action payload can only be empty when calling emptyCart"
      //   );
      // }
      const cartItemExists = state.find(
        (cartItem) =>
          cartItem.product.productId === action.payload.product.productId
      );
      let newState = [];
      if (cartItemExists) {
        newState = [...state].map((cartItem) => {
          if (cartItem.product.productId === cartItemExists.product.productId) {
            cartItem.quantity = cartItem.quantity + action.payload?.quantity;
          }
          return cartItem;
        });
      } else {
        newState = [...state, action.payload];
      }
      return newState;
      break;
    }
    case "removeFromCart": {
      const newState = state.filter(
        (product) =>
          product.product.productId !== action.payload.product.productId
      );
      return newState;
      break;
    }
    case "decreaseQuantity": {
      const newState = [...state]
        .map((cartItem) => {
          if (cartItem.product.productId === action.payload.product.productId) {
            cartItem.quantity--;
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);
      return newState;
      break;
    }
    case "increaseQuantity": {
      const newState = [...state].map((cartItem) => {
        if (cartItem.product.productId === action.payload.product.productId) {
          cartItem.quantity++;
        }
        return cartItem;
      });
      return newState;
      break;
    }
    case "setQuantity": {
      const newState = [...state].map((cartItem) => {
        if (cartItem.product.productId === action.payload.product.productId) {
          cartItem.quantity = action.payload.quantity;
        }
        return cartItem;
      });
      return newState;
      break;
    }
    case "emptyCart": {
      const newState: ICartItem[] = [];
      return newState;
      break;
    }
  }
};

export default cartReducer;
