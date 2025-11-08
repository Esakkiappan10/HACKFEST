import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";

const Login = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/api/users/login", data);
      setToken(response.data.token);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if (response.data.email === "admin@mail.sjctni.edu") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
      reset();
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token]);

  return (
    <div className="bg-[#08123B] min-h-screen flex flex-col justify-center">
      <Layout>
        <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center"
          >
            <div className="flex flex-col gap-6 p-8 md:p-10 lg:p-12 w-full max-w-[400px] bg-[#0C1A4B]/70 border border-[#FFD400]/20 rounded-2xl shadow-[0_0_25px_-5px_rgba(255,212,0,0.15)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(255,212,0,0.25)]">
              
              {/* Title */}
              <div className="text-center mb-2">
                <h2 className="font-[Stylish] text-[26px] md:text-[30px] text-[#241bca]">
                  HACKFEST’25
                </h2>
                <p className="font-[Fredoka] text-white text-lg md:text-xl mt-1">
                  Login
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="email"
                  className="text-white text-sm mb-1 font-[Poppins]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full p-2.5 bg-[#0E1C4F]/70 border border-[#FFD400]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD400] transition-all duration-300"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="password"
                  className="text-white text-sm mb-1 font-[Poppins]"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2.5 bg-[#0E1C4F]/70 border border-[#FFD400]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD400] transition-all duration-300"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm text-center font-[Poppins]">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`relative overflow-hidden w-full py-2.5 rounded-md font-[Fredoka] text-white transition-all duration-500 ${
                  isLoading
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#e3ad62] via-[#FF6B00] to-[#00A2FF] hover:opacity-90"
                }`}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              {/* Info Section */}
              <div className="text-center text-white text-sm font-[Poppins] mt-2">
                <p className="mb-1">
                  Forgot password? <br />
                  <span className="text-[#FFD400]">Contact Registration Team!</span>
                </p>
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#FFD400] hover:underline transition"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
