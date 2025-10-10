import type { Status } from "../../../globals/types/type";

export interface ICategory {
  id: string;
  categoryName: string;
}

export interface IProduct {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  discount: number;
  productTotalStock: number;
  productImageUrl: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  Category: ICategory;
}

export interface IProducts {
  products: IProduct[];
  status: Status;
}
