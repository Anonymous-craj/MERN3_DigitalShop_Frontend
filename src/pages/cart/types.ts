import type { Status } from "../../globals/types/type";
// import type { IProduct } from "../product/types";

export interface ICartProductItems {
  id: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
}

export interface ICartItems {
  id: string;
  quantity: number;
  userId: string;
  productId: string;
  Product: ICartProductItems;
}

export interface ICartInitialState {
  items: ICartItems[];
  status: Status;
}
