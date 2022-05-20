import Hamburger from "hamburger-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ICartItem } from "../types/CartItem";

const NavbarMobile = () => {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

  const { cartState } = useContext(CartContext);

  const getCartCount = () => {
    const reducer = (accumulator: number, item: ICartItem) =>
      accumulator + item.quantity;
    return cartState.reduce(reducer, 0);
  };

  return (
    <nav className="md:hidden flex flex-col w-full bg-[#1d1d1d] font-lato z-30 sticky top-0">
      <div className="flex w-full z-30 bg-[#1d1d1d] justify-between text-white p-1 px-5">
        <Hamburger toggled={isOpen} toggle={setOpen} color="white" />
        <Link href={"/"} passHref={true}>
          <div className="font-bold cursor-pointer uppercase text-2xl self-center">
            SHA
          </div>
        </Link>
        <Link href={"/Cart"} passHref={true}>
          <div className="text-xl cursor-pointer order-last self-center">
            Cart ({getCartCount()})
          </div>
        </Link>
      </div>
      <div
        className={`text-white bg-[#1d1d1d] w-full z-20 mt-14 -translate-y-full absolute flex flex-col p-3 transform-gpu transition-transform ease-in-out duration-500 ${
          isOpen ? "transform-none" : ""
        }`}
        onClick={() => setOpen(false)}
      >
        <Link href="/">
          <a
            className={`p-2 mx-2 text-white rounded text-lg ${
              router.pathname === "/" ? "text-[#1abc9c]" : ""
            }`}
          >
            Blog
          </a>
        </Link>
        <Link href="/Shop">
          <a
            className={`p-2 mx-2 text-white rounded text-lg ${
              router.pathname === "/Shop" ? "text-[#1abc9c]" : ""
            }`}
          >
            Shop
          </a>
        </Link>
        <Link href="/Resources">
          <a
            className={`p-2 mx-2 text-white rounded text-lg ${
              router.pathname === "/Resources" ? "text-[#1abc9c]" : ""
            }`}
          >
            Resources
          </a>
        </Link>
        <Link href="/About">
          <a
            className={`p-2 mx-2 text-white rounded text-lg ${
              router.pathname === "/About" ? "text-[#1abc9c]" : ""
            }`}
          >
            About
          </a>
        </Link>
      </div>
      <div
        className={`bg-black absolute top-0 z-10 w-full h-screen transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-50" : "opacity-0 invisible"
        }`}
        onClick={() => {
          setOpen(false);
        }}
      ></div>
    </nav>
  );
};

export default NavbarMobile;
