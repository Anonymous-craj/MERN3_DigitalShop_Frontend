import { useEffect, useState } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMyOrders,
  updateOrderStatusinSlice,
} from "../../store/checkoutSlice";
import { Link } from "react-router-dom";
import { socket } from "../../lib/socket";

const MyOrder = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.orders);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const newItems = items.filter(
    (item) =>
      item?.id?.toLowerCase().includes(searchTerm) ||
      item?.orderStatus?.toLowerCase().includes(searchTerm) ||
      item?.Payment?.paymentMethod?.toLowerCase().includes(searchTerm) ||
      item?.totalAmount == parseInt(searchTerm)
  );

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, []);

  useEffect(() => {
    socket.on("statusUpdated", (data) => {
      dispatch(updateOrderStatusinSlice(data));
    });
  }, [socket]);
  return (
    <>
      <Navbar />
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order History</title>
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden mx-auto my-auto">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Order History
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search by Order ID or Status..."
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Table Section */}
          <div className="overflow-x-auto">
            <table
              id="orderTable"
              className="min-w-full text-left border-collapse"
            >
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Payment Method
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {newItems.length > 0 &&
                  newItems.map((item) => {
                    return (
                      <tr className="hover:bg-gray-50">
                        <Link to={`/my-orders/${item.id}`}>
                          <td className="px-6 py-4 text-gray-700 font-medium">
                            {item?.id}
                          </td>
                        </Link>
                        <td className="px-6 py-4">
                          <span className="text-red-600 font-semibold">
                            {item?.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-800">
                          {item?.totalAmount}
                        </td>

                        <td className="px-6 py-4">
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                            {item?.Payment?.paymentMethod}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <span>Showing 1-3 of 50 orders</span>
            <div className="space-x-2">
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
