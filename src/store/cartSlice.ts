import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ICartInitialState,
  ICartItems,
  ICartUpdate,
} from "../pages/cart/types";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http/apiType";

const initialState: ICartInitialState = {
  items: [],
  status: Status.LOADING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: ICartInitialState, action: PayloadAction<ICartItems[]>) {
      state.items = action.payload;
    },

    setStatus(state: ICartInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setUpdateCartItem(
      state: ICartInitialState,
      action: PayloadAction<ICartUpdate>
    ) {
      const index = state.items.findIndex(
        (item) => item.Product.id === action.payload.productId
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },

    setDeleteCartItem(state: ICartInitialState, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (item) => item.Product.id === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { setItems, setStatus, setUpdateCartItem, setDeleteCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/cart/", {
        productId: productId,
        quantity: 1,
      });
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

export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/cart/");
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

export function handleUpdateCartItem(productId: string, quantity: number) {
  return async function handleUpdateCartItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch("/cart/" + productId, {
        quantity,
      });
      if (response.status === 200) {
        dispatch(setUpdateCartItem({ productId, quantity }));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function handleDeleteCartItem(productId: string) {
  return async function handleUpdateCartItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/cart/" + productId);
      if (response.status === 200) {
        dispatch(setDeleteCartItem(productId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
