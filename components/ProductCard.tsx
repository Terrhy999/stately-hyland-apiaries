import Link from "next/link";
import type { Product } from "../types/Product";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="rounded flex flex-col overflow-hidden font-lato bg-[#eee] drop-shadow-md">
      <Link href={"/"}>
        <img className="aspect-[1/1] object-cover" src={product.images[0]} />
      </Link>
      <div className="w-full flex flex-col items-center justify-between h-full">
        <div className="w-full p-2">
          <Link href={"/"}>
            <h4 className="font-semibold text-lg cursor-pointer w-full">
              {product.name}
            </h4>
          </Link>
          <span className="text-center self-start">{product}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
