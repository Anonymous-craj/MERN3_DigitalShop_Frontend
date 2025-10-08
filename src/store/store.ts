import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;

//Exporting store type for using that type in our own made custom hooks
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
