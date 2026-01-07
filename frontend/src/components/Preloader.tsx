import React from "react";

const Preloader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F4F1EA] via-[#F0C17F] to-[#EF9829] text-[#9F3B0F]">

      {/* Spinning Rune Symbol */}
      <div className="mb-6 animate-spin-slow">
        <svg
          className="w-20 h-20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.3" stroke="#9F3B0F" />
          <path
            d="M12 2a10 10 0 0110 10H12V2z"
            stroke="#EF9829"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Animated Text */}
      <h1 className="text-3xl font-extrabold mb-2 animate-pulse text-[#9F3B0F]">
        Rune
      </h1>
      <p className="text-[#EF9829] text-lg animate-pulse">
        Digital Extinction Tracker
      </p>

      {/* Loading Bar */}
      <div className="w-48 h-2 mt-6 bg-[#F4F1EA] rounded overflow-hidden">
        <div className="h-2 bg-[#9F3B0F] animate-loading" />
      </div>
    </div>
  );
};

export default Preloader;
