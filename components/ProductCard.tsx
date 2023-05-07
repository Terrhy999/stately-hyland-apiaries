import Link from "next/link";
import type { IProduct } from "../types";
import Image from "next/image";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { getPriceLocaleString } from "../lib/utils";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { cartState, updateCart } = useContext(CartContext);

  return (
    <div className="rounded flex flex-col overflow-hidden font-lato bg-white drop-shadow-md">
      <Link href={`/products/${product.productId}`} passHref={true}>
        <div className="aspect-[1/1] cursor-pointer relative overflow-hidden">
          <Image
            src={product.images[0] || "https://via.placeholder.com/291"}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
          />
        </div>
      </Link>

      <div className="w-full flex flex-col items-center justify-between">
        <div className="w-full p-3">
          <Link href={`/products/${product.productId}`} passHref={true}>
            <h4 className="font-semibold text-lg cursor-pointer w-full">
              {product.name}
            </h4>
          </Link>
          <div className="mb-4">{getPriceLocaleString(product)}</div>
          {product.metadata.stock === 0 ? (
            <div className="bg-black text-white font-bold w-full p-2 hover:text-shaGreen text-center">
              Out of stock
            </div>
          ) : (
            <button
              className="bg-black text-white font-bold w-full p-2 hover:text-shaGreen"
              onClick={() =>
                updateCart(cartState, {
                  type: "addToCart",
                  payload: { product, quantity: 1 },
                })
              }
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
