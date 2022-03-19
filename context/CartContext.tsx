import { createContext, FC, useState } from "react";
import type { Product } from "../types/Product";

export interface CartContextType {
  cart: Product[];
  updateCart: (product: Product) => void;
}

const defaultState: CartContextType = {
  cart: [],
  updateCart: () => null,
};
export const CartContext = createContext<CartContextType>(defaultState);

const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState(defaultState.cart);
  const updateCart = (product: Product) => {
    setCart([...cart, product]);
    console.log(cart);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
