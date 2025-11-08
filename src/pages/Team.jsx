import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import ScrollToTopButton from "../components/ScrollToTopButton";
import DeleteTeamMember from "../components/DeleteTeamMember";
import Loader from "../components/Loader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import UpdatePayment from "./Payment";

const Team = () => {
  const token = localStorage.getItem("token");
  const componentRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamMembers, setTeamMembers] = useState(0);

  // Generate ID Card PDF
  const generatePDF = async () => {
    const element = componentRef.current;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${user.name}_team_id.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Fetch team data
  const fetchdata = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/api/users/member/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
      setTeamMembers(res.data.teamMember.length);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load team data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="bg-[#08123B] min-h-screen font-[Fredoka] text-white relative">
      <ScrollToTopButton />

      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#FFD400] mb-2">
          Your Team Overview
        </h2>
        <p className="text-gray-300 max-w-[700px] mx-auto text-sm md:text-base">
          You can add up to <span className="text-[#FFD400] font-semibold">2 members</span> (including yourself).<br />
          Generate your official event ID below after team registration.
        </p>
      </div>

      {/* Loader or Error */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : (
        <>
          {/* Team Members Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-4 md:px-0">
            {data.teamMember?.map((member, idx) => (
              <div
                key={idx}
                className="relative bg-[#0B1741]/80 border border-[#FFD400]/30 rounded-xl p-5 shadow-[0_0_20px_-5px_rgba(255,212,0,0.25)] hover:shadow-[0_0_25px_-5px_rgba(255,212,0,0.35)] transition-all duration-300"
              >
                <div className="flex flex-col gap-2 text-sm md:text-base">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[#FFD400] text-lg font-semibold">
                      {member.name}
                    </h3>
                    <DeleteTeamMember userId={user.id} memberId={member._id} />
                  </div>
                  <p>
                    <span className="text-gray-400">Email:</span> {member.email}
                  </p>
                  <p>
                    <span className="text-gray-400">Contact:</span>{" "}
                    {member.contact}
                  </p>
                  <p>
                    <span className="text-gray-400">Department:</span>{" "}
                    {member.degree}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ID Card Preview Section */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 px-4"
            ref={componentRef}
          >
            {data.teamMember?.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#0C1A4B]/80 border border-[#FFD400]/30 rounded-2xl shadow-[0_0_25px_-5px_rgba(255,212,0,0.25)] p-6 flex flex-col items-center text-white relative"
              >
                <div className="text-center mb-4">
                  <p className="text-[#FFD400] text-sm md:text-base font-semibold tracking-wide">
                    DEPARTMENT OF COMMERCE COMPUTER APPLICATIONS
                  </p>
                  <p className="text-base md:text-lg">St. Joseph's College (Autonomous)</p>
                  <p className="text-2xl md:text-3xl font-[Stylish] mt-2 text-[#FFD400]">
                    HACKFEST’25
                  </p>
                  <p className="text-xs text-gray-400 mt-1">28 November 2025</p>
                </div>

                {/* Details */}
                <div className="w-full grid grid-cols-2 gap-y-2 text-sm md:text-base border-t border-[#FFD400]/30 pt-3">
                  <p>Team ID:</p>
                  <p>{user.teamId}</p>
                  <p>Name:</p>
                  <p>{member.name}</p>
                  <p>College:</p>
                  <p>{user.college}</p>
                  <p>Contact:</p>
                  <p>{member.contact}</p>
                </div>

                <p className="text-[#FFD400] text-center mt-3 text-xs md:text-sm">
                  Valid till 28 November 2025
                </p>
              </div>
            ))}
          </div>

          {/* Download Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={generatePDF}
              className="bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] px-6 py-2.5 rounded-md text-white font-medium hover:opacity-90 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(255,212,0,0.4)]"
            >
              Download Team ID Card (PDF)
            </button>
          </div>

          {/* Payment Info */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-200 text-sm md:text-base gap-3 mb-12 px-4">
            <p>💰 Registration Fee per person: <span className="text-[#FFD400] font-semibold">₹150</span></p>
            <p>
              🧾 Total Team Fee:{" "}
              <span className="text-[#FFD400] font-semibold">
                ₹{teamMembers * 150}
              </span>
            </p>
          </div>

          {/* Payment Component */}
          <div className="px-4 md:px-0">
            <UpdatePayment userId={user.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default Team;
