import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <section
        id="about"
        className="relative w-full bg-[#08123B] text-white py-24 overflow-hidden"
      >
        {/* Background Gear Pattern (optional aesthetic element) */}
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/gear-bg.svg')] bg-cover bg-center"></div>

        <div
          className="relative w-[90%] lg:w-[75%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          data-aos="fade-up"
        >
          {/* Left Section */}
          <div className="flex flex-col gap-5 text-center lg:text-left">
            <p className="text-yellow-400 font-semibold text-lg uppercase tracking-wide">
              About the Event
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              HACKFEST ’25
              <br />
              <span className="text-[#FBBF24]">
                A State Level Intercollegiate Hackathon
              </span>
            </h2>

            <div className="w-24 h-[3px] bg-[#FBBF24] mx-auto lg:mx-0 rounded-full"></div>
          </div>

          {/* Right Section */}
          <div>
            <p className="text-base md:text-lg leading-8 text-gray-200 font-medium text-justify">
              <span className="text-[#FBBF24] font-semibold">
                HACKFEST ’25 – “Where Logic Meets Ledger”
              </span>{" "}
              is a state-level intercollegiate hackathon organized by the{" "}
              <span className="text-white font-semibold">
                Department of Commerce Computer Applications, St. Joseph’s
                College (Autonomous), Tiruchirappalli
              </span>
              . This 6-hour coding challenge provides an exceptional platform
              for students to showcase their creativity, technical brilliance,
              and innovative thinking. Participants will collaborate to develop
              real-world solutions that combine logic, innovation, and
              technology to transform the financial landscape.
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600"></div>
      </section>
    </>
  );
};

export default About;
