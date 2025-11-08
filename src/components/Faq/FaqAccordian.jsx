import { Plus, Minus } from "lucide-react";
import { Collapse } from "react-collapse";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const FaqAccodion = ({ title, desc, open, toggle, desc1 }) => {
  return (
    <motion.div
      layout
      transition={{
        layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }, // buttery-smooth
      }}
      className={`my-3 sm:my-4 rounded-lg overflow-hidden border transition-all duration-700 group ${
        open
          ? "border-[#FFD400] bg-[#0E1C4F]/90 shadow-[0_0_25px_-6px_rgba(255,212,0,0.35)]"
          : "border-[#1E3A8A]/40 bg-[#0B1741]/70 hover:border-[#FFD400]/40"
      }`}
    >
      {/* Header */}
      <div
        onClick={toggle}
        className="flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 cursor-pointer select-none"
      >
        <span
          className={`font-[Fredoka] text-left text-[15px] sm:text-base md:text-lg font-semibold transition-colors duration-500 ${
            open ? "text-[#FFD400]" : "text-white group-hover:text-[#FFD400]"
          }`}
        >
          {title}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`transition-colors duration-500 ${
            open ? "text-[#FFD400]" : "text-gray-300"
          }`}
        >
          {open ? <Minus size={22} /> : <Plus size={22} />}
        </motion.div>
      </div>

      {/* Accordion Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Collapse
              isOpened={open}
              theme={{
                collapse: "transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                content:
                  "transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              }}
            >
              <div className="px-5 sm:px-6 pb-6 text-gray-200 text-[13px] sm:text-[15px] font-[Poppins] leading-relaxed transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                <p className="mb-2">{desc}</p>
                {desc1 && <p>{desc1}</p>}
              </div>
            </Collapse>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqAccodion;
