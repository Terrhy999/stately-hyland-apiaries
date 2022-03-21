import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Product } from "../types/Product";

const Navbar = () => {
  const router = useRouter();

  const { cartState } = useContext(CartContext);

  const getCartCount = () => {
    const reducer = (accumulator: number, item: Product) =>
      accumulator + item.quantity;
    return cartState.reduce(reducer, 0);
  };

  return (
    <nav className="flex flex-col bg-[url('https://statelyhylandmanor.com/wp-content/uploads/2020/08/cropped-20200605_200148-PANO-scaled-1.jpg')] bg-center bg-no-repeat bg-cover w-full">
      <div className="flex flex-row justify-center items-center p-1 px-4 z-20 h-96">
        <div className="bg-[#1d1d1d] divide-y-2 divide-[rgba(255, 255, 255, 0.1)] p-4">
          <h6 className="font-bold font-Raleway tracking-wider text-4xl text-center m-4 text-white">
            STATELY HYLAND APIARIES
          </h6>
          <h2 className="text-white font-Raleway text-xl text-center p-4">
            Seasoned, Orginizatioal Wisdom ~ from a mom of three boys.
          </h2>
        </div>
      </div>
      <div className="bg-[#1d1d1d] py-3 flex justify-center">
        <div className="flex flex-row w-full font-lato max-w-xl">
          <Link href="/">
            <a
              className={`p-2 mx-1 hover:text-white rounded text-lg ${
                router.pathname === "/" ? "text-[#1abc9c]" : "text-white"
              }`}
            >
              Home
            </a>
          </Link>
          <Link href="/shop">
            <a
              className={`p-2 mx-1 hover:text-white rounded text-lg ${
                router.pathname === "/shop" ? "text-[#1abc9c]" : "text-white"
              }`}
            >
              Shop
            </a>
          </Link>
          <div>Cart({getCartCount()}) </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
