export interface Product {
  name: string;
  productId: string;
  images: string[];
  priceId: string;
  unitAmount: number;
  description: string;
  metadata: {
    weight: number;
    color: string;
    type: string;
  };
}
