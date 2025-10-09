import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  Status,
  type IAuthState,
  type ILogin,
  type IUser,
} from "../globals/types/type";
import type { AppDispatch } from "./store";
import axios from "axios";

const initialState: IAuthState = {
  user: {
    username: null,
    email: null,
    password: null,
    token: null,
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
    setToken(state: IAuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
  },
});

export const { setUser, setStatus, setToken } = authSlice.actions;
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

//Async thunk function for userLogin

export function loginUser(data: ILogin) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.post("http://localhost:3000/login", data);
      console.log(response);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          dispatch(setToken(response.data.token));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
