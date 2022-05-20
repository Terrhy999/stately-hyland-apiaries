import Head from "next/head";
import Stripe from "stripe";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";

export async function getStaticProps() {
  if (process.env["STRIPE_SECRET_KEY"] == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"], {
    apiVersion: "2020-08-27",
  });

  const productsObject = await stripe.products.list({ active: true });
  const products = productsObject.data;

  const pricesObject = await stripe.prices.list();
  const prices = pricesObject.data;

  const productsWithPrices: Product[] = products.map((product) => {
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

    const products: Product = {
      name: product.name,
      productId: product.id,
      priceId: priceForProductObject["id"],
      unitAmount: priceForProduct,
      images: product.images,
      description: product.description ?? "",
      metadata: {
        weight: Number(product.metadata["weight"]) || 0,
        color: product.metadata["color"] || "",
        type: product.metadata["type"] || "",
      },
    };

    return products;
  });
  return {
    props: { products: productsWithPrices },
  };
}

const Shop = ({ products }: { products: Product[] }) => {
  return (
    <>
      <Head>
        <title>Shop - SHA</title>
      </Head>
      <div className="w-full">
        <h2 className="font-lato text-3xl font-bold pb-5">Shop</h2>
        <div></div>
        <div className="min-w-full flex flex-col justify-center">
          <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard product={product} key={product.productId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
