import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Stripe from "stripe";
import { Product } from "../../types/Product";
import Image from "next/image";
import { CartContext } from "../../context/CartContext";
import { useContext, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env["STRIPE_SECRET_KEY"] == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"], {
    apiVersion: "2020-08-27",
  });

  const productsObject = await stripe.products.list();
  const products = productsObject.data;
  const paths = products.map((product) => ({ params: { id: product.id } }));
  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (process.env["STRIPE_SECRET_KEY"] == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"], {
    apiVersion: "2020-08-27",
  });

  const { id } = context.params as Params;
  const product = await stripe.products.retrieve(id);

  const pricesObject = await stripe.prices.list({ product: product.id });
  const priceObject = pricesObject.data[0];

  if (!priceObject) {
    throw new Error("Cannot find Price object for specified Product ID");
  }

  const price = priceObject["unit_amount"];
  const priceId = priceObject["id"];

  if (price === null) {
    throw new Error("No unit price for this product");
  }

  const productWithPrice: Product = {
    name: product.name,
    productId: product.id,
    images: product.images,
    priceId: priceId,
    unitAmount: price,
    description: product.description ?? "",
  };
  return {
    props: { product: productWithPrice },
  };
};

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const getPriceLocaleString = () =>
    (product.unitAmount / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const [quantity, setQuantity] = useState(1);
  const { cartState, updateCart } = useContext(CartContext);

  return (
    <div className="flex flex-col p-3 lg:p-5 w-full lg:flex-row lg:max-h-[600px]">
      <div className="aspect-[5/4] mb-4 lg:mb-0 relative rounded overflow-hidden flex-shrink-0 lg:aspect-[3/4] lg:min-w-[40%]">
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
        <p className="text-xl">{getPriceLocaleString()}</p>
        <p className="py-5 text-lg flex-grow">{product.description}</p>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row justify-between items-center text-center border bg-white border-black p-3 mb-3 md:mb-0 md:mr-3">
            <span className="pl-2 pr-4">Quantity</span>
            <div className="flex flex-row justify-center items-center">
              <FaAngleLeft
                className="mx-2 h-6 w-6 cursor-pointer hover:text-[#1abc9c]"
                onClick={() => setQuantity(quantity - 1)}
              />
              <input
                type="numeric"
                value={quantity}
                className="w-6 text-center"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <FaAngleRight
                className="mx-2 h-6 w-6 cursor-pointer hover:text-[#1abc9c]"
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>
          </div>
          <button
            className="bg-black text-white font-bold p-3 flex-grow hover:text-[#1abc9c]"
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
      </div>
    </div>
  );
};

export default ProductPage;
