import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../../store/cartSlice";
import { resetLoginErrorMessage, resetUser } from "../../store/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);

  useEffect(() => {
    // Check both Redux and localStorage whenever Redux token changes
    const localStorageToken = localStorage.getItem("token");

    if (reduxToken || localStorageToken) {
      setIsLoggedIn(true);
      if (isLoggedIn) {
        dispatch(fetchCartItems());
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [reduxToken, isLoggedIn]);

  // Handle logout functionality
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Reset user data in Redux store
    dispatch(resetUser());

    // Reset the login error message explicitly
    dispatch(resetLoginErrorMessage()); // Reset the error message in case it was set

    // Show toast notification
    toast.success("Logged out successfully!");
    navigate("/login");

    // Stay on homepage (do not navigate to login page)
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200/70 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center">
            {/* Attractive gradient icon */}
            <div className="mr-3 h-11 w-11 grid place-content-center rounded-2xl ring-1 ring-sky-100 bg-gradient-to-br from-sky-50 to-white shadow-sm">
              <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden>
                <defs>
                  <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 24a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3l-3 22a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4l-3-22Z"
                  fill="url(#brandGrad)"
                  opacity="0.18"
                />
                <path
                  d="M21 21h22a3 3 0 0 1 3 3l-3 22a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4l-3-22a3 3 0 0 1 3-3Z"
                  fill="none"
                  stroke="url(#brandGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Brand name with subtle accent underline */}
            <Link to="/" className="relative select-none">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Digital Shop
              </span>
              <span className="absolute left-0 -bottom-1 h-[3px] w-1/2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"></span>
            </Link>
          </div>

          {/* Primary nav */}
          <nav className="flex mt-4 sm:mt-0 text-sm font-medium text-slate-700">
            <Link
              className="px-4 relative hover:text-slate-900 after:absolute after:left-4 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-[calc(100%-2rem)] after:bg-slate-900 after:transition-all"
              to="/products"
            >
              Products
            </Link>
            <Link
              className="px-4 relative hover:text-slate-900 after:absolute after:left-4 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-[calc(100%-2rem)] after:bg-slate-900 after:transition-all"
              to="/my-orders"
            >
              My Orders
            </Link>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <>
                <span className="mr-5 inline-block">
                  <Link
                    to="/my-cart"
                    className="relative inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50 transition"
                  >
                    <span className="sr-only">Cart</span>
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                      <defs>
                        <linearGradient
                          id="cartGrad"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M3 5h2l1.6 9.2A2 2 0 0 0 8.57 16H18a2 2 0 0 0 2-1.6l1.2-6A1 1 0 0 0 20.22 7H6"
                        fill="none"
                        stroke="url(#cartGrad)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="9" cy="19" r="1.6" fill="url(#cartGrad)" />
                      <circle cx="17" cy="19" r="1.6" fill="url(#cartGrad)" />
                    </svg>

                    {/* Badge */}
                    <span className="absolute -top-1 -right-1 inline-flex min-w-[1.25rem] justify-center rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-1.5 text-[10px] font-bold leading-5 text-white shadow-sm">
                      {items.length > 0 ? items.length : 0}
                    </span>
                  </Link>
                </span>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-2.5 px-5 text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20 hover:translate-y-[-1px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button
                    type="button"
                    className="mr-3 py-2.5 px-5 text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition"
                  >
                    Register
                  </button>
                </Link>

                <Link to="/login">
                  <button
                    type="button"
                    className="py-2.5 px-5 text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/20 hover:translate-y-[-1px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition"
                  >
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
