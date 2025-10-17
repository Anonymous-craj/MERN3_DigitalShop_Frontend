export interface IOrderDetails {
  id: string;
  quantity: number;
  createdAt: string;
  orderId: string;
  productId: string;
  Order: {
    firstName: string;
    lastName: string;
    email: string;
    totalAmount: number;
    phoneNumber: string;
    State: string;
    City: string;
    AddressLine: string;
    orderStatus: OrderStatus;
    Payment: {
      paymentMethod: PaymentMethod;
      paymentStatus: PaymentStatus;
    };
  };
  Product: {
    productName: string;
    productPrice: number;
    productImageUrl: string;
    Category: {
      categoryName: string;
    };
  };
}

export enum OrderStatus {
  Pending = "pending",
  Cancelled = "cancelled",
  Delivered = "delivered",
  Preparation = "preparation",
  Ontheway = "ontheway",
}

export enum PaymentMethod {
  Khalti = "khalti",
  Esewa = "esewa",
  Cod = "cod",
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}
