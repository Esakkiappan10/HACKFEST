const Map = () => {
  return (
    <div
      className="max-w-full bg-[#08123B] py-10 overflow-hidden"
      id="venue"
    >
      <div
        className="py-5 px-5 w-[90%] md:w-[75%] bg-white mx-auto rounded-2xl shadow-[0_0_15px_rgba(255,212,0,0.15)]"
        id="certi"
        data-aos="fade-up-left"
        data-aos-delay="300"
      >
        <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31351.996169870486!2d78.6761355815452!3d10.81134781771333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5892b5ed461%3A0x23992c5c469ac168!2sSt.%20Joseph&#39;s%20College!5e0!3m2!1sen!2sin!4v1729704826210!5m2!1sen!2sin"
            allowFullScreen   
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" 
            title="St. Joseph's College Map"
            className="absolute top-0 left-0 w-full h-full border-none rounded-xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Map;
