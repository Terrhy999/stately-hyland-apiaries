import { InferGetStaticPropsType } from "next";
import Stripe from "stripe";
import ProductCard from "../components/ProductCard";

export async function getStaticProps() {
  if (process.env.STRIPE_SECRET_KEY == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const productsObject = await stripe.products.list();
  const pricesObject = await stripe.prices.list();
  const products = productsObject.data;
  const prices = pricesObject.data;

  const productsWithPrices = products.map((product) => {
    const priceForProductObject = prices.find(
      (price) => price.product === product.id
    );
    if (priceForProductObject == null) {
      throw new Error("No product with this price");
    }

    const priceForProduct = priceForProductObject["unit_amount"];
    if (priceForProduct == null) {
      throw new Error("Unit Amount property is null");
    }

    return {
      name: product.name,
      productId: product.id,
      priceId: priceForProductObject["id"],
      unitAmount: priceForProduct,
      images: product.images,
    };
  });
  return {
    props: { products: productsWithPrices },
  };
}

const shop = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="min-w-full flex flex-col justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-3 gap-5">
        {products.map((product) => (
          <ProductCard product={product} key={product.productId} />
        ))}
      </div>
    </div>
  );
};

export default shop;
