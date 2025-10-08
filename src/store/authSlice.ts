import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type IAuthState, type IUser } from "../globals/types/type";
import type { AppDispatch } from "./store";
import axios from "axios";

const initialState: IAuthState = {
  user: {
    username: null,
    email: null,
    password: null,
  },
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data: IUser) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      console.log(response);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUser(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
