import { useContext } from "react";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";
import type { ICartItem } from "../types/CartItem";

const Cart = () => {
  const { cartState } = useContext(CartContext);

  const getTotalPrice = () => {
    const reducer = (accumulator: number, item: ICartItem) =>
      accumulator + (item.product.unitAmount * item.quantity) / 100;
    const total = cartState
      .reduce(reducer, 0)
      .toLocaleString("en-US", { style: "currency", currency: "USD" });
    return total;
  };

  const cartData = cartState.map((item) => ({
    price: item.product.priceId,
    quantity: item.quantity,
  }));

  const checkout = async (cartData: { price: string; quantity: number }[]) => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      body: JSON.stringify(cartData),
    });
    const json = await res.json();
    const redirectUrl = json.url;
    window.location.href = redirectUrl;
  };

  return (
    <div className="flex flex-col font-lato w-full items-center justify-center p-2">
      <div className="flex flex-col w-full items-center p-3 font-lato divide-y divide-gray-600">
        {cartState.map((cartItem) => (
          <CartItem key={cartItem.product.productId} cartItem={cartItem} />
        ))}
      </div>
      <div className="flex flex-row w-full p-3 items-center pb-4 justify-between">
        <button
          className="bg-black text-white text-lg font-bold p-2 w-2/3 rounded-lg"
          onClick={() => checkout(cartData)}
        >
          Proceed to Checkout
        </button>
        <p className="flex-grow text-lg text-center sm:text-right">
          {getTotalPrice()}
        </p>
      </div>
    </div>
  );
};

export default Cart;
