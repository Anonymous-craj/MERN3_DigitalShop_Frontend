import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser } from "../../store/authSlice";
import { Status } from "../../globals/types/type";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registerStatus } = useAppSelector((store) => store.auth);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Listen for registration success or failure
  useEffect(() => {
    if (registerStatus === Status.SUCCESS) {
      toast.success("User registered successfully!");
      navigate("/login"); // Redirect after successful registration
    } else if (registerStatus === Status.ERROR) {
      setError("Something went wrong! Please try again.");
      setIsLoading(false);
    }
  }, [registerStatus, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error on each attempt

    // Basic Frontend Validation
    if (!data.username || !data.email || !data.password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (data.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    try {
      // Attempt to register user
      await dispatch(registerUser(data)); // dispatch register action
    } catch (error: unknown) {
      // Error handling based on Axios response
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message.includes("email")
        ) {
          setError(
            "This email is already registered. Please try a different email."
          );
        } else {
          setError("Something went wrong! Please try again.");
        }
      } else {
        setError("An unknown error occurred.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 overflow-hidden z-50">
          <div className="h-full w-1/3 animate-[progress_1.2s_ease-in-out_infinite] bg-gradient-to-r from-sky-500 to-blue-600 rounded-r-full" />
        </div>
      )}

      {registerStatus === Status.SUCCESS && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-xl bg-white ring-1 ring-slate-200 shadow-lg px-4 py-3">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-emerald-600"
              aria-hidden
            >
              <path
                d="M20 7L9 18l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-slate-800 font-semibold">
              User registration success!
            </p>
          </div>
        </div>
      )}

      <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-slate-200 shadow-xl p-6 sm:p-8">
            <div className="mx-auto mb-4 h-14 w-14 grid place-content-center rounded-2xl ring-1 ring-sky-100 bg-gradient-to-br from-sky-50 to-white shadow-sm">
              <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
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
                />
              </svg>
            </div>

            <h2 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-slate-900">
              Create your account
            </h2>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    name="username"
                    id="username"
                    type="text"
                    required
                    disabled={isLoading}
                    className="px-3 py-3 mt-1 block w-full rounded-xl border border-slate-200 bg-white shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 sm:text-sm disabled:opacity-60"
                    onChange={handleChange}
                    value={data.username}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    required
                    disabled={isLoading}
                    className="px-3 py-3 mt-1 block w-full rounded-xl border border-slate-200 bg-white shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 sm:text-sm disabled:opacity-60"
                    onChange={handleChange}
                    value={data.email}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    required
                    disabled={isLoading}
                    className="px-3 py-3 mt-1 block w-full rounded-xl border border-slate-200 bg-white shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 sm:text-sm disabled:opacity-60"
                    onChange={handleChange}
                    value={data.password}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`group relative flex w-full items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-sky-600 to-blue-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-sky-600/20 hover:translate-y-[-1px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="absolute left-4 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                  )}
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </div>

              <p className="text-center text-sm text-slate-600">
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold text-sky-600 hover:text-sky-700"
                >
                  Login Page
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
