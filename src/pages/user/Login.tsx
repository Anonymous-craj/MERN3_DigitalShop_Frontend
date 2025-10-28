import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { Status, type ILogin } from "../../globals/types/type";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import react-hot-toast

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loginStatus, registerStatus } = useAppSelector(
    (store) => store.auth
  ); // Use both loginStatus and registerStatus
  const [data, setData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(data)); // Dispatch login action
  };

  // Redirect after successful login or registration
  useEffect(() => {
    if (loginStatus === Status.SUCCESS && user) {
      toast.success("Login successful!"); // Toast notification on success
      navigate("/"); // Navigate to homepage after successful login
    } else if (registerStatus === Status.SUCCESS) {
      navigate("/login"); // Redirect to login page after successful registration
    }
  }, [loginStatus, registerStatus, user, navigate]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl shadow-lg bg-white opacity-90">
        <div className="flex justify-center">
          <img
            className="h-16 w-16"
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt="User Icon"
          />
        </div>

        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
          Login Page
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-white font-medium rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition"
            >
              Log In
            </button>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-sm text-sky-500 hover:text-sky-700"
            >
              Forgot Password?
            </Link>
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-sky-500 hover:text-sky-700"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
