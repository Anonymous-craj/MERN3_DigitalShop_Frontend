import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http/apiType";

export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface IInitialState {
  users: IUser[];
  status: Status;
}

const initialState: IInitialState = {
  users: [],
  status: Status.LOADING,
};

const adminUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state: IInitialState, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    deleteUser(state: IInitialState, action: PayloadAction<string>) {
      const index = state.users.findIndex((user) => user.id === action.payload);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setStatus, setUsers, deleteUser } = adminUserSlice.actions;
export default adminUserSlice.reducer;

export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/users");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUsers(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteUserById(id: string) {
  return async function deleteUserByIdThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/users/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(deleteUser(id));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
