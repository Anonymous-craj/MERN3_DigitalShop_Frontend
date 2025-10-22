import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import { APIWITHTOKEN } from "../http/apiType";
import type { AppDispatch } from "./store";
import type { IProduct } from "../pages/admin/products/components/ProductModal";

export interface IProductAdmin {
  id: string;
  productName: string;
  productPrice: number;
  productTotalStock: number;
  productDescription: string;
  productImageUrl: string;
  createAt: string;
  categoryId: string;
  discount: number;

  Category: {
    categoryName: string;
  };
}

interface IInitialState {
  products: IProductAdmin[];
  status: Status;
  product: null | IProductAdmin;
}
const initialState: IInitialState = {
  products: [],
  status: Status.LOADING,
  product: null,
};

const productSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProducts(state: IInitialState, action: PayloadAction<IProductAdmin[]>) {
      state.products = action.payload;
    },
    addProductToProducts(
      state: IInitialState,
      action: PayloadAction<IProductAdmin>
    ) {
      state.products.push(action.payload);
    },
    removeProductById(state: IInitialState, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  setStatus,
  setProducts,
  addProductToProducts,
  removeProductById,
} = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/product");
      if (response.status === 200) {
        dispatch(setProducts(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function addProduct(data: IProduct) {
  return async function addProductThunk(dispatch: AppDispatch) {
    try {
      const form = new FormData();
      form.append("productName", data.productName);
      form.append("productDescription", data.productDescription);
      form.append("productPrice", String(data.productPrice));
      form.append("productTotalStock", String(data.productTotalStock));
      form.append("categoryId", data.categoryId);
      if (data.productImage instanceof File) {
        form.append("productImage", data.productImage);
      }

      const response = await APIWITHTOKEN.post("/product", form, {
        // override any instance default like application/json
        headers: { "Content-Type": "multipart/form-data" },
        // if you have global JSON stringify transforms, this prevents them here
        transformRequest: [(d) => d],
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(addProductToProducts(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteProduct(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/product/" + id);
      if (response.status === 200) {
        // remove from state on success
        dispatch(removeProductById(id));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
