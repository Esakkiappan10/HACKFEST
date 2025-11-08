import React from "react";
import { motion } from "framer-motion";

const Schedule = () => {
  const scheduleData = [
    { time: "9:00", meridian: "AM", title: "Inauguration Ceremony" },
    { time: "9:30", meridian: "AM", title: "Problem Addressing" },
    { time: "11:15", meridian: "AM", title: "Coffee Break", duration: "15 mins" },
    { time: "1:00", meridian: "PM", title: "Lunch", duration: "45 mins" },
    { time: "4:00", meridian: "PM", title: "Valedictory Ceremony" },
  ];

  return (
    <section
      id="schedule"
      className="relative w-full bg-[#08123B] py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#102A6C_0%,#08123B_70%)]"></div>

      <div
        className="relative z-10 w-[90%] lg:w-[75%] mx-auto text-center"
        data-aos="fade-up"
      >
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white font-[Fredoka] mb-4">
          Event Schedule
        </h2>
        <div className="w-24 h-[4px] bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] mx-auto mb-16 rounded-full"></div>

        {/* Clock Container */}
        <div className="relative flex justify-center items-center w-full">
          {/* Outer glowing ring */}
          <div className="absolute w-[480px] h-[480px] md:w-[580px] md:h-[580px] rounded-full border-[2.5px] border-[#FFD400]/40 animate-[spin_50s_linear_infinite]"></div>

          {/* Inner glowing ring */}
          <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border-[2px] border-[#00A2FF]/40 animate-[spin_70s_linear_infinite_reverse]"></div>

          {/* Soft center glow */}
          <div className="absolute w-[130px] h-[130px] rounded-full bg-gradient-to-tr from-[#FFD400] to-[#FF6B00] blur-xl opacity-60 animate-pulse"></div>

          {/* Points perfectly between the rings */}
          <div className="relative w-[480px] h-[480px] md:w-[580px] md:h-[580px] translate-x-[-5px] translate-y-[-10px]">
            {scheduleData.map((item, index) => {
              const total = scheduleData.length;
              const angle = (index * (360 / total)) - 90; // start from top
              const radius = 200; // halfway between inner (200) and outer (290)
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);

              return (
                <motion.div
                  key={index}
                  className="absolute flex flex-col items-center justify-center text-center text-white"
                  style={{
                    top: `calc(50% + ${y - 40}px)`,
                    left: `calc(50% + ${x - 60}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                  }}
                >
                  {/* Time bubble */}
                  <motion.div
                    className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full border-2 border-[#FFD400]/70 flex flex-col justify-center items-center bg-[#0B1741]/80 shadow-[0_0_25px_-5px_rgba(255,212,0,0.4)] hover:shadow-[0_0_35px_-5px_rgba(255,212,0,0.6)] transition-all duration-500 cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 6 }}
                  >
                    <p className="text-[18px] md:text-[26px] font-[Fredoka] font-bold">
                      {item.time}
                    </p>
                    <p className="text-[#FFD400] font-[Fredoka] text-sm md:text-base">
                      {item.meridian}
                    </p>
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                  >
                    <p className="text-sm md:text-base font-[Fredoka] font-medium max-w-[150px] leading-snug">
                      {item.title}
                    </p>
                    {item.duration && (
                      <p className="text-xs text-gray-300 font-[Poppins]">
                        {item.duration}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-gray-300 text-sm md:text-base font-[Poppins] italic"
        >
          “Each tick brings a new innovation closer.”
        </motion.p>
      </div>

      {/* Bottom Gradient Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF]"></div>
    </section>
  );
};

export default Schedule;
