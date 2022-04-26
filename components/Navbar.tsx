import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ICartItem } from "../types/CartItem";

const Navbar = () => {
  const router = useRouter();

  const { cartState } = useContext(CartContext);

  const getCartCount = () => {
    const reducer = (accumulator: number, item: ICartItem) =>
      accumulator + item.quantity;
    return cartState.reduce(reducer, 0);
  };

  return (
    <nav className="bg-[#1d1d1d] flex flex-col items-center w-full lg:mb-10">
      {router.pathname === "/" && (
        <div
          className={`flex flex-row justify-center bg-no-repeat bg-cover bg-bottom w-full
          bg-[url('https://statelyhylandmanor.com/wp-content/uploads/2020/08/cropped-20200605_200148-PANO-scaled-1.jpg')] items-center p-1 px-4 z-20 h-96`}
        >
          <div className="bg-[#1d1d1d] divide-y-2 divide-[rgba(255, 255, 255, 0.1)] p-4">
            <h6 className="font-bold font-Raleway tracking-wider text-4xl text-center m-4 text-white">
              STATELY HYLAND APIARIES
            </h6>
            <h2 className="text-white font-Raleway text-xl text-center p-4">
              Seasoned, Orginizatioal Wisdom ~ from a mom of three boys.
            </h2>
          </div>
        </div>
      )}
      <div className="font-lato text-white py-2 flex justify-between w-full max-w-7xl">
        <p className={`p-2 mx-1 text-xl font-bold sm:hidden`}>SHA</p>
        <p className={`p-2 mx-1 text-xl font-bold hidden sm:block`}>
          Stately Hyland Apiaries
        </p>
        <div className="flex flex-row">
          <Link href="/">
            <a
              className={`p-2 mx-1 text-lg ${
                router.pathname === "/" ? "text-[#1abc9c]" : ""
              }`}
            >
              Home
            </a>
          </Link>
          <Link href="/Shop">
            <a
              className={`p-2 mx-1 hover:text-white rounded text-lg ${
                router.pathname === "/Shop" ? "text-[#1abc9c]" : ""
              }`}
            >
              Shop
            </a>
          </Link>
          <Link href="/Cart">
            <a
              className={`p-2 mx-1 hover:text-white rounded text-lg ${
                router.pathname === "/Cart" ? "text-[#1abc9c]" : ""
              }`}
            >
              Cart({getCartCount()})
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
