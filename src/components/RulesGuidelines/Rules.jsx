import React from "react";
import { ShieldEllipsis } from "lucide-react";
import { RulesApi } from "./RulesApi";

const Rules = () => {
  return (
    <section
      id="rules"
      className="relative w-full bg-[#08123B] py-24 overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08123B] via-[#0D1F4D] to-[#08123B] opacity-90"></div>

      <div
        className="relative z-10 w-[90%] lg:w-[75%] mx-auto"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-3">
            <ShieldEllipsis className="text-[#FFD400]" size={36} />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-[Fredoka]">
              Rules & Guidelines
            </h2>
          </div>
          <div className="w-24 h-[3px] bg-[#FFD400] mx-auto rounded-full"></div>
          <p className="text-gray-300 text-base md:text-lg mt-4 font-[Poppins]">
            Please review the competition rules carefully before participating.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {RulesApi.map((rule, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              className="bg-[#0B1741]/70 backdrop-blur-md border border-[#1E3A8A]/40 rounded-2xl p-6 md:p-8 hover:border-[#FFD400]/60 transition-all duration-300 shadow-[0_0_25px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_-5px_rgba(255,212,0,0.3)]"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 h-14 w-14 bg-[#FFD400]/10 border border-[#FFD400]/40 rounded-full flex justify-center items-center">
                  <img
                    src={rule.icon}
                    alt=""
                    className="h-8 w-8 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[#FFD400] font-semibold text-xl md:text-2xl font-[Fredoka]">
                    {rule.heading}
                  </h3>

                  <ul className="list-disc ml-5 text-gray-200 text-[15px] md:text-base leading-relaxed font-[Poppins]">
                    {rule.desc1 && <li>{rule.desc1}</li>}
                    {rule.desc && <li>{rule.desc}</li>}
                    {rule.desc3 && <li>{rule.desc3}</li>}
                    {rule.desc4 && <li>{rule.desc4}</li>}
                    {rule.desc5 && <li>{rule.desc5}</li>}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="flex justify-center mt-16">
          <a
            href="Rules_for_hackfest25.pdf"
            download="Rules_for_hackfest25.pdf"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-[Fredoka] text-lg text-white rounded-full transition-transform transform hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] opacity-90 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="relative z-10 flex flex-col items-center text-center">
              Rules & Guidelines
              <span className="text-sm font-[Poppins] opacity-90">
                (Click to download)
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF]"></div>
    </section>
  );
};

export default Rules;
