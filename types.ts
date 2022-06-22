export interface IMeta {
  title: string;
  date: string;
  caption: string;
  thumbnail: string;
  slug: string;
}

export interface IFrontmatter {
  title: string;
  date: string;
  thumbnail: string;
}

export interface IPost {
  frontmatter: IFrontmatter;
  content: string;
  slug: string;
}

export interface IProduct {
  name: string;
  productId: string;
  images: string[];
  priceId: string;
  unitAmount: number;
  description: string;
  metadata: {
    productType: "honey" | "candle";
    weightOz: number;
    honeyType: "light" | "dark" | "creamed" | null;
  };
}

export interface IPostImage {
  src: string;
  height: number;
  width: number;
  alt: string;
  justify: "start" | "end" | "center";
  caption?: string;
}

export interface IPostImageAndText {
  src: string;
  width: number;
  height: number;
  paragraphs: string[];
  imageJustify?: "left" | "right";
  percentageWidth?: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IAction {
  type:
    | "addToCart"
    | "removeFromCart"
    | "decreaseQuantity"
    | "increaseQuantity"
    | "setQuantity";
  payload: ICartItem;
}
