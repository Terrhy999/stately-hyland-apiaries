import { GetStaticPaths, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { IProduct } from "../../types";
import Image from "next/image";
import { CartContext } from "../../context/CartContext";
import { useContext, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { getPriceLocaleString } from "../../lib/utils";
import { connectToStripe, getProductWithPrice } from "../../lib/stripeUtils";

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = connectToStripe();

  const productsObject = await stripe.products.list({
    limit: 100,
    active: true,
  });
  const products = productsObject.data;
  const paths = products.map((product) => ({ params: { id: product.id } }));
  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params as Params;
  const productWithPrice = await getProductWithPrice(id);
  return {
    props: { product: productWithPrice },
  };
};

const ProductPage = ({ product }: { product: IProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const { cartState, updateCart } = useContext(CartContext);

  return (
    <div className="flex flex-col p-3 lg:p-5 w-full lg:flex-row lg:max-h-[600px]">
      <div className="aspect-square mb-4 lg:mb-0 relative rounded overflow-hidden flex-shrink-0 lg:aspect-[4/5] lg:min-w-[40%]">
        <Image
          src={product.images[0] ?? ""}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
        />
      </div>

      <div className="flex flex-col h-full font-lato lg:pl-14">
        <h2 className="text-4xl text-black font-bold pb-2 uppercase lg:pt-0">
          {product.name}
        </h2>
        <p className="text-xl">{getPriceLocaleString(product)}</p>
        <p className="py-5 text-lg flex-grow">{product.description}</p>
        {product.metadata.stock === 0 ? (
          <div className="flex flex-row justify-center">
            <span className="text-lg">Temporarily out of Stock</span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-row justify-between items-center text-center border bg-white border-black p-3 mb-3 md:mb-0 md:mr-3">
              <span className="pl-2 pr-4">Quantity</span>
              <div className="flex flex-row justify-center items-center">
                <FaAngleLeft
                  className="mx-2 h-6 w-6 cursor-pointer hover:text-shaGreen"
                  onClick={() => setQuantity(quantity - 1)}
                />
                <input
                  type="numeric"
                  value={quantity}
                  className="w-6 text-center"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <FaAngleRight
                  className="mx-2 h-6 w-6 cursor-pointer hover:text-shaGreen"
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
            <button
              className="bg-black text-white font-bold p-3 flex-grow hover:text-shaGreen"
              onClick={() =>
                updateCart(cartState, {
                  type: "addToCart",
                  payload: { product, quantity },
                })
              }
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
