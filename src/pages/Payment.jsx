import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import { scanner } from "../assets/asset";

function UpdatePayment({ userId }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("paymentImage", file);
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/payment/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error updating payment image:", error);
      alert("Failed to update payment image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto py-10 flex flex-col gap-6 items-center text-center font-[Fredoka] text-white">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#FFD400] drop-shadow-[0_0_10px_rgba(255,212,0,0.3)]">
        Scan & Upload Your Payment Screenshot
      </h2>
      <p className="text-gray-300 text-sm md:text-base max-w-2xl">
        Paymeny Gateway Will be opened on 15th November 2025 All are asked to do the payment before 27 November 2025
      </p>

      {/* QR Code Image */}
      {/*<div className="relative flex justify-center items-center">
        <div className="absolute w-56 h-56 bg-[#FFD400]/10 blur-3xl rounded-full animate-pulse"></div>
        <img
          src={scanner}
          alt="QR Code Scanner"
          className="relative w-60 h-60 sm:w-72 sm:h-72 object-contain rounded-2xl border-2 border-[#FFD400]/30 shadow-[0_0_30px_-5px_rgba(255,212,0,0.4)]"
        />
      </div>*/}

      {/* Upload Form 
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
      >
        <label
          className="px-5 py-2 cursor-pointer bg-[#0E1C4F]/80 border border-[#FFD400]/40 text-white rounded-lg 
                     hover:bg-[#FFD400]/10 hover:border-[#FFD400]/70 
                     shadow-[0_0_15px_-5px_rgba(255,212,0,0.3)] transition-all duration-300"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file ? file.name : "Choose File"}
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300
          ${
            isLoading
              ? "bg-[#FFD400]/50 cursor-wait"
              : "bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] hover:opacity-90 shadow-[0_0_20px_-5px_rgba(255,212,0,0.4)]"
          }`}
        >
          {isLoading ? "Uploading..." : "Upload Screenshot"}
        </button>
      </form>*/}

      {/* Response Message */}
      {message && (
        <div className="mt-5 text-[#00FF94] text-lg font-medium animate-fadeIn">
          {message}
        </div>
      )}
    </div>
  );
}

export default UpdatePayment;
