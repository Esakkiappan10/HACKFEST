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

  const generatePDF = async () => {
    const container = componentRef.current;
    if (!container) {
      alert("Preview not found!");
      return;
    }

    try {
      const idCards = container.querySelectorAll(".id-card-item");
      if (idCards.length === 0) {
        alert("No ID cards found.");
        return;
      }

      // Card dimensions in px (match preview)
      const CARD_WIDTH_PX = 340;
      const CARD_HEIGHT_PX = 214;

      // Credit-card size in mm
      const CARD_WIDTH_MM = 85.6;
      const CARD_HEIGHT_MM = 53.98;

      // Detect mobile
      const isMobile = window.matchMedia("(max-width: 767.98px)").matches;

      for (let i = 0; i < idCards.length; i++) {
        const card = idCards[i];
        const member = data.teamMember[i];
        const memberName = member?.name || `Member${i + 1}`;

        if (!isMobile) {
          // ===== DESKTOP: html2canvas =====
          const canvas = await html2canvas(card, {
            scale: 4,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#0C1A4B",
            width: CARD_WIDTH_PX,
            height: CARD_HEIGHT_PX,
            logging: false,
          });

          const imgData = canvas.toDataURL("image/png", 1.0);
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [CARD_HEIGHT_MM, CARD_WIDTH_MM],
            compress: true,
          });

          const pxToMm = (px) => (px * CARD_WIDTH_MM) / CARD_WIDTH_PX;
          const imgWidth = pxToMm(CARD_WIDTH_PX);
          const imgHeight = pxToMm(CARD_HEIGHT_PX);

          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

          const sanitizedName = memberName.replace(/[^a-z0-9\s]/gi, "_").trim();
          pdf.save(`${sanitizedName}_HACKFEST25_ID.pdf`);
        } else {
          // ===== MOBILE: Direct Canvas Drawing =====
          const canvas = document.createElement('canvas');
          const scale = 3; // High quality
          canvas.width = CARD_WIDTH_PX * scale;
          canvas.height = CARD_HEIGHT_PX * scale;
          const ctx = canvas.getContext('2d');
          
          // Scale context
          ctx.scale(scale, scale);
          
          // Background
          ctx.fillStyle = '#0C1A4B';
          ctx.fillRect(0, 0, CARD_WIDTH_PX, CARD_HEIGHT_PX);
          
          // Border
          ctx.strokeStyle = '#FFD400';
          ctx.lineWidth = 2;
          ctx.strokeRect(1, 1, CARD_WIDTH_PX - 2, CARD_HEIGHT_PX - 2);
          
          // Header Section
          ctx.textAlign = 'center';
          ctx.fillStyle = '#FFD400';
          ctx.font = '600 10px Fredoka, sans-serif';
          ctx.fillText("St. Joseph's College (Autonomous)", CARD_WIDTH_PX / 2, 28);
          
          ctx.fillStyle = 'white';
          ctx.font = '700 18px Fredoka, sans-serif';
          ctx.fillText("HACKFEST'25", CARD_WIDTH_PX / 2, 50);
          
          ctx.fillStyle = '#9CA3AF';
          ctx.font = '400 9px Fredoka, sans-serif';
          ctx.fillText("28 November 2025", CARD_WIDTH_PX / 2, 64);
          
          // Details Section
          ctx.textAlign = 'left';
          const leftMargin = 20;
          const rightStart = 100;
          let yPos = 95;
          const lineHeight = 15;
          
          // Helper to draw detail row
          const drawDetail = (label, value) => {
            ctx.fillStyle = '#D1D5DB';
            ctx.font = '400 11px Fredoka, sans-serif';
            ctx.fillText(label, leftMargin, yPos);
            
            ctx.fillStyle = 'white';
            ctx.font = '500 11px Fredoka, sans-serif';
            
            // Truncate long text
            const maxWidth = CARD_WIDTH_PX - rightStart - 20;
            let displayValue = value;
            const metrics = ctx.measureText(value);
            if (metrics.width > maxWidth) {
              while (ctx.measureText(displayValue + '...').width > maxWidth && displayValue.length > 0) {
                displayValue = displayValue.slice(0, -1);
              }
              displayValue += '...';
            }
            
            ctx.fillText(displayValue, rightStart, yPos);
            yPos += lineHeight;
          };
          
          drawDetail('Team ID:', user.teamId || 'N/A');
          drawDetail('Name:', member?.name || 'N/A');
          drawDetail('College:', user.college || 'N/A');
          drawDetail('Contact:', member?.contact || 'N/A');
          
          // Footer line
          ctx.strokeStyle = 'rgba(255, 212, 0, 0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(20, 180);
          ctx.lineTo(CARD_WIDTH_PX - 20, 180);
          ctx.stroke();
          
          // Footer text
          ctx.textAlign = 'center';
          ctx.fillStyle = '#FFD400';
          ctx.font = '500 9px Fredoka, sans-serif';
          ctx.fillText("Valid till 28 November 2025", CARD_WIDTH_PX / 2, 197);
          
          // Convert to PDF
          const imgData = canvas.toDataURL('image/png', 1.0);
          
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [CARD_HEIGHT_MM, CARD_WIDTH_MM],
            compress: true,
          });
          
          pdf.addImage(
            imgData,
            'PNG',
            0,
            0,
            CARD_WIDTH_MM,
            CARD_HEIGHT_MM,
            undefined,
            'FAST'
          );
          
          const sanitizedName = memberName.replace(/[^a-z0-9\s]/gi, '_').trim();
          pdf.save(`${sanitizedName}_HACKFEST25_ID.pdf`);
        }

        // Delay between cards
        if (i < idCards.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 700));
        }
      }

      console.log("✅ All ID cards generated successfully!");
    } catch (err) {
      console.error("❌ Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
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
          You can add up to{" "}
          <span className="text-[#FFD400] font-semibold">2 members</span>{" "}
          (including yourself).<br />
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
          <div className="mb-8 px-4">
            <h3 className="text-xl font-semibold text-[#FFD400] mb-4 text-center">
              Preview ID Cards
            </h3>
            <div className="flex flex-wrap justify-center gap-6" ref={componentRef}>
              {data.teamMember?.map((member, idx) => (
                <div
                  key={idx}
                  className="id-card-item bg-[#0C1A4B] border-2 border-[#FFD400] rounded-lg overflow-hidden"
                  style={{
                    width: "340px",
                    height: "214px",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Header */}
                  <div className="text-center">
                    <p className="text-[#FFD400] text-xs font-semibold">
                      St. Joseph's College (Autonomous)
                    </p>
                    <p className="text-white text-lg font-bold mt-1">HACKFEST'25</p>
                    <p className="text-gray-400 text-[10px]">28 November 2025</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Team ID:</span>
                      <span className="text-white font-medium">{user.teamId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Name:</span>
                      <span className="text-white font-medium">{member.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">College:</span>
                      <span className="text-white font-medium text-right ml-2">
                        {user.college}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Contact:</span>
                      <span className="text-white font-medium">{member.contact}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center border-t border-[#FFD400]/30 pt-2">
                    <p className="text-[#FFD400] text-[10px] font-medium">
                      Valid till 28 November 2025
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={generatePDF}
              className="bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] px-6 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(255,212,0,0.4)]"
            >
              📥 Download ID Cards (PDF)
            </button>
          </div>

          {/* Payment Info */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-200 text-sm md:text-base gap-3 mb-12 px-4">
            <p>
              💰 Registration Fee per person:{" "}
              <span className="text-[#FFD400] font-semibold">₹150</span>
            </p>
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