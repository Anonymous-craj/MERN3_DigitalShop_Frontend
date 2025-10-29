import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  Status,
  type IAuthState,
  type ILogin,
  type IUser,
} from "../globals/types/type";
import { type AppDispatch } from "./store";
import { API, APIWITHTOKEN } from "../http/apiType";
import { AxiosError } from "axios";

const initialState: IAuthState = {
  user: {
    username: null,
    email: null,
    password: null,
    token: null,
  },
  registerStatus: Status.LOADING,
  loginStatus: Status.LOADING,
  status: Status.LOADING,
  errorMessage: "", // Add errorMessage to state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setRegisterStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.registerStatus = action.payload;
    },
    setLoginStatus(state: IAuthState, action: PayloadAction<Status>) {
      state.loginStatus = action.payload;
    },
    setToken(state: IAuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
    setLoginErrorMessage(state: IAuthState, action: PayloadAction<string>) {
      state.errorMessage = action.payload; // Store the error message in the state
    },
    resetUser(state: IAuthState) {
      state.user = {
        username: null,
        email: null,
        password: null,
        token: null,
      };
      state.loginStatus = Status.LOADING;
    },
  },
});

export const {
  setUser,
  setRegisterStatus,
  setLoginStatus,
  setToken,
  setLoginErrorMessage,
  resetUser,
} = authSlice.actions;

export default authSlice.reducer;

export function registerUser(data: IUser) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/register", data);
      console.log(response);
      if (response.status === 201) {
        dispatch(setRegisterStatus(Status.SUCCESS)); // Set register status to success
        dispatch(setUser(data));
      } else {
        dispatch(setRegisterStatus(Status.ERROR)); // Handle error case
      }
    } catch (error) {
      console.log(error);
      dispatch(setRegisterStatus(Status.ERROR)); // Handle error case
    }
  };
}

export function loginUser(data: ILogin) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/login", data);
      console.log(response);

      if (response.status === 200) {
        dispatch(setLoginStatus(Status.SUCCESS)); // Set login status to success
        if (response.data.token) {
          localStorage.setItem("token", response.data.token); // Store token in localStorage
          dispatch(setToken(response.data.token));
        } else {
          dispatch(setLoginStatus(Status.ERROR)); // Handle error case
        }
      }
    } catch (error) {
      console.log(error);

      // Type the error as AxiosError
      if (error instanceof AxiosError) {
        if (error.response) {
          // Dispatch error status and the error message from the backend
          dispatch(setLoginStatus(Status.ERROR));
          dispatch(setLoginErrorMessage(error.response.data.message)); // Dispatch the error message
        } else {
          // Handle other types of Axios errors (e.g., network issues)
          dispatch(setLoginStatus(Status.ERROR));
          dispatch(setLoginErrorMessage("Network error, please try again.")); // Handle network error
        }
      } else {
        // Handle non-Axios errors
        dispatch(setLoginStatus(Status.ERROR));
        dispatch(
          setLoginErrorMessage("An unknown error occurred. Please try again.")
        );
      }
    }
  };
}
