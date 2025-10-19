import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import CategoryTable from "./components/Table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCategoryItems } from "../../../store/adminCategorySlice";

export interface ICategory {
  id: string;
  categoryName: string;
}

const Categories = () => {
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector((store) => store.categories);
  useEffect(() => {
    dispatch(fetchCategoryItems());
  }, []);
  return (
    <AdminLayout>
      <CategoryTable categories={categories} />
    </AdminLayout>
  );
};

export default Categories;
