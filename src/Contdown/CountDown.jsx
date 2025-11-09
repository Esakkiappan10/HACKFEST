import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const EVENT_DATE = new Date("2025-11-28T09:00:00+05:30").getTime(); // 28 Nov 2025, 9 AM IST

const CountdownTimer = () => {
  const [endTime, setEndTime] = useState(EVENT_DATE);

  useEffect(() => {
    // Save once in localStorage (optional persistence)
    const storedEndTime = localStorage.getItem("countdownEndTime");
    if (!storedEndTime) {
      localStorage.setItem("countdownEndTime", EVENT_DATE.toString());
    }
  }, []);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="text-center text-[#00FF9C] text-3xl font-[Fredoka] mt-8">
          🎉 Event Has Started!
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center mt-6">
        {[
          { label: "Days", value: days },
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds },
        ].map((unit, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-white border border-[#FFD400]/40 rounded-lg py-3 px-6 bg-[#0B1741]/70 shadow-[0_0_20px_rgba(255,212,0,0.3)] backdrop-blur-sm"
          >
            <p className="text-3xl font-bold text-[#FFD400]">{unit.value}</p>
            <p className="text-sm uppercase tracking-wider text-gray-300">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-[#08123B] text-white">
      <h2 className="text-[#FFD400] text-3xl md:text-4xl font-[Fredoka] mb-4 text-center">
        Countdown to Event Day
      </h2>
      <Countdown date={endTime} renderer={countdownRenderer} />
      <p className="text-gray-400 text-sm mt-3">📅 28 November 2025, 9:00 AM</p>
    </div>
  );
};

export default CountdownTimer;
