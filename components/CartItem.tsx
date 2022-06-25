import Image from "next/image";
import { useContext } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import { ICartItem } from "../types";

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
      className="flex flex-row w-full h-40 items-center"
    >
      <div className="aspect-[3/3] relative h-full rounded overflow-hidden shrink-0">
        <Image
          src={cartItem.product.images[0] ?? ""}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-between pl-2 sm:flex-row sm:items-center lg:items-start">
        <div>
          <p className="flex text-lg sm:basis-1/2">{cartItem.product.name}</p>
          <p className="flex font-bold sm:basis-1/6">
            {getReadablePrice(cartItem.product.unitAmount, cartItem.quantity)}
          </p>
        </div>
        <div className="flex flex-row justify-center items-center text-center border bg-white border-black p-3">
          <div className="flex flex-row justify-center items-center">
            <span className="hidden sm:block">Quantity</span>
            <FaAngleLeft
              className={`mx-2 h-6 w-6 cursor-pointer hover:text-shaGreen ${
                cartItem.quantity == 1
                  ? "text-gray-300 pointer-events-none"
                  : ""
              }`}
              onClick={() =>
                updateCart(cartState, {
                  type: "decreaseQuantity",
                  payload: cartItem,
                })
              }
            />
            <input
              className="w-6 text-center"
              value={cartItem.quantity}
              onChange={(e) => {
                if (
                  Number(e.target.value) > 99 ||
                  Number(e.target.value) < 1 ||
                  isNaN(Number(e.target.value))
                ) {
                  return;
                } else {
                  updateCart(cartState, {
                    type: "setQuantity",
                    payload: { ...cartItem, quantity: Number(e.target.value) },
                  });
                }
              }}
            />
            <FaAngleRight
              className="mx-2 h-6 w-6 cursor-pointer hover:text-shaGreen"
              onClick={() =>
                updateCart(cartState, {
                  type: "increaseQuantity",
                  payload: cartItem,
                })
              }
            />
            <MdDelete
              className="mx-2 h-6 w-6 cursor-pointer hover:text-[#1amc9c]"
              onClick={() =>
                updateCart(cartState, {
                  type: "removeFromCart",
                  payload: cartItem,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
