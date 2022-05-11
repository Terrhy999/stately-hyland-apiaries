import Head from "next/head";
import { useContext } from "react";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartState } = useContext(CartContext);

  return (
    <>
      <Head>
        <title>Cart - SHA</title>
      </Head>
      <div className="flex flex-col lg:flex-row font-lato w-full">
        {cartState.length !== 0 ? (
          <>
            <CheckoutButton />
            <div className="flex flex-col w-full space-y-4 items-center font-lato">
              {cartState.map((cartItem) => (
                <CartItem
                  key={cartItem.product.productId}
                  cartItem={cartItem}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="self-center sm:self-start text-center w-full text-lg">
            Cart is empty
          </p>
        )}
      </div>
    </>
  );
};

export default Cart;
