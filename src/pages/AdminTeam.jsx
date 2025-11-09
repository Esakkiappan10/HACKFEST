import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import DisplayPaymentImage from "./TeamImage";
import Loader from "../components/Loader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminTeam = () => {
  const id = useParams();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const componentRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchdata = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BASE_URL}/api/users/member/${id.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const generatePDF = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    if (imgWidth > pdfWidth) {
      const scaleFactor = pdfWidth / imgWidth;
      const adjustedHeight = imgHeight * scaleFactor;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, adjustedHeight);
    } else {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save(`${data.name || "team"}_id.pdf`);
  };

  return (
    <div className="bg-[#08123B] min-h-screen">
      <Layout>
        <div className="w-[90%] lg:w-[65%] mx-auto py-[100px]" ref={componentRef}>
          <p className="font-[Fredoka] text-[#FFD400] text-3xl mb-8 text-center tracking-wide">
            {data.name ? `${data.name}'s Team!` : "Team Details"}
          </p>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 font-medium py-10">
              {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {data.teamMember && data.teamMember.length > 0 ? (
                  data.teamMember.map((e, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start gap-3 bg-[#0E1C4F]/90 border border-[#FFD400]/30 
                                 py-5 px-5 rounded-lg shadow-[0_0_15px_-5px_rgba(255,212,0,0.4)] 
                                 transition-all duration-200 hover:shadow-[0_0_25px_-5px_rgba(255,212,0,0.6)]"
                    >
                      <div className="flex justify-between w-full text-sm">
                        <p className="font-semibold text-[#FFD400]">Name:</p>
                        <span className="text-gray-100">{e.name}</span>
                      </div>
                      <div className="flex justify-between w-full text-sm">
                        <p className="font-semibold text-[#00A2FF]">Email:</p>
                        <span className="text-gray-200">{e.email}</span>
                      </div>
                      <div className="flex justify-between w-full text-sm">
                        <p className="font-semibold text-[#00A2FF]">Dept No:</p>
                        <span className="text-gray-200">{e.degree}</span>
                      </div>
                      <div className="flex justify-between w-full text-sm">
                        <p className="font-semibold text-[#FF6B00]">Contact:</p>
                        <span className="text-gray-200">{e.contact}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 text-lg font-medium">
                    No team members added yet.
                  </div>
                )}
              </div>

              {/* Payment Image */}
              <div className="mt-10">
                <DisplayPaymentImage userId={data._id} />
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default AdminTeam;
