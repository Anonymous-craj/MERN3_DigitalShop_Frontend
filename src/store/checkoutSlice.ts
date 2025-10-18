import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IData, IOrder, IOrderItems } from "../pages/checkout/types";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http/apiType";
import {
  OrderStatus,
  type IOrderDetails,
} from "../pages/my-order-details/types";

const initialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails: [],
};

const checkoutSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
      state.khaltiUrl = action.payload;
    },
    setOrderDetails(state: IOrder, action: PayloadAction<IOrderDetails[]>) {
      state.orderDetails = action.payload;
    },
    updateOrderStatusToCancel(
      state: IOrder,
      action: PayloadAction<{ orderId: string }>
    ) {
      const orderId = action.payload.orderId;
      const datas = state.orderDetails.find(
        (order) => order.orderId === orderId
      );
      if (datas) {
        datas.Order.orderStatus = OrderStatus.Cancelled;
      }
    },
  },
});

export default checkoutSlice.reducer;
export const {
  setItems,
  setStatus,
  setKhaltiUrl,
  setOrderDetails,
  updateOrderStatusToCancel,
} = checkoutSlice.actions;

export function orderItem(data: IData) {
  return async function orderItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/order", data);

      console.log("Response data from API:", response.data); // Log to inspect the structure

      if (response.status === 201) {
        dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));

        // Dispatch the Khalti URL to Redux store
        if (response.data.url) {
          dispatch(setKhaltiUrl(response.data.url)); // Correct way to dispatch the URL to Redux
          console.log("Redirecting to Khalti URL:", response.data.url);
          window.location.href = response.data.url;
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error during order creation:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/order");
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

export function fetchMyOrderDetail(id: string) {
  return async function fetchMyOrderDetailThunk(dispatch: AppDispatch) {
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

export function cancelOrderApi(id: string) {
  return async function cancelOrderApiThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch("/order/cancel-order/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(updateOrderStatusToCancel({ orderId: id }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
