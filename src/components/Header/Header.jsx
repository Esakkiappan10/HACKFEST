import { useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../../Contdown/CountDown";
import { Menu } from "lucide-react";
import { Button, Dialog, Pane, Paragraph, SideSheet } from "evergreen-ui";

const Header = () => {
  const [isShown, setIsShown] = useState(false);
  const [isDialog, setIsDialog] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#08123B]"
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://wallpaperaccess.com/full/9254940.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#08123B]/80 to-[#0A1540]/90"></div>

        {/* Content */}
        <div className="relative z-10 w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center text-white font-[Fredoka] flex flex-col items-center gap-5">
          {/* Top Text */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#FFD400] text-[20px] md:text-[26px] lg:text-[32px] font-bold tracking-wide uppercase">
              Department of Commerce Computer Applications
            </p>
            <p className="text-[16px] md:text-[20px] lg:text-[22px] text-gray-200 font-medium">
              St. Joseph’s College (Autonomous), Tiruchirappalli
            </p>
          </div>

          {/* Divider */}
          <div className="w-24 h-[3px] bg-[#FFD400] rounded-full my-3"></div>

          {/* Invitation */}
          <p className="font-[Stylish] text-[18px] md:text-[22px] text-[#FFD400] mt-2 tracking-wide">
            Cordially invites you to
          </p>

          {/* Event Title */}
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-[38px] md:text-[52px] lg:text-[72px] font-extrabold font-[Stylish] text-white leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
              HACKFEST ’25
            </h1>
            <p className="text-[16px] md:text-[20px] text-gray-200 font-medium font-[Poppins]">
              A State Level Intercollegiate Hackathon
            </p>
            <p className="text-[14px] md:text-[16px] text-[#FBBF24] italic font-[Poppins]">
              “Where Logic Meets Ledger”
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mt-5">
            <CountdownTimer />
          </div>

          {/* Register Button */}
          <div className="mt-8">
            <Link to="/register">
              <button className="relative overflow-hidden px-6 py-3 rounded-md text-white font-bold text-[16px] md:text-[18px] tracking-wide transition-all duration-300 border border-[#FFD400]/60 group">
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] opacity-0 group-hover:opacity-100 transition duration-300"></span>
                <span className="relative font-[Stylish] text-white group-hover:text-black">
                  Register Now
                </span>
              </button>
            </Link>
          </div>

          {/* Date and Venue */}
          <div className="mt-10 text-sm md:text-base text-gray-300 font-[Poppins]">
            <p>📅 28th November 2025 | 📍 Sail Hall, St. Joseph’s College</p>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF]"></div>
      </section>
    </>
  );
};

export default Header;
