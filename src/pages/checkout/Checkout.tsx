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
    const productData =
      items.length > 0
        ? items.map((item) => {
            return {
              productId: item.Product.id,
              productQty: item.quantity,
            };
          })
        : [];

    const finalData = {
      ...data,
      products: productData,
      totalAmount: total,
    };
    await dispatch(orderItem(finalData));
  };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
            <div className="relative h-full">
              <div className="px-6 py-8 md:overflow-auto md:h-screen">
                <div className="space-y-4">
                  {items.length > 0 ? (
                    items.map((item) => {
                      return (
                        <div className="flex items-start gap-4">
                          <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                            <img
                              src={
                                "http://localhost:3000/" +
                                item.Product.productImageUrl
                              }
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm text-slate-900 font-semibold">
                              {item.Product.productName}
                            </h3>
                            <ul className="text-xs text-slate-900 space-y-2 mt-3">
                              <li className="flex flex-wrap gap-4">
                                Quantity
                                <span className="ml-auto">{item.quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Price
                                <span className="ml-auto font-semibold">
                                  Rs.{item.Product.productPrice}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No item</p>
                  )}
                </div>
                <hr className="border-gray-300 my-8" />
                <div>
                  <ul className="text-slate-500 font-medium space-y-4">
                    <li className="flex flex-wrap gap-4 text-sm">
                      Shipping
                      <span className="ml-auto font-semibold text-slate-900">
                        Rs. 100
                      </span>
                    </li>
                    <hr className="border-slate-300" />
                    <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                      Total <span className="ml-auto">Rs.{total}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
            <form onSubmit={handleSubmit}>
              <div>
                <h2 className="text-xl text-slate-900 font-semibold mb-6">
                  Delivery Details
                </h2>
                <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Enter Email"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Phone No.
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      onChange={handleChange}
                      placeholder="Enter Phone No."
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Address Line
                    </label>
                    <input
                      type="text"
                      name="addressLine"
                      onChange={handleChange}
                      placeholder="Enter Address Line"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      placeholder="Enter City"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      onChange={handleChange}
                      placeholder="Enter State"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      onChange={handleChange}
                      placeholder="Enter Zip Code"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="paymentMethod"
                  className="flex text-sm text-slate-900 font-medium mb-2"
                >
                  Payment Method:
                </label>
                <select
                  name=""
                  id="paymentMethod"
                  className=" cursor-pointer"
                  onChange={(e) =>
                    handlePaymentMethod(e.target.value as PaymentMethod)
                  }
                >
                  <option value={PaymentMethod.Cod}>COD</option>
                  <option value={PaymentMethod.Khalti}>Khalti</option>
                  <option value={PaymentMethod.Esewa}>Esewa</option>
                </select>
              </div>
              <div className="mt-8">
                {paymentMethod === PaymentMethod.Cod && (
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Pay on COD
                  </button>
                )}
                {paymentMethod === PaymentMethod.Khalti && (
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                  >
                    Pay with Khalti
                  </button>
                )}

                {paymentMethod === PaymentMethod.Esewa && (
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-green-600 hover:bg-green-700 text-white cursor-pointer"
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
