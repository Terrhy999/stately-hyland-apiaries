import { createContext, FC, useState } from "react";
import { Action } from "../types/Action";
import type { Product } from "../types/Product";
import cartReducer from "./cartReducer";

export interface CartContextType {
  cartState: Product[];
  updateCart: (
    state: Product[],
    action: { type: string; payload: Product }
  ) => void;
}

const defaultState: CartContextType = {
  cartState: [],
  updateCart: () => null,
};
export const CartContext = createContext<CartContextType>(defaultState);

const CartProvider: FC = ({ children }) => {
  const [cartState, setCartState] = useState(defaultState.cartState);

  const updateCart = (state: Product[], action: Action) =>
    cartReducer(state, action, setCartState);

  return (
    <CartContext.Provider value={{ cartState, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
