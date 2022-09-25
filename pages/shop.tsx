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

  const sortedProducts = products.sort((a, b) => {
    if (a.metadata.productType === b.metadata.productType) {
      return a.name.localeCompare(b.name);
    } else {
      if (a.metadata.productType === "honey") {
        return -1;
      }
      return 1;
    }
  });

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
