import { InferGetStaticPropsType } from "next";
import Stripe from "stripe";

export async function getStaticProps() {
  if (process.env.STRIPE_SECRET_KEY == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const productsObject = await stripe.products.list({ active: true });
  const pricesObject = await stripe.prices.list({ active: true });
  const products = productsObject.data;
  const prices = pricesObject.data;

  const productsWithPrices = products.map((product) => {
    const priceForProduct = prices.find(
      (price) => price.product === product.id
    );
    if (priceForProduct == undefined) {
      throw new Error("No product with this price");
    }
    const priceUnitAmount = priceForProduct["unit_amount"];
    const priceId = priceForProduct["id"];
    return {
      name: product.name,
      productId: product.id,
      priceId: priceId,
      unitAmount: priceUnitAmount,
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
          <div key={product.productId}>{product.name}</div>
        ))}
      </div>
    </div>
  );
};

export default shop;
