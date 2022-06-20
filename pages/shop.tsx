import Head from "next/head";
// import { useState } from "react";
import Stripe from "stripe";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../types";
// import { FaAngleDown } from "react-icons/fa";

export async function getStaticProps() {
  if (process.env["STRIPE_SECRET_KEY"] == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"], {
    apiVersion: "2020-08-27",
  });

  const productsObject = await stripe.products.list({
    active: true,
    limit: 100,
  });
  const products = productsObject.data;

  const pricesObject = await stripe.prices.list({ limit: 100 });
  const prices = pricesObject.data;

  const productsWithPrices: IProduct[] = products.map((product) => {
    const priceObjectForProduct = prices.find(
      (price) => price.product === product.id
    );
    if (priceObjectForProduct == null) {
      throw new Error(`Product ${product.name} has no associated price object`);
    }

    const priceForProduct = priceObjectForProduct["unit_amount"];
    if (priceForProduct == null) {
      throw new Error(
        `Price ${priceObjectForProduct.id} is missing "unit_amount" property`
      );
    }

    if (product.metadata["productType"] == null) {
      throw new Error(
        `Product ${product.name} is missing "productType" metadata`
      );
    }

    if (product.metadata["productType"] === "honey") {
      if (product.metadata["honeyType"] == null) {
        throw new Error(
          `Product ${product.name} is a honey product but is missing "honeyType" metadata`
        );
      }
    }

    const finalProduct: IProduct = {
      name: product.name,
      productId: product.id,
      priceId: priceObjectForProduct["id"],
      unitAmount: priceForProduct,
      images: product.images,
      description: product.description ?? "",
      metadata: {
        productType: product.metadata["productType"],
        weightOz: Number(product.metadata["weightOz"]),
        honeyType: product.metadata["honeyType"] || null,
      },
    };

    return finalProduct;
  });
  return {
    props: { products: productsWithPrices },
  };
}

const Shop = ({ products }: { products: IProduct[] }) => {
  // interface IFilter {
  //   honey: boolean;
  //   candle: boolean;
  //   lightHoney: boolean;
  //   darkHoney: boolean;
  //   creamedHoney: boolean;
  // }

  // const initialFilter: IFilter = {
  //   honey: true,
  //   candle: true,
  //   lightHoney: true,
  //   darkHoney: true,
  //   creamedHoney: true,
  // };

  // type category =
  //   | "honey"
  //   | "candle"
  //   | "lightHoney"
  //   | "darkHoney"
  //   | "creamedHoney";

  // const [productFilters, setProductFilters] = useState(initialFilter);
  // const [displayedProducts, setDisplayedProducts] = useState(products);

  // const updateFilters = (category: category) => {
  //   const newFilters: IFilter = {
  //     ...productFilters,
  //     [category]: !productFilters[category],
  //   };

  //   setProductFilters(newFilters);

  //   setDisplayedProducts(getFilteredProducts(newFilters));
  // };

  // const getFilteredProducts = (filters: IFilter) => {
  //   const enabledFilters = Object.keys(filters).filter(
  //     (key) => filters[key as keyof IFilter]
  //   );

  //   const filteredProducts = products.filter((product) => {
  //     if (enabledFilters.includes(product.metadata["productType"])) {
  //       return product;
  //     }
  //     return;
  //   });
  //   return filteredProducts;
  // };

  return (
    <>
      <Head>
        <title>Shop - SHA</title>
      </Head>
      <div className="w-full">
        <h2 className="font-lato text-3xl font-bold pb-5">Shop</h2>
        {/* <div className="bg-white shadow-lg p-2 mb-5 rounded-md flex flex-row justify-between items-center hover:bg-gray-50">
          <span>Filter</span>
          <FaAngleDown />
        </div> */}
        {/* <div className="shadow-lg bg-white">
          <p className="hover:bg-gray-300">All</p>
          <p className="hover:bg-gray-300">Honey</p>
          <p className="hover:bg-gray-300">Candles</p>
        </div> */}
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
