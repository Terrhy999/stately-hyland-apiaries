import Link from "next/link";
import type { Product } from "../types/Product";
import Image from "next/image";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const productPrice = (product.unitAmount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { cartState, updateCart } = useContext(CartContext);

  return (
    <div className="rounded flex flex-col overflow-hidden font-lato bg-[#eee] drop-shadow-md">
      <Link href={`/products/${product.productId}`} passHref={true}>
        <div className="aspect-[3/4] relative">
          <Image
            src={product.images[0] ?? ""}
            alt="Product Image"
            layout="fill"
          />
        </div>
      </Link>
      <div className="w-full flex flex-col items-center justify-between">
        <div className="w-full p-2">
          <Link href={`/products/${product.productId}`} passHref={true}>
            <h4 className="font-semibold text-lg cursor-pointer w-full">
              {product.name}
            </h4>
          </Link>
          <span className="text-center self-start">{productPrice}</span>
        </div>
        <button
          className="w-full bg-black text-white p-2 hover:text-[#1abc9c]"
          onClick={() =>
            updateCart(cartState, { type: "addToCart", payload: product })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
