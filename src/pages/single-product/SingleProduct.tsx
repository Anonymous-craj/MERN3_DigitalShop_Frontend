import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProduct } from "../../store/productSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";

function SingleProduct() {
  const { id } = useParams();
  const { product } = useAppSelector((store) => store.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  return (
    <>
      <Navbar />
      {/* Page backdrop */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product shell (glassy) */}
          <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-gray-900/60 backdrop-blur shadow-xl">
            <div className="flex flex-col lg:flex-row">
              {/* Left: media */}
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/70 dark:ring-gray-800/70 shadow-md">
                  {/* subtle corner gradient sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/5 dark:to-white/5" />
                  <img
                    className="w-full h-[460px] object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                    src={`http://localhost:3000/${product?.productImageUrl}`}
                    alt={product?.productName ?? "Product Image"}
                  />

                  {/* top-left badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {product?.Category?.categoryName && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-900/80 text-gray-800 dark:text-gray-200 shadow-sm">
                        {product?.Category?.categoryName}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm">
                      In Stock: {product?.productTotalStock ?? 0}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    className="flex-1 inline-flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-600 text-white font-semibold py-3 px-4 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-black dark:hover:bg-gray-700"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold py-3 px-4 ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    Add to Wishlist
                  </button>
                </div>
              </div>

              {/* Right: details */}
              <div className="lg:w-1/2 p-6 lg:p-10">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {product?.productName}
                </h2>

                {/* Price + availability */}
                <div className="mt-5 flex flex-wrap items-center gap-6">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Price
                    </span>
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      Rs.{product?.productPrice}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Availability
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      In Stock ({product?.productTotalStock ?? 0})
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div className="mt-6">
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Category
                  </span>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-700">
                      {product?.Category?.categoryName ?? "—"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Product Description
                  </span>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product?.productDescription}
                  </p>
                </div>

                {/* subtle divider */}
                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

                {/* tiny reassurance row (optional, purely visual) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-800 p-3">
                    ✅ Genuine Product
                  </div>
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-800 p-3">
                    🚚 Fast Delivery
                  </div>
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 ring-1 ring-gray-200 dark:ring-gray-800 p-3">
                    🔒 Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /product shell */}
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
