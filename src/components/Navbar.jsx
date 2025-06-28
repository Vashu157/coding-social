import React from "react";

const Navbar = ({ onSearch }) => {
  return (
    <nav className="w-screen h-20 bg-[#192732] p-4 flex justify-between items-center shadow-lg rounded-b-2xl">
      <div className="text-white text-4xl font-bold">Coding Social</div>
      <div className="bg-white rounded-md shadow-md  mr-4">
        <p>
          <a
            href="https://github.com/Vashu157/coding-social"
            className="text-white hover:underline px-14 py-2 bg-[#192732]"
            target="_blank"
            rel="noopener noreferrer"
          >
            github repo
          </a>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
