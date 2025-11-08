import React, { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BASE_URL } from "../BASE_URL";
import Layout from "../layouts/Layout";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const schema = z
    .object({
      email: z.string().email("Enter a valid email"),
      name: z.string().min(1, { message: "Enter your name" }),
      college: z.string().min(1, { message: "Enter your college name" }),
      dept: z.string().min(1, { message: "Enter your department" }),
      contact: z
        .string()
        .min(10, { message: "Enter correct phone number" })
        .max(10, { message: "Enter correct phone number" }),
      password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters" }),
      confirmPassword: z
        .string()
        .min(4, { message: "Please confirm your password" }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const { confirmPassword, ...submitData } = data;
      await axios.post(BASE_URL + "/api/users/", submitData);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#08123B] min-h-screen flex flex-col justify-center">
      <Layout>
        <div className="w-[90%] lg:w-[70%] mx-auto py-16">
          {/* Header */}
          <div className="text-center text-white mb-10">
            <h1 className="font-[Stylish] text-3xl md:text-5xl text-[#1500ff] mb-2">
              Welcome to HACKFEST’25
            </h1>
            <p className="font-[Fredoka] text-gray-300 text-[15px] md:text-[17px]">
              Register now to participate in the most thrilling hackathon of the year!
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center"
          >
            <div className="flex flex-col gap-5 p-8 md:p-10 w-full max-w-[450px] bg-[#0C1A4B]/70 border border-[#FFD400]/20 rounded-2xl shadow-[0_0_25px_-5px_rgba(255,212,0,0.15)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(255,212,0,0.25)]">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-white text-sm mb-1 font-[Poppins]">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                  className="input-field"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-white text-sm mb-1 font-[Poppins]">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="example@mail.com"
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="flex flex-col">
                <label className="text-white text-sm mb-1 font-[Poppins]">
                  Department
                </label>
                <input
                  type="text"
                  {...register("dept")}
                  placeholder="Your department"
                  className="input-field"
                />
                {errors.dept && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.dept.message}
                  </p>
                )}
              </div>

              {/* College */}
              <div className="flex flex-col">
                <label className="text-white text-sm mb-1 font-[Poppins]">
                  College
                </label>
                <input
                  type="text"
                  {...register("college")}
                  placeholder="Your college name"
                  className="input-field"
                />
                {errors.college && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.college.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <label className="text-white text-sm mb-1 font-[Poppins]">
                  Contact Number
                </label>
                <input
                  type="text"
                  {...register("contact")}
                  placeholder="10-digit number"
                  className="input-field"
                />
                {errors.contact && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="text-white text-sm mb-1 font-[Poppins]">
                  Create Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter password"
                  className="input-field"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label className="text-white text-sm mb-1 font-[Poppins]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Re-enter password"
                  className="input-field"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`relative overflow-hidden w-full py-2.5 rounded-md font-[Fredoka] text-white transition-all duration-500 ${
                  isLoading
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] hover:opacity-90"
                }`}
              >
                {isLoading ? "Submitting..." : "Register"}
              </button>

              {/* Login Redirect */}
              <p className="text-white text-sm text-center mt-2 font-[Poppins]">
                Already Registered?{" "}
                <Link
                  to="/login"
                  className="text-[#FFD400] underline underline-offset-2 hover:text-[#FFB800] transition"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Register;