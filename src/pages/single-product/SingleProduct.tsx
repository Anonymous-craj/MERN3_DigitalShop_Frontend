import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProduct } from "../../store/productSlice";
import { useParams } from "react-router-dom";
import { Status } from "../../globals/types/type";
import { addToCart } from "../../store/cartSlice";

const SingleProduct = () => {
  const { product, status } = useAppSelector((store) => store.products);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, []);

  const handleAddToCart = () => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  // Loader
  if (status === Status.LOADING) {
    return (
      <>
        <Navbar />
        <section className="font-['Poppins'] flex items-center justify-center h-[100vh]">
          <div className="flex w-[1300px] p-10 bg-white">
            {/* Image placeholder */}
            <div className="w-[556px] h-[400px] rounded-2xl shimmer" />

            {/* Text placeholders */}
            <div className="ml-8 flex-1 space-y-6">
              <div className="h-10 w-1/2 rounded shimmer" />
              <div className="h-8 w-1/3 rounded shimmer" />
              <div className="h-24 w-4/5 rounded shimmer" />
              <div className="h-10 w-1/3 rounded shimmer" />
              <div className="h-8 w-1/4 rounded shimmer" />
            </div>
          </div>
        </section>
      </>
    );
  }

  // ✅ Error State
  if (status === Status.ERROR) {
    return (
      <>
        <Navbar />
        <div className="h-[100vh] flex items-center justify-center">
          <p className="text-lg text-red-500 font-medium">
            Failed to load product. Please try again later.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <section className="font-['Poppins'] flex items-center justify-center h-[100vh]">
        <div className="flex w-[1300px] p-10 bg-white ">
          <img
            className="w-[556px] ml-3 mr-6 rounded-2xl"
            src={`http://localhost:3000/${product?.productImageUrl}`}
          />
          <div>
            <div className="flex gap-2 items-center">
              <h1 className="text-[36px] leading-[44px] font-semibold text-black">
                {product?.productName}
              </h1>
            </div>

            <div className="h-9 mt-5 justify-start items-center gap-3 inline-flex">
              <div className="justify-start items-center gap-1 flex">
                <span className="text-xl">Price:</span>
                <div className="text-[#2c732f] text-2xl font-medium leading-9">
                  Rs.{product?.productPrice}
                </div>
                <span className="text-xl ml-5">Discount: </span>
                <div className="text-[#b3b3b3] text-xl font-normal line-through leading-[30px]">
                  Rs.{product?.discount}
                </div>
              </div>
            </div>

            <p className="w-[500px] text-justify text-[#7f7f7f] text-sm font-normal mt-4 leading-[21px]">
              {product?.productDescription}
            </p>
            <div className="h-[88px] mt-6 py-[18px] bg-white shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] border border-white justify-center items-center gap-3 flex mr-40">
              <button
                className="h-[51px] px-20 py-4 bg-[#00b206] rounded-[43px] justify-center items-center gap-4 flex cursor-pointer"
                onClick={handleAddToCart}
              >
                <span className="text-white text-base font-semibold leading-tight ">
                  Add to Cart
                </span>
                <div>
                  <svg
                    width={17}
                    height={18}
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.16667 7.33333H2.66667L1 16.5H16L14.3333 7.33333H11.8333M5.16667 7.33333V4.83333C5.16667 2.99239 6.65905 1.5 8.5 1.5V1.5C10.3409 1.5 11.8333 2.99238 11.8333 4.83333V7.33333M5.16667 7.33333H11.8333M5.16667 7.33333V9.83333M11.8333 7.33333V9.83333"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div>
                <svg
                  width={52}
                  height={52}
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width={52}
                    height={52}
                    rx={26}
                    fill="#20B526"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M25.9996 33.5451C9.33328 24.3334 20.9999 14.3334 25.9996 20.6567C30.9999 14.3334 42.6666 24.3334 25.9996 33.5451Z"
                    stroke="#2C742F"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
            <div className="h-[54px] mt-6 flex-col justify-start items-start gap-3 inline-flex">
              <div className="justify-start items-start gap-1.5 inline-flex">
                <span className="text-[#191919] text-sm font-medium leading-[21px]">
                  Category:
                </span>
                <span className="text-[#7f7f7f] text-sm font-normal leading-[21px]">
                  {product?.Category?.categoryName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
