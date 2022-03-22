import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
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
    <div className="flex flex-col w-full space-y-3 items-center p-3">
      {cartState.map((cartItem) => (
        <div
          key={cartItem.product.productId}
          className="flex flex-row w-5/6 max-w-2xl h-24 items-center"
        >
          <div className="aspect-[3/4] relative h-full">
            <Image
              src={cartItem.product.images[0] ?? ""}
              alt="Product Image"
              layout="fill"
            />
          </div>
          <div className="w-full h-full flex flex-row justify-between">
            <p className=" basis-1/3 flex pl-3">{cartItem.product.name}</p>
            <div className="flex justify-ce">
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
              <button className="h-8 w-8 text-center text-white bg-black border border-black">
                +
              </button>
            </div>
            <p className="basis-1/3 flex">
              {getReadablePrice(cartItem.product.unitAmount, cartItem.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
