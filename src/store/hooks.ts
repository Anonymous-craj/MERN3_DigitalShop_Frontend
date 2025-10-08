import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";

//Made custom hooks for useDispatch and useSelector with types because we can't use default useDispatch and useSelector hooks in typescript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); //Used For inserting, updating into state or store also used to trigger or call action
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //Used For fetching data from the state
