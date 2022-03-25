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
    <>
      <div className="flex flex-col space-y-3 items-center p-3 font-lato">
        {cartState.map((cartItem) => (
          <CartItem key={cartItem.product.productId} cartItem={cartItem} />
        ))}
        <div className="flex flex-row w-full max-w-lg justify-center space-x-3 items-center">
          <h2 className="text-xl">Subtotal: {getTotalPrice()}</h2>
          <button
            className="bg-black text-white p-2 w-2/3 rounded-lg"
            onClick={() => checkout(cartData)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
