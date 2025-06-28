import React from 'react';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="w-screen h-20 bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <div className="text-white text-2xl font-bold">
        Coding Social
      </div>
      <div className='bg-white rounded-md shadow-md  mr-4'>
        {/* <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => onSearch(e.target.value)}
          className="text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;

