
import React from "react";
import { FaUsers, FaTaxi, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const AboutHeroSection = () => {
  return (
    <section className="w-full h-screen relative flex items-center pt-24 overflow-hidden">

      {/* Static Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/167200/pexels-photo-167200.jpeg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left Card */}
          <div className="bg-white/10 backdrop-blur-xl p-5 md:p-6 rounded-2xl shadow-2xl border border-white/20 max-w-md">
            <span className="text-[#ffc107] text-base font-semibold">
              Trusted by 5,000+ Riders
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">
              Welcome to <span className="text-[#ffc107]">RideAura</span>
            </h1>

            <p className="text-gray-200 mt-3 text-base">
              Fast, safe and reliable taxi rides anytime, anywhere.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-5 flex-wrap">
              <button className="px-5 py-2 bg-[#ffc107] text-black font-semibold rounded-lg hover:bg-[#e0a800] transition">
                Book Ride
              </button>

              <button className="px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
                View Pricing
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-6 text-white text-sm">

              <div className="flex items-center gap-2">
                <FaUsers className="text-[#ffc107]" />
                <span>5000+ Riders</span>
              </div>

              <div className="flex items-center gap-2">
                <FaTaxi className="text-[#ffc107]" />
                <span>200+ Drivers</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-[#ffc107]" />
                <span>24/7 Service</span>
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#ffc107]" />
                <span>10+ Cities</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutHeroSection;