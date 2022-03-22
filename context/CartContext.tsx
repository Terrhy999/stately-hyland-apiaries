import { createContext, FC, useState } from "react";
import { Action } from "../types/Action";
import type { CartItem } from "../types/CartItem";
import cartReducer from "./cartReducer";

export interface CartContextType {
  cartState: CartItem[];
  updateCart: (state: CartItem[], action: Action) => void;
}

const defaultState: CartContextType = {
  cartState: [],
  updateCart: () => null,
};
export const CartContext = createContext<CartContextType>(defaultState);

const CartProvider: FC = ({ children }) => {
  const [cartState, setCartState] = useState(defaultState.cartState);

  const updateCart = (state: CartItem[], action: Action) =>
    cartReducer(state, action, setCartState);

  return (
    <CartContext.Provider value={{ cartState, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
