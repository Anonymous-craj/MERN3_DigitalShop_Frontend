import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
  },
});

export default store;

//Exporting store type for using that type in our own made custom hooks
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
