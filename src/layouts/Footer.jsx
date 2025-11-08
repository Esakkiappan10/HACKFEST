import React from "react";

const Footer = () => {
  return (
    
    <footer className="relative w-full bg-[#08123B] text-white font-[Fredoka] overflow-hidden">
      
      {/* Gradient Divider */}
      <div className="w-full h-[8px] bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF]"></div>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08123B] via-[#0D1F4D] to-[#08123B] opacity-95"></div>


      {/* Content Wrapper */}
      <div className="relative z-10 w-[90%] md:w-[85%] lg:w-[75%] mx-auto py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start">
        
        {/* --- Left Column — About --- */}
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <h2 className="text-[28px] md:text-[32px] font-[Stylish] text-[#FFD400] tracking-wide hover:tracking-wider transition-all duration-300">
            HACKFEST ’25
          </h2>

          <p className="text-gray-300 leading-relaxed text-[14px] sm:text-[15px] md:text-[16px] font-[Poppins] max-w-[600px] mx-auto lg:mx-0">
            <span className="text-[#FFD400] font-semibold">HACKFEST ’25</span> — 
            “Where Logic Meets Ledger” is a state-level intercollegiate hackathon hosted by the{" "}
            <span className="text-[#FFD400]">Department of Commerce Computer Applications</span>, 
            St. Joseph’s College (Autonomous), Tiruchirappalli. A platform to collaborate, 
            innovate, and solve real-world financial and technical challenges.
          </p>
        </div>

        {/* --- Right Column — Contact --- */}
        <div className="flex flex-col gap-5 text-center lg:text-right font-[Poppins] text-[14px] sm:text-[15px] md:text-[16px]">
          <h3 className="text-[#FFD400] text-[18px] md:text-[20px] font-semibold uppercase tracking-wide">
            Contact
          </h3>

          <ul className="space-y-2 text-gray-300 leading-relaxed">
            <li>
              <a
                href="tel:+916382503265"
                className="hover:text-[#FFD400] transition-all duration-200"
              >
                Mr. Honey Joe — 63825&nbsp;03265
              </a>
            </li>
            <li>
              <a
                href="tel:+919500402904"
                className="hover:text-[#FFD400] transition-all duration-200"
              >
                Mr. Prasanna&nbsp;Balaji&nbsp;R — 95004&nbsp;02904
              </a>
            </li>
            <li>
              <a
                href="tel:+918270170975"
                className="hover:text-[#FFD400] transition-all duration-200"
              >
                Ms.&nbsp;Lakshmi&nbsp;C — 82701&nbsp;70975
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
