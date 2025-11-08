import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "../layouts/Layout";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Team from "./Team";
import { Dialog, Pane } from "evergreen-ui";
import WhatsAppJoinButton from "../components/WhatsAppJoin";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const token = localStorage.getItem("token");

  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1, { message: "Enter your Name" }),
    degree: z.string().min(1, { message: "Enter your Department" }),
    contact: z.string().min(10, { message: "Enter correct phone number" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onsubmit = async (formData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/member/${user.id}/team`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(`${formData.name} is Registered!`);
      reset();
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#08123B] min-h-screen flex flex-col">
      <Layout>
        <ScrollToTopButton />
        <div className="w-[90%] lg:w-[75%] mx-auto py-20 flex flex-col gap-10 font-[Fredoka]">
          
          {/* --- Welcome Section --- */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-white">
            <div className="space-y-2 max-w-[600px]">
              <h1 className="text-3xl md:text-4xl font-semibold text-[#FFD400]">
                Hi, {user.name}! 👋
              </h1>
              <p className="text-gray-300">
                Your <span className="text-[#FFD400]">Team ID</span> is{" "}
                <span className="font-semibold">{user.teamId}</span>
              </p>
              <p className="text-[16px] md:text-lg leading-relaxed text-gray-200">
                Register your teammates to receive your{" "}
                <span className="text-[#FFD400]">Event ID Cards</span>. Please
                bring both soft and printed copies on the event day.
              </p>
            </div>

            <Pane>
              <button
                onClick={() => setIsShown(true)}
                className="px-5 py-2.5 text-white font-medium border-2 border-[#FFD400]/50 rounded-lg bg-[#0E1C4F]/50 hover:bg-[#FFD400]/20 transition-all duration-300 shadow-[0_0_10px_rgba(255,212,0,0.25)]"
              >
                + Add Participant
              </button>

              {/* --- Participant Dialog --- */}
              <Dialog
                isShown={isShown}
                title="Add Your Teammate"
                onCloseComplete={() => setIsShown(false)}
                hasFooter={false}
                containerProps={{
                  className: "backdrop-blur-md bg-black/50",
                }}
              >
                <form
                  onSubmit={handleSubmit(onsubmit)}
                  className="flex flex-col gap-5 font-[Poppins]"
                >
                  <div className="flex flex-col gap-4 p-6 bg-[#0B1741]/90 border border-[#FFD400]/20 rounded-xl shadow-[0_0_25px_-5px_rgba(255,212,0,0.25)]">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label className="text-sm text-[#FFD400] mb-1 font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        className="input-field"
                        placeholder="Enter teammate name"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name?.message}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-sm text-[#FFD400] mb-1 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="input-field"
                        placeholder="example@mail.com"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email?.message}
                      </p>
                    </div>

                    {/* Department */}
                    <div className="flex flex-col">
                      <label className="text-sm text-[#FFD400] mb-1 font-medium">
                        Department No.
                      </label>
                      <input
                        type="text"
                        {...register("degree")}
                        className="input-field"
                        placeholder="Enter department number"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.degree?.message}
                      </p>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col">
                      <label className="text-sm text-[#FFD400] mb-1 font-medium">
                        Contact
                      </label>
                      <input
                        type="text"
                        {...register("contact")}
                        className="input-field"
                        placeholder="Enter contact number"
                      />
                      <p className="text-red-400 text-xs mt-1">
                        {errors.contact?.message}
                      </p>
                    </div>

                    {/* Error & Success */}
                    {error && (
                      <p className="text-red-500 text-sm text-center">
                        {error}
                      </p>
                    )}
                    {data && (
                      <p className="text-green-400 text-sm text-center">
                        {data}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`mt-2 w-full py-2.5 rounded-md font-[Fredoka] text-white transition-all duration-500 ${
                        isLoading
                          ? "bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] hover:opacity-90"
                      }`}
                    >
                      {isLoading ? "Registering..." : "Register"}
                    </button>
                  </div>
                </form>
              </Dialog>
            </Pane>
          </div>

          {/* --- Team Section --- */}
          <div className="bg-[#0B1741]/60 p-6 rounded-2xl border border-[#FFD400]/20 shadow-[0_0_25px_-5px_rgba(255,212,0,0.25)]">
            <Team />
          </div>

          {/* --- WhatsApp Info --- */}
          <div className="text-white space-y-3">
            <p className="text-lg md:text-xl">
              📢 Updates will be posted in the{" "}
              <span className="text-[#FFD400] font-semibold">WhatsApp group</span>.
            </p>
            <WhatsAppJoinButton />
          </div>

          {/* --- Registration Status --- */}
          {user.payment?.image?.data && (
            <div className="text-center text-green-400 text-lg">
              ✅ You're already registered!
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Profile;