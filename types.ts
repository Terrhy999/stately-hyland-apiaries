export interface IPostCard {
  title: string;
  date: string;
  caption: string;
  imageAsset: IMainImageAsset;
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
  alt?: string;
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

export interface IImageMetadata {
  _type: string;
  blurhash: string;
  hasAlpha: boolean;
  isOpaque: boolean;
  lqip: string;
  palette: Record<string, unknown>;
  dimensions: {
    _type: string;
    aspectRatio: number;
    height: number;
    width: number;
  };
}

export interface IMainImageAsset {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "sanity.imageAsset";
  _updatedAt: string;
  assetId: string;
  extension: string;
  mimeType: string;
  originalFilename: string;
  path: string;
  sha1hash: string;
  size: number;
  uploadId: string;
  url: string;
  metadata: IImageMetadata;
}

export interface ISanityPost {
  _createdAt: string;
  caption: string;
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
  mainImage: {
    _type: "image";
    asset: IMainImageAsset;
  };
}
