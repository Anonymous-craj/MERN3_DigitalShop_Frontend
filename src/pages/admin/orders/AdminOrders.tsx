import { useEffect } from "react";
import { fetchOrders } from "../../../store/adminOrderSlice";
import AdminLayout from "../AdminLayout";
import AdminOrderTable from "./component/AdminOrderTable";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.adminOrders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <AdminLayout>
      <AdminOrderTable orders={items} />
    </AdminLayout>
  );
};

export default AdminOrders;
