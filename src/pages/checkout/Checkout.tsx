import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PaymentMethod, type IData } from "./types";
import { orderItem } from "../../store/checkoutSlice";

const Checkout = () => {
  const { items } = useAppSelector((store) => store.cart);
  const { khaltiUrl, status } = useAppSelector((store) => store.orders);
  console.log("khaltiUrl from Redux:", khaltiUrl);
  const total = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  );

  const dispatch = useAppDispatch();

  const [data, setData] = useState<IData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    totalAmount: 0,
    addressLine: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: PaymentMethod.Cod,
    products: [],
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cod
  );

  useEffect(() => {
    if (khaltiUrl) {
      console.log("Redirecting to Khalti URL:", khaltiUrl);
      window.location.href = khaltiUrl; // Navigate to the Khalti URL
      return;
    }
  }, [khaltiUrl, status]);

  const handlePaymentMethod = (paymentData: PaymentMethod) => {
    setPaymentMethod(paymentData);
    setData({
      ...data,
      paymentMethod: paymentData,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all address fields are filled
    if (
      !data.addressLine ||
      !data.city ||
      !data.state ||
      !data.zipCode ||
      !data.phoneNumber
    ) {
      alert("Please fill in all the address fields.");
      return;
    }

    // Map cart items to IProduct type
    const productData = items.map((item) => {
      return {
        productId: item.Product.id, // Ensure correct field name
        productQty: item.quantity, // Ensure correct field name
        totalAmount: item.Product.productPrice * item.quantity, // Calculate total for each product
        Payment: { paymentMethod: paymentMethod }, // Add selected payment method
      };
    });

    const finalData = {
      ...data,
      products: productData,
      totalAmount: total + 100, // Total + shipping
    };

    // Dispatch the action with the correct data structure
    await dispatch(orderItem(finalData));
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-12 px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:w-8/12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Your Cart
            </h2>
            <div className="space-y-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <div className="flex items-start gap-4" key={item.Product.id}>
                    <div className="w-24 h-24 flex p-3 bg-white rounded-md">
                      <img
                        src={
                          "http://localhost:3000/" +
                          item.Product.productImageUrl
                        }
                        className="w-full h-full object-contain"
                        alt={item.Product.productName}
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.Product.productName}
                      </h3>
                      <ul className="text-sm text-gray-600 mt-3 space-y-2">
                        <li className="flex justify-between">
                          Quantity: <span>{item.quantity}</span>
                        </li>
                        <li className="flex justify-between">
                          Price:{" "}
                          <span className="font-semibold">
                            Rs.{item.Product.productPrice}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              )}
            </div>
            <hr className="border-gray-300 my-8" />
            <div>
              <ul className="text-sm text-gray-700 font-medium">
                <li className="flex justify-between">
                  Shipping:{" "}
                  <span className="font-semibold text-gray-800">Rs. 100</span>
                </li>
                <hr className="border-gray-300" />
                <li className="flex justify-between text-lg font-semibold text-gray-900">
                  Total: <span>Rs. {total + 100}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Delivery Details Form */}
          <div className="bg-white rounded-lg shadow-md p-6 md:w-4/12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Delivery Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone No.
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                    placeholder="Enter Phone No."
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    onChange={handleChange}
                    placeholder="Enter Address Line"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    placeholder="Enter City"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleChange}
                    placeholder="Enter State"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    onChange={handleChange}
                    placeholder="Enter Zip Code"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  onChange={(e) =>
                    handlePaymentMethod(e.target.value as PaymentMethod)
                  }
                  className="w-full px-4 py-2 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value={PaymentMethod.Cod}>Cash on Delivery</option>
                  <option value={PaymentMethod.Khalti}>Khalti</option>
                  <option value={PaymentMethod.Esewa}>Esewa</option>
                </select>
              </div>

              <div className="mt-8">
                {paymentMethod === PaymentMethod.Cod && (
                  <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Pay on COD
                  </button>
                )}
                {paymentMethod === PaymentMethod.Khalti && (
                  <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Pay with Khalti
                  </button>
                )}
                {paymentMethod === PaymentMethod.Esewa && (
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Pay with Esewa
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
