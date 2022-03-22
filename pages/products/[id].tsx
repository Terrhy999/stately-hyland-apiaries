import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Stripe from "stripe";
import { Product } from "../../types/Product";
import { FaCartPlus } from "react-icons/fa";
import Image from "next/image";

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
  return (
    <div className="flex flex-row justify-center w-full h-full">
      <div className="flex flex-col w-11/12 max-w-4xl">
        <h1 className="text-4xl text-black font-semibold py-3">
          {product.name}
        </h1>

        <div className="flex flex-row">
          {/* <img
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${product["image1"]}`}
            className="aspect-[3/4] w-1/2"
          ></img> */}
          <div className="aspect-[3/4] relative">
            <Image
              src={product.images[0] ?? ""}
              alt="Product Image"
              layout="fill"
            />
          </div>

          <div className="flex flex-col w-1/2 p-3">
            <p className="text-xl">
              {(product.unitAmount / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="underline text-lg pb-1">Description:</p>
            <p>{product.description}</p>
            <p>{product.name}</p>
            <div className="flex flex-row w-full rounded items-center bg-black justify-center cursor-pointer">
              <span className="text-white text-lg">Add To Cart</span>
              <FaCartPlus className="text-white pl-2 w-9 h-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
