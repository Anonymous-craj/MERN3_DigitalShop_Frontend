import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IData, IOrder, IOrderItems } from "../pages/checkout/types";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http/apiType";

const initialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
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
  },
});

export default checkoutSlice.reducer;
export const { setItems, setStatus, setKhaltiUrl } = checkoutSlice.actions;

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
      dispatch(setStatus(Status.SUCCESS));
      dispatch(setItems(response.data.data));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchMyOrderDetail() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/order");
      dispatch(setStatus(Status.SUCCESS));
      dispatch(setItems(response.data.data));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
