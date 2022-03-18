import Link from "next/link";
import type { Product } from "../types/Product";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="rounded flex flex-col overflow-hidden font-lato bg-[#eee] drop-shadow-md">
      <Link href={"/"} passHref={true}>
        <div className="aspect-[3/4] relative">
          <Image src={product.images[0]} alt="Product Image" layout="fill" />
        </div>
      </Link>
      <div className="w-full flex flex-col items-center justify-between">
        <div className="w-full p-2">
          <Link href={"/"} passHref={true}>
            <h4 className="font-semibold text-lg cursor-pointer w-full">
              {product.name}
            </h4>
          </Link>
          <span className="text-center self-start">{product.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
