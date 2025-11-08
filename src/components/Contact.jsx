import { Phone } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#08123B] py-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08123B] via-[#0D1F4D] to-[#08123B] opacity-95"></div>

      <div
        className="relative z-10 w-[90%] lg:w-[75%] mx-auto text-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white font-[Fredoka] mb-8">
          Contact
        </h2>
        <div className="w-24 h-[3px] bg-[#FFD400] mx-auto mb-16 rounded-full"></div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Organizing Secretaries */}
          <div className="bg-[#0B1741]/80 backdrop-blur-md border border-[#1E3A8A]/40 hover:border-[#FFD400]/60 transition-all duration-300 rounded-2xl p-6 text-center shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_-5px_rgba(255,212,0,0.3)]">
            <h3 className="text-[#FFD400] text-xl md:text-2xl font-semibold font-[Fredoka] mb-4">
              Organizing Secretaries
            </h3>
            <ul className="space-y-2 text-gray-200 font-[Poppins] text-[15px] md:text-[15px]">
              <li>Dr. N. Maheswari - (HOD)</li>
               <li> <a
                  href="tel:+919629482064"
                  className="hover:text-[#FFD400] transition"
                >Dr. B. Fathimamary</a></li>
              <li>
                 <a
                  href="tel:+917598001419"
                  className="hover:text-[#FFD400] transition"
                >
                Ms. P.Lekha</a></li>
            </ul>
          </div>

          {/* Student Organizers */}
          <div className="bg-[#0B1741]/80 backdrop-blur-md border border-[#1E3A8A]/40 hover:border-[#FFD400]/60 transition-all duration-300 rounded-2xl p-6 text-center shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_-5px_rgba(255,212,0,0.3)]">
            <h3 className="text-[#FFD400] text-xl md:text-2xl font-semibold font-[Fredoka] mb-4">
              Student Organizers
            </h3>
            <ul className="space-y-2 text-gray-200 font-[Poppins] text-[15px] md:text-[14px]">
              <li>
                <a
                  href="tel:+919500402904"
                  className="hover:text-[#FFD400] transition"
                >
                Mr. Prasanna Balaji R - +91 95004 02904
                </a>
                </li>
              <li>
                <a
                  href="tel:+918270170975"
                  className="hover:text-[#FFD400] transition"
                >
                  Ms. Lakshmi C - +91 82701 70975
                </a>
              </li>
            </ul>
          </div>

          {/* Registration Queries */}
          <div className="bg-[#0B1741]/80 backdrop-blur-md border border-[#1E3A8A]/40 hover:border-[#FFD400]/60 transition-all duration-300 rounded-2xl p-6 text-center shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_-5px_rgba(255,212,0,0.3)]">
            <h3 className="text-[#FFD400] text-xl md:text-2xl font-semibold font-[Fredoka] mb-4">
              Registration Queries
            </h3>
            <ul className="space-y-3 text-gray-200 font-[Poppins] text-[15px] md:text-[16px]">
              <li>
              </li>
              <li>
                <a
                  href="tel:+916382503265"
                  className="flex items-center justify-center gap-2 hover:text-[#FFD400] transition"
                >
                  <Phone size={18} /> Mr. Honey Joe - 6382503265
                </a>
              </li>
              <li>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Line */}
        <div className="mt-16 text-center text-gray-400 text-sm font-[Poppins]">
          <p>
            For additional details, contact the{" "}
            <span className="text-[#FFD400] font-semibold">
              Department of Commerce Computer Applications, St. Joseph’s College
              (Autonomous), Tiruchirappalli.
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Gradient Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF]"></div>
    </section>
  );
};

export default Contact;
