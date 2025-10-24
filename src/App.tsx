import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "./store/store";

import { socket, connectSocketWithToken } from "./lib/socket"; // <- NEW

import Home from "./pages/home/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Product from "./pages/product/Product";
import SingleProduct from "./pages/single-product/SingleProduct";
import MyCart from "./pages/cart/my-cart";
import Checkout from "./pages/checkout/Checkout";
import MyOrder from "./pages/my-orders/MyOrder";
import MyOrderDetail from "./pages/my-order-details/MyOrderDetail";
import AdminStats from "./pages/admin/stats/AdminStats";
import Categories from "./pages/admin/categories/Categories";
import User from "./pages/admin/users/Users";
import AdminProduct from "./pages/admin/products/AdminProducts";
import AdminOrders from "./pages/admin/orders/AdminOrders";
import AdminOrderDetail from "./pages/admin/order-details/AdminOrderDetails";

export default function App() {
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    connectSocketWithToken(token);
    return () => void socket.disconnect();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/my-orders/:id" element={<MyOrderDetail />} />
          <Route path="/admin" element={<AdminStats />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/users" element={<User />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
