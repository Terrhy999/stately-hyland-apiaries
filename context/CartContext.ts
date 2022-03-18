import { createContext, useContext, useMemo } from "react";

const defaultState = {
  cart: [],
};

const CartContext = createContext(defaultState);

export default CartContext;
