import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { IProduct, IProducts } from "../pages/product/types";
import type { AppDispatch, RootState } from "./store";
import { API } from "../http/apiType";

// ---- hydrate from localStorage (safe) ----
const persisted = (() => {
  try {
    const raw = localStorage.getItem("productsSlice");
    return raw ? (JSON.parse(raw) as Partial<IProducts>) : null;
  } catch {
    return null;
  }
})();

const initialState: IProducts = {
  products: persisted?.products ?? [],
  status: persisted?.status ?? Status.LOADING,
  product: persisted?.product ?? null,
};

// small helper to persist current slice to localStorage
function persist(state: IProducts) {
  try {
    const snapshot: IProducts = {
      products: state.products,
      status: state.status,
      product: state.product,
    };
    localStorage.setItem("productsSlice", JSON.stringify(snapshot));
  } catch {
    // ignore quota / privacy mode errors
  }
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state: IProducts, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
      persist(state); // save
    },
    setStatus(state: IProducts, action: PayloadAction<Status>) {
      state.status = action.payload;
      persist(state); // save
    },
    setProduct(state: IProducts, action: PayloadAction<IProduct>) {
      state.product = action.payload;
      persist(state); // save
    },
  },
});

export const { setStatus, setProducts, setProduct } = productSlice.actions;
export default productSlice.reducer;

// ---------- thunks (unchanged logic; added a LOADING signal + robust id compare) ----------
export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("/product");
      if (response.status === 200) {
        dispatch(setProducts(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchProduct(id: string) {
  return async function fetchProductThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    dispatch(setStatus(Status.LOADING));

    const { products, product } = getState().products;

    // reuse selected product if it’s already the one we need
    if (product && String(product.id) === String(id)) {
      dispatch(setProduct(product));
      dispatch(setStatus(Status.SUCCESS));
      return;
    }

    // try to find it in products list
    const cached = products.find((p) => String(p.id) === String(id));
    if (cached) {
      dispatch(setProduct(cached));
      dispatch(setStatus(Status.SUCCESS));
      return;
    }

    // fetch from API
    try {
      const response = await API.get("/product/" + id);
      if (response.status === 200) {
        dispatch(setProduct(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
