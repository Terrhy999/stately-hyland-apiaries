import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import type { ICartItem } from "../types";

const CheckoutButton = () => {
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

  const testCartData = {
    price: "price_1JNiw4KnxKfZHThpe4RISccD",
    quantity: 2,
  };

  const checkout = async (cartData: { price: string; quantity: number }[]) => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      body: JSON.stringify([testCartData]),
    });
    const json = await res.json();
    const redirectUrl = json.url;
    window.location.href = redirectUrl;
  };

  return (
    <div className="flex flex-row lg:flex-col w-full items-center lg:items-end justify-between mb-3 lg:justify-start lg:order-last">
      <p className="w-40 p-2 bg-white border flex-grow lg:flex-grow-0 lg:w-4/5 lg:mb-3 border-black text-lg text-center">
        {getTotalPrice()}
      </p>
      <button
        className="bg-black border border-black text-white text-lg font-bold p-2 w-2/3 lg:w-4/5"
        onClick={() => checkout(cartData)}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutButton;
