import { Product } from "./Product";

export interface Action {
  type: string;
  payload: Product;
}
