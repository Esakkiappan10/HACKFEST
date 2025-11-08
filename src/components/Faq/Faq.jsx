import { Phone } from "lucide-react";
import { useState } from "react";
import FaqAccodion from "./FaqAccordian";

const Faq = () => {
  const [open, setOpen] = useState(null);
  const toggle = (index) => setOpen(open === index ? null : index);

  const accordionData = [
    {
      title: "How many participants can join?",
      desc: "Maximum 2 participants per team.",
      desc1: "Any number of teams from the same institution can participate.",
    },
    {
      title: "What is the registration fee, and when is the payment deadline?",
      desc: "The registration fee is ₹150 per participant and must be paid on or before 25th Nov 2025.",
    },
    {
      title: "Who is eligible to participate in the event?",
      desc: "Both undergraduate (UG) and postgraduate (PG) students are eligible to participate.",
    },
    {
      title: "What documents must participants bring on the event day?",
      desc: "Participants must bring their college ID card and a bonafide certificate from their respective college.",
    },
    {
      title:
        "How should participants register for the event? Are spot registrations allowed?",
      desc: "Participants must register online using the official registration link or QR code. Spot registrations will not be encouraged.",
    },
    {
      title: "Will food and refreshments be provided to participants?",
      desc: "Yes, food and refreshments will be provided to all registered participants.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full bg-gradient-to-b from-[#0A1440] via-[#0C1B4D] to-[#08123B] py-12 md:py-16 overflow-hidden"
    >
      {/* Decorative Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,212,0,0.07),transparent_60%)] pointer-events-none"></div>

      {/* Content Container */}
      <div
        className="relative z-10 w-[94%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14"
        data-aos="fade-up"
      >
        {/* Left Image */}
        <div
          className="flex justify-center items-center w-full lg:w-1/2"
          data-aos="fade-right"
        >
          <div className="rounded-2xl bg-[#0E1B49]/90 border border-[#FFD400]/15 p-2 sm:p-3 backdrop-blur-sm shadow-[0_0_25px_-8px_rgba(255,212,0,0.2)] hover:shadow-[0_0_35px_-6px_rgba(255,212,0,0.3)] hover:scale-[1.02] transition-all duration-300 w-[90%] sm:w-[80%] lg:w-full">
            <img
              src="https://ik.imagekit.io/HoneyJoe/techx/pics.jpg?updatedAt=1731562650495"
              alt="Hackathon Event"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right Section */}
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center"
          data-aos="fade-left"
        >
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="p-2 bg-[#FFD400]/15 rounded-full">
              <div className="h-3 w-3 bg-[#FFD400] rounded-full shadow-[#FFD400]/50"></div>
            </div>
            <p className="text-[#FFD400] font-bold text-xs sm:text-sm uppercase tracking-widest">
              FAQ
            </p>
          </div>

          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-white leading-snug mb-6 font-[Fredoka]">
            Frequently Asked Questions
          </h2>

          {/* FAQ Accordions */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {accordionData.map((data, index) => (
              <FaqAccodion
                key={index}
                open={index === open}
                title={data.title}
                desc={data.desc}
                desc1={data.desc1}
                toggle={() => toggle(index)}
              />
            ))}
          </div>

          {/* Contact Footer */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[#FFD400]/90">
            <Phone className="w-4 h-4 sm:w-4 sm:h-5" />
            <p className="text-gray-200 text-[13px] sm:text-[15px] md:text-base font-medium">
              Need more info? Contact the organizers at{" "}
              <span className="text-[#FFD400] font-semibold">
                 +91 95004 02904
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
