import { Link } from "react-router-dom";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  handleDeleteCartItem,
  handleUpdateCartItem,
} from "../../store/cartSlice";

const MyCart = () => {
  const { items } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const handleUpdate = (productId: string, quantity: number) => {
    dispatch(handleUpdateCartItem(productId, quantity));
  };

  const handleDelete = (productId: string) => {
    dispatch(handleDeleteCartItem(productId));
  };

  const subTotal = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  );

  return (
    <>
      <Navbar />
      <section className="w-full bg-gray-50 py-12 px-6">
        <h1 className="text-center text-3xl font-semibold text-gray-900 mb-8">
          My Shopping Cart
        </h1>

        {/* Check if the cart is empty */}
        {items.length === 0 ? (
          <div className="text-center text-lg text-gray-700">
            <p>Your cart is currently empty.</p>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 justify-between">
            {/* Cart items */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-8/12">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-center border-b text-gray-600 text-sm uppercase font-medium">
                    <th className="py-4 pl-2 text-left">Product</th>
                    <th className="py-4">Price</th>
                    <th className="py-4">Quantity</th>
                    <th className="py-4">Total</th>
                    <th className="py-4" />
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 &&
                    items.map((item) => {
                      return (
                        <tr key={item.Product.id} className="text-center">
                          <td className="py-4 pl-2 text-left flex items-center gap-3 flex-wrap">
                            <img
                              src={`http://localhost:3000/${item.Product.productImageUrl}`}
                              alt={item.Product.productName}
                              className="w-20 h-20 object-cover"
                            />
                            <span className="text-sm font-semibold text-gray-700 max-w-[200px] truncate">
                              {item.Product.productName}
                            </span>
                          </td>
                          <td className="py-4 text-gray-700">
                            Rs.{item.Product.productPrice}
                          </td>
                          <td className="py-4">
                            <div className="flex justify-center items-center gap-2">
                              <button
                                className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                                onClick={() =>
                                  handleUpdate(
                                    item.Product.id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    d="M2.33398 7.5H11.6673"
                                    stroke="#666666"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                              <span className="text-sm font-semibold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                                onClick={() =>
                                  handleUpdate(
                                    item.Product.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z"
                                    stroke="#666666"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="py-4 text-gray-700">
                            Rs.{item.Product.productPrice * item.quantity}
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => handleDelete(item.Product.id)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z"
                                  stroke="#FFF"
                                  strokeMiterlimit={10}
                                />
                                <path
                                  d="M16 8.5L8 16.5"
                                  stroke="#FFF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 16.5L8 8.5"
                                  stroke="#FFF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Cart total */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-4/12">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Cart Total
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Shipping</span>
                  <span>Rs. 100</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal</span>
                  <span>Rs. {subTotal}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span>Rs. {subTotal + 100}</span>{" "}
                  {/* Add shipping to subtotal */}
                </div>
              </div>

              <Link to="/my-checkout">
                <button className="w-full mt-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Proceed to Checkout
                </button>
              </Link>

              <Link to="/">
                <button className="w-full mt-3 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Return to Shop
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MyCart;
