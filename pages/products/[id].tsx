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
import { useContext } from "react";

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

  const { cartState, updateCart } = useContext(CartContext);

  return (
    <div className="flex flex-col justify-center p-3 w-full lg:flex-row lg:max-w-5xl lg:bg-white lg:drop-shadow-md lg:rounded lg:mt-3">
      <div className="aspect-[5/4] relative rounded overflow-hidden flex-shrink-0 lg:aspect-[3/4] lg:min-w-[40%]">
        <Image
          src={product.images[0] ?? ""}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
        />
      </div>

      <div className="flex flex-col font-lato lg:pl-4">
        <h1 className="text-3xl text-black font-bold pt-1 lg:pt-0">
          {product.name}
        </h1>
        <p className="text-lg">{getPriceLocaleString()}</p>
        <p className="py-3 flex-grow">{product.description}</p>
        <button
          className="bg-black text-white font-bold p-2 rounded hover:text-[#1abc9c]"
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

export default ProductPage;
