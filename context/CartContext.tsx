import { createContext, FC, useEffect, useState } from "react";
import { IAction } from "../types";
import type { ICartItem } from "../types";
import cartReducer from "./cartReducer";

export interface CartContextType {
  cartState: ICartItem[];
  updateCart: (state: ICartItem[], action: IAction) => void;
}

const defaultState: CartContextType = {
  cartState: [],
  updateCart: () => null,
};

export const CartContext = createContext<CartContextType>(defaultState);

const CartProvider: FC = ({ children }) => {
  const [cartState, setCartState] = useState(defaultState.cartState);

  useEffect(() => {
    const localCartString = localStorage.getItem("cart");
    if (localCartString) {
      const localCart = JSON.parse(localCartString);
      setCartState(localCart);
    }
  }, []);

  const updateCart = (state: ICartItem[], action: IAction) => {
    const newState = cartReducer(state, action);
    setCartState(newState);
    localStorage.setItem("cart", JSON.stringify(newState));
  };
  return (
    <CartContext.Provider value={{ cartState, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
