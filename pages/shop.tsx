import Head from "next/head";
import { getAllProductsWithPrices } from "../lib/stripeUtils";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../types";

export async function getStaticProps() {
  const productsWithPrices = await getAllProductsWithPrices();
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

  // const sortProductType = (a: IProduct, b: IProduct) => {
  //   if (
  //     a.metadata.productType === "honey" &&
  //     b.metadata.productType === "candle"
  //   )
  //     return -1;
  //   if (
  //     a.metadata.productType === "candle" &&
  //     b.metadata.productType === "honey"
  //   )
  //     return 1;
  //   else return 0;
  // };

  const sortProductType = (a: IProduct, b: IProduct) => {
    const priorityOrder: { [key: string]: number } = {
      gift: 1,
      honey: 2,
      candle: 3,
    };

    const typeA = a.metadata.productType;
    const typeB = b.metadata.productType;

    return (priorityOrder[typeA] || 4) - (priorityOrder[typeB] || 4);
  };

  const honeyTypeSort = {
    light: 1,
    honeydew: 2,
    dark: 3,
    creamed: 4,
  };

  const sortHoneyType = (a: IProduct, b: IProduct) => {
    if (
      a.metadata.productType === "honey" &&
      b.metadata.productType === "honey"
    ) {
      return (
        honeyTypeSort[b.metadata.honeyType!] -
        honeyTypeSort[a.metadata.honeyType!]
      );
    }
    return 0;
  };

  const sortHoneyWeight = (a: IProduct, b: IProduct) => {
    if (
      a.metadata.honeyType === b.metadata.honeyType ||
      (a.metadata.productType === "candle" &&
        b.metadata.productType === "candle")
    ) {
      return b.metadata.weightOz - a.metadata.weightOz;
    }
    return 0;
  };

  const sortedProducts = products
    .sort(sortProductType)
    .sort(sortHoneyType)
    .sort(sortHoneyWeight);

  return (
    <>
      <Head>
        <title>Shop - SHA</title>
      </Head>
      <div className="w-full">
        <h2 className="font-lato text-3xl font-bold pb-5">Shop</h2>
        <div className="min-w-full flex flex-col justify-center">
          <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {sortedProducts.map((product) => (
              <ProductCard product={product} key={product.productId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
