import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { API, APIWITHTOKEN } from "../http/apiType";

interface ICategory {
  id: string;
  categoryName: string;
}

interface ICategoryInitialState {
  items: ICategory[];
  status: Status;
}

const initialState: ICategoryInitialState = {
  items: [],
  status: Status.LOADING,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setItems(state: ICategoryInitialState, action: PayloadAction<ICategory[]>) {
      state.items = action.payload;
    },

    addToCategoryItems(
      state: ICategoryInitialState,
      action: PayloadAction<ICategory>
    ) {
      state.items.push(action.payload);
    },

    setStatus(state: ICategoryInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    resetStatus(state: ICategoryInitialState) {
      state.status = Status.LOADING;
    },

    setDeleteCategoryItem(
      state: ICategoryInitialState,
      action: PayloadAction<string>
    ) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const {
  setItems,
  setStatus,
  setDeleteCategoryItem,
  addToCategoryItems,
  resetStatus,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;

export function addCategories(categoryName: string) {
  return async function addCategoriesThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/category", { categoryName });
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(addToCategoryItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCategoryItems() {
  return async function fetchCategoryItemsThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/category");
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

export function handleDeleteCategoryItem(categoryId: string) {
  return async function handleDeleteCategoryItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/category/" + categoryId);
      if (response.status === 200) {
        dispatch(setDeleteCategoryItem(categoryId));
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
