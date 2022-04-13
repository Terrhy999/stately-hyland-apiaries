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
      className="flex flex-row w-full h-48 items-center py-2"
    >
      <div className="aspect-[3/4] relative h-full rounded overflow-hidden shrink-0">
        <Image
          src={cartItem.product.images[0] ?? ""}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-between pl-2 sm:flex-row sm:items-center">
        <p className="flex justify-center text-lg sm:basis-1/2 sm:justify-start sm:text-xl">
          {cartItem.product.name}
        </p>
        <div className="flex justify-center sm:basis-1/6">
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
        <p className="flex text-lg justify-center sm:justify-end sm:basis-1/6">
          {getReadablePrice(cartItem.product.unitAmount, cartItem.quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
