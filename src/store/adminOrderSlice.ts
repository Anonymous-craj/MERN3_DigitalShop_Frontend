import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http/apiType";
import type {
  IOrderDetails,
  PaymentMethod,
  PaymentStatus,
} from "../pages/my-order-details/types";

export interface IAdminOrder {
  id: string;
  productQty: number;
  totalAmount?: number;
  orderStatus?: string;
  Payment: {
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
  };
}

interface IInitialState {
  items: IAdminOrder[];
  status: Status;
  orderDetails: IOrderDetails[];
}

const initialState: IInitialState = {
  status: Status.LOADING,
  items: [],
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    setItems(state: IInitialState, action: PayloadAction<IAdminOrder[]>) {
      state.items = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setOrderDetails(
      state: IInitialState,
      action: PayloadAction<IOrderDetails[]>
    ) {
      state.orderDetails = action.payload;
    },
    // updateOrderStatusToCancel(
    //   state: IOrder,
    //   action: PayloadAction<{ orderId: string }>
    // ) {
    //   const orderId = action.payload.orderId;
    //   const datas = state.orderDetails.find(
    //     (order) => order.orderId === orderId
    //   );
    //   if (datas) {
    //     datas.Order.orderStatus = OrderStatus.Cancelled;
    //   }
    // },
  },
});

export default orderSlice.reducer;
export const { setItems, setStatus, setOrderDetails } = orderSlice.actions;

export function fetchOrders() {
  return async function fetchOrdersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/order/all");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchAdminOrderDetail(id: string) {
  return async function fetchAdminOrderDetailThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/order/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrderDetails(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// export function cancelOrderApi(id: string) {
//   return async function cancelOrderApiThunk(dispatch: AppDispatch) {
//     try {
//       const response = await APIWITHTOKEN.patch("/order/cancel-order/" + id);
//       if (response.status === 200) {
//         dispatch(setStatus(Status.SUCCESS));
//         dispatch(updateOrderStatusToCancel({ orderId: id }));
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }
