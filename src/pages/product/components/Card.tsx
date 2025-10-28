import { Link } from "react-router-dom";
import { type IProduct } from "../types";

interface ICardProps {
  product: IProduct;
}

const Card: React.FC<ICardProps> = ({ product }) => {
  const hasDiscount = Boolean(product?.discount);

  return (
    <Link
      to={`/products/${product?.id}`}
      className="group block w-full max-w-[18rem] mx-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-2xl"
    >
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 via-gray-200 to-gray-200 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
          {/* MEDIA */}
          <div className="relative">
            {/* keep or remove this overlay; it's only 10% */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-black pointer-events-none" />
            <img
              src={`http://localhost:3000/${product?.productImageUrl}`}
              alt="Product"
              className="h-80 w-full object-cover rounded-t-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              {product?.Category?.categoryName && (
                <span className="rounded-full bg-white/95 dark:bg-gray-800/85 text-gray-700 dark:text-gray-200 text-[11px] font-medium px-2.5 py-1 shadow-sm">
                  {product?.Category?.categoryName}
                </span>
              )}
              {hasDiscount && (
                <span className="rounded-full bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-1 shadow-sm">
                  Sale
                </span>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-1">
              {product?.productName}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Rs. {product?.productPrice}/-
              </p>
              {hasDiscount && (
                <del className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  Rs. {product?.discount}/-
                </del>
              )}

              <div className="ml-auto">
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm transition-colors group-hover:bg-gray-900 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
            <div className="pt-3 text-[12px] text-gray-500 dark:text-gray-400">
              Tap to view details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
