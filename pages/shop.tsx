import { InferGetStaticPropsType } from "next";
import Stripe from "stripe";

export async function getStaticProps() {
  if (process.env.STRIPE_SECRET_KEY == undefined) {
    throw new Error("Missing Stripe secret key");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });
  const products = await stripe.products.list({ active: true });

  return {
    props: { products: products.data },
  };
}

const shop = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="min-w-full flex flex-col justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-3 gap-5">
        {products.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
};

export default shop;
