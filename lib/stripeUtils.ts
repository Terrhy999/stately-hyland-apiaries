import Stripe from "stripe";
import { IProduct } from "../types";

export const connectToStripe = () => {
  if (process.env["STRIPE_SECRET_KEY"] == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  return new Stripe(process.env["STRIPE_SECRET_KEY"], {
    apiVersion: "2020-08-27",
  });
};

export const connectToTestStripe = () => {
  if (process.env["STRIPE_SECRET_KEY_TEST"] == undefined) {
    throw new Error("Missing Stripe secret key");
  }
  return new Stripe(process.env["STRIPE_SECRET_KEY_TEST"], {
    apiVersion: "2020-08-27",
  });
};

export const getAllProductsWithPrices = async () => {
  const stripe = connectToStripe();

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

    if (
      product.metadata["productType"] == null ||
      (product.metadata["productType"] !== "honey" &&
        product.metadata["productType"] !== "candle")
    ) {
      console.log(product);
      throw new Error(
        `Product ${product.name} has a missing or mistyped "productType" metadata, should only be 'honey' or 'candle'`
      );
    }

    if (product.metadata["productType"] === "honey") {
      if (
        product.metadata["honeyType"] == null ||
        (product.metadata["honeyType"] !== "light" &&
          product.metadata["honeyType"] !== "dark" &&
          product.metadata["honeyType"] !== "creamed" &&
          product.metadata["honeyType"] !== "honeydew")
      ) {
        console.log(product);
        throw new Error(
          `Product ${product.name} is a honey product but has a missing or mistyped "honeyType" metadata, should only be 'light', 'dark', 'honeydew', or 'creamed'`
        );
      }
    }

    if (
      product.metadata["honeyType"] != null &&
      product.metadata["honeyType"] !== "light" &&
      product.metadata["honeyType"] !== "dark" &&
      product.metadata["honeyType"] !== "creamed" &&
      product.metadata["honeyType"] !== "honeydew"
    ) {
      console.log(product);
      throw new Error(
        `Product ${product.name} is not a honey product but has a mistyped "honeyType" metadata, should only be 'light', 'dark', 'creamed', or null`
      );
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
  return productsWithPrices;
};

export const getProductWithPrice = async (id: string) => {
  const stripe = connectToTestStripe();
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

  if (
    product.metadata["productType"] == null ||
    (product.metadata["productType"] !== "honey" &&
      product.metadata["productType"] !== "candle")
  ) {
    console.log(product);
    throw new Error(
      `Product ${product.name} has a missing or mistyped "productType" metadata, should only be 'honey' or 'candle'`
    );
  }

  if (product.metadata["productType"] === "honey") {
    if (
      product.metadata["honeyType"] == null ||
      (product.metadata["honeyType"] !== "light" &&
        product.metadata["honeyType"] !== "dark" &&
        product.metadata["honeyType"] !== "creamed" &&
        product.metadata["honeyType"] !== "honeydew")
    ) {
      console.log(product);
      throw new Error(
        `Product ${product.name} is a honey product but has a missing or mistyped "honeyType" metadata, should only be 'light', 'dark', or 'creamed'`
      );
    }
  }

  if (
    product.metadata["honeyType"] != null &&
    product.metadata["honeyType"] !== "light" &&
    product.metadata["honeyType"] !== "dark" &&
    product.metadata["honeyType"] !== "creamed" &&
    product.metadata["honeyType"] !== "honeydew"
  ) {
    console.log(product);
    throw new Error(
      `Product ${product.name} is not a honey product but has a mistyped "honeyType" metadata, should only be 'light', 'dark', 'creamed', or null`
    );
  }

  const productWithPrice: IProduct = {
    name: product.name,
    productId: product.id,
    images: product.images,
    priceId: priceId,
    unitAmount: price,
    description: product.description ?? "",
    metadata: {
      weightOz: Number(product.metadata["weightOz"]),
      productType: product.metadata["productType"],
      honeyType: product.metadata["honeyType"] || null,
    },
  };
  return productWithPrice;
};
