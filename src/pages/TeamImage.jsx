import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import Loader from "../components/Loader";

function DisplayPaymentImage({ userId }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/users/payment/${userId}`, {
          responseType: "blob",
        });

        if (response.data.size === 0) {
          setImageSrc(null);
        } else {
          const imageURL = URL.createObjectURL(response.data);
          setImageSrc(imageURL);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 py-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          {imageSrc ? (
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <img
                src={imageSrc}
                alt="Payment"
                className="w-full h-auto rounded-lg object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
              <p className="text-2xl font-semibold">Payment Image Not Provided</p>
              <p className="text-sm text-gray-400">
                The user hasn’t uploaded a payment screenshot yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayPaymentImage;
