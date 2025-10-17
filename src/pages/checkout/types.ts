import type { Status } from "../../globals/types/type";
import type { IOrderDetails } from "../my-order-details/types";

export interface IProduct {
  productId: string;
  productQty: number;
  totalAmount?: number;
  orderStatus?: string;
  Payment: {
    paymentMethod: PaymentMethod;
  };
}

export interface IOrderItems extends IProduct {
  id: string;
}

export interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
  orderDetails: IOrderDetails[];
}

export enum PaymentMethod {
  Esewa = "esewa",
  Khalti = "khalti",
  Cod = "cod",
}

export interface IData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  addressLine: string;
  state: string;
  zipCode: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  products: IProduct[];
}
