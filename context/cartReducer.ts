import { Action } from "../types/Action";
import { CartItem } from "../types/CartItem";

const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case "addToCart": {
      const cartItemExists = state.find(
        (product) => product.product.productId === action.payload.productId
      );
      let newState = [];
      if (cartItemExists) {
        newState = [...state].map((cartItem) => {
          if (cartItem.product.productId === cartItemExists.product.productId) {
            cartItem.quantity++;
          }
          return cartItem;
        });
      } else {
        newState = [...state, { product: action.payload, quantity: 1 }];
        // state.push({ product: action.payload, quantity: 1 });
      }
      // setCartState(newState);
      return newState;
      break;
    }
    case "removeFromCart": {
      const newState = state.filter(
        (product) => product.product.productId !== action.payload.productId
      );
      // setCartState(newState);
      return newState;
      break;
    }
    case "decreaseQuantity": {
      // const cartItemExists = state.find(
      //   cartItem => cartItem.product.productId === action.payload.productId
      // )
      const newState = [...state]
        .map((cartItem) => {
          if (cartItem.product.productId === action.payload.productId) {
            cartItem.quantity--;
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);
      // setCartState(newState);
      return newState;
      break;
    }
  }
};

export default cartReducer;
