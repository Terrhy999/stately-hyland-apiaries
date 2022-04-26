import { Action } from "../types/Action";
import { ICartItem } from "../types/CartItem";

const cartReducer = (state: ICartItem[], action: Action): ICartItem[] => {
  switch (action.type) {
    case "addToCart": {
      const cartItemExists = state.find(
        (cartItem) =>
          cartItem.product.productId === action.payload.product.productId
      );
      let newState = [];
      if (cartItemExists) {
        newState = [...state].map((cartItem) => {
          if (cartItem.product.productId === cartItemExists.product.productId) {
            cartItem.quantity = cartItem.quantity + action.payload.quantity;
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
  }
};

export default cartReducer;
