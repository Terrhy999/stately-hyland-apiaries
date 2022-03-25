import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ICartItem } from "../types/CartItem";

const CartItem = ({ cartItem }: { cartItem: ICartItem }) => {
  const { cartState, updateCart } = useContext(CartContext);

  const getReadablePrice = (price: number, quantity: number) => {
    const dollarPrice = price / 100;
    const totalDollarPrice = dollarPrice * quantity;
    return totalDollarPrice.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div
      key={cartItem.product.productId}
      className="flex flex-row w-full max-w-2xl h-36 items-center"
    >
      <div className="aspect-[3/4] relative h-full rounded overflow-hidden shrink-0">
        <Image
          src={cartItem.product.images[0] ?? ""}
          alt="Product Image"
          layout="fill"
        />
      </div>
      <div className="w-full h-full pt-3 flex flex-row justify-between">
        <p className=" basis-1/3 flex text-lg justify-center">
          {cartItem.product.name}
        </p>
        <div className="flex basis-1/3 justify-center">
          <button
            className="h-8 w-8 text-center text-white bg-black border border-black"
            onClick={() =>
              updateCart(cartState, {
                type: "decreaseQuantity",
                payload: cartItem.product,
              })
            }
          >
            -
          </button>
          <button className="h-8 w-8 text-center border border-black">
            {cartItem.quantity}
          </button>
          <button
            className="h-8 w-8 text-center text-white bg-black border border-black"
            onClick={() =>
              updateCart(cartState, {
                type: "addToCart",
                payload: cartItem.product,
              })
            }
          >
            +
          </button>
        </div>
        <p className="basis-1/3 flex text-lg justify-center">
          {getReadablePrice(cartItem.product.unitAmount, cartItem.quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
