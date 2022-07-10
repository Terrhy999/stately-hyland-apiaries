import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ICartItem } from "../types";
import bgImage from "../public/images/SHA-Banner.jpg";

const Navbar = () => {
  const router = useRouter();

  const { cartState } = useContext(CartContext);

  const getCartCount = () => {
    const reducer = (accumulator: number, item: ICartItem) =>
      accumulator + item.quantity;
    return cartState.reduce(reducer, 0);
  };

  return (
    <nav className="bg-shaBlack flex-col items-center w-full lg:mb-10 hidden md:flex">
      {router.pathname === "/" && (
        <div className="relative w-full h-96">
          <Image
            src={bgImage}
            alt="bg image"
            layout="fill"
            objectFit="cover"
            className="-z-10"
          />
          <div className="bg-shaBlack divide-y-2 divide-[rgba(255, 255, 255, 0.1)]">
            <h6 className="font-bold font-Raleway tracking-wider text-4xl text-center m-4 text-white">
              STATELY HYLAND MANOR
            </h6>
            <h2 className="text-white font-Raleway text-xl text-center p-4">
              Seasoned, Organizational Wisdom ~ from a mom of three boys.
            </h2>
          </div>
        </div>
      )}
      <div className="font-lato text-white py-2 flex justify-between w-full max-w-7xl">
        <Link href={"/"} passHref={true}>
          <p className={`p-2 mx-1 text-xl font-bold cursor-pointer sm:hidden`}>
            SHM
          </p>
        </Link>
        <Link href={"/"} passHref={true}>
          <p
            className={`p-2 mx-1 text-xl font-bold cursor-pointer hidden sm:block`}
          >
            Stately Hyland Manor
          </p>
        </Link>
        <div className="flex flex-row">
          <Link href="/">
            <a
              className={`p-2 mx-1 text-lg ${
                router.pathname === "/" ? "text-shaGreen" : ""
              }`}
            >
              Blog
            </a>
          </Link>
          <Link href="/resources">
            <a
              className={`p-2 mx-1 hover:text-white rounded text-lg ${
                router.pathname === "/resources" ? "text-shaGreen" : ""
              }`}
            >
              Beekeeping Resources
            </a>
          </Link>
          <Link href="/shop">
            <a
              className={`p-2 mx-1 hover:text-white rounded text-lg ${
                router.pathname === "/shop" ? "text-shaGreen" : ""
              }`}
            >
              Shop
            </a>
          </Link>
          <Link href="/cart">
            <a
              className={`p-2 mx-1 hover:text-white rounded text-lg ${
                router.pathname === "/cart" ? "text-shaGreen" : ""
              }`}
            >
              Cart ({getCartCount()})
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
