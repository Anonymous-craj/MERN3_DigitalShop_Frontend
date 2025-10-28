import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cancelOrderApi, fetchMyOrderDetail } from "../../store/checkoutSlice";
import { useParams } from "react-router-dom";
import { OrderStatus } from "./types";

const MyOrderDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { orderDetails } = useAppSelector((store) => store.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchMyOrderDetail(id));
    }
  }, [dispatch, id]);

  const cancelOrder = () => {
    if (id) {
      dispatch(cancelOrderApi(id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-semibold text-gray-800">
                Order #{orderDetails[0]?.orderId}
              </h1>
              <p className="text-base text-gray-600">
                <span>Created At: </span>
                {new Date(orderDetails[0]?.createdAt).toLocaleDateString()}
              </p>
              <p className="text-base text-gray-600">
                <span>Order Status: </span>
                {orderDetails[0]?.Order?.orderStatus}
              </p>
            </div>
            <div className="text-xl font-semibold text-gray-800">
              Order Summary
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side: Order details */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <p className="text-lg font-semibold text-gray-800">
                  Customer’s Cart
                </p>
                {orderDetails.length > 0 &&
                  orderDetails.map((od) => (
                    <div
                      key={od?.id}
                      className="flex flex-col md:flex-row items-start space-y-4 md:space-x-6 md:space-y-0 pb-6 border-b border-gray-200"
                    >
                      <div className="w-full md:w-40">
                        <img
                          className="w-full h-auto"
                          src={`http://localhost:3000/${od?.Product?.productImageUrl}`}
                          alt={od?.Product?.productName}
                        />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {od?.Product?.productName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Category: </span>
                          {od?.Product?.Category?.categoryName}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-base text-gray-800">
                            Rs. {od?.Product?.productPrice}
                          </p>
                          <p className="text-base text-gray-800">
                            {od?.quantity}
                          </p>
                          <p className="text-base font-semibold text-gray-800">
                            Rs. {od?.Product?.productPrice * od?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Summary Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-base text-gray-800 font-semibold">Total</p>
                  <p className="text-base text-gray-600">
                    Rs. {orderDetails[0]?.Order?.totalAmount}
                  </p>
                </div>
              </div>

              {/* Shipping Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-8 h-8"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      alt="Shipping logo"
                    />
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold text-gray-800">
                        DPD Delivery
                      </p>
                      <span className="text-sm text-gray-600">
                        Delivery within 24 hours
                      </span>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">Rs. 100</p>
                </div>
              </div>
            </div>

            {/* Right side: Customer Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Customer</h3>
              <div className="mt-6">
                <p className="text-base text-gray-800">
                  Full Name: {orderDetails[0]?.Order?.firstName}{" "}
                  {orderDetails[0]?.Order?.lastName}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Phone Number: {orderDetails[0]?.Order?.phoneNumber}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Email Address: {orderDetails[0]?.Order?.email}
                </p>
              </div>

              {/* Cancel Button */}
              {orderDetails[0]?.Order?.orderStatus !==
                OrderStatus?.Cancelled && (
                <button
                  onClick={cancelOrder}
                  className="mt-6 w-full py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrderDetail;
