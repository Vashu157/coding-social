import React from "react";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen">
      {/* Left Half - Black */}
      <div className="w-1/2 bg-orange-600 text-white flex flex-col pt-20 items-start pl-10 pr-2 overflow-hidden">
        <p className="text-[7rem] text-[#192732] leading-none font-extrabold text-right w-full mb-13">
          CODING
        </p>
        <p className="text-[3rem]  text-right w-full pr-2">
          A platform to add your profile
        </p>
      </div>

      {/* Right Half - White */}
      <div className="w-1/2 bg-[#192732] text-black flex flex-col items-start pl-0 pr-10 pt-13">
        <p className="text-[7rem] text-orange-600  font-extrabold text-left w-full mb-6">
          SOCIAL
        </p>
        <p className="text-[3rem] text-left w-full mb-6 text-white">
          details and view others' profiles.
        </p>
        <Link
          to="/home"
          className="inline-flex items-center justify-center gap-2 ml-110 mt-50 px-8 py-4 bg-gradient-to-r from-orange-600 to-black-400 hover:from-orange-400 hover:to-orange-800 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          Try Out <ArrowRightIcon />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
