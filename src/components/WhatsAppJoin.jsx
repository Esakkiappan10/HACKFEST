import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppJoinButton = () => {
  const groupLink = "https://chat.whatsapp.com/L9BhdKuHo8p1LzheIJkApG";

  return (
    <button
      onClick={() => window.open(groupLink, "_blank")}
      className="relative flex items-center justify-center gap-2 px-5 py-3 
                 bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] 
                 text-white font-[Fredoka] text-sm sm:text-base font-semibold 
                 rounded-xl shadow-[0_0_20px_-5px_rgba(37,211,102,0.6)] 
                 hover:shadow-[0_0_25px_-5px_rgba(37,211,102,0.9)] 
                 hover:scale-[1.05] active:scale-[0.98]
                 transition-all duration-300 ease-in-out group"
    >
      <FaWhatsapp className="text-xl sm:text-2xl group-hover:rotate-[10deg] transition-transform duration-300" />
      <span>Join WhatsApp Group</span>

      {/* Subtle glow ring */}
      <span className="absolute inset-0 rounded-xl bg-green-400/20 blur-md opacity-0 group-hover:opacity-100 transition duration-500"></span>
    </button>
  );
};

export default WhatsAppJoinButton;
