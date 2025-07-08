// Home.jsx
import React, { useState } from "react";
import useFetchProfiles from "../hooks/fetchProfile.js";
import UserCard from "../components/UserCard.jsx";
import { fetchLeetcodeProfile } from "../utils/fetchProfiles";

const Home = () => {
  const { profiles, loading } = useFetchProfiles();
  const [search, setSearch] = useState("");

  const [hoveredData, setHoveredData] = useState(null);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });

  const handleLeetHover = async (username, position) => {
    const data = await fetchLeetcodeProfile(username);
    setHoveredData({ ...data[0], username ,});
    setDialogPosition(position);
  };

  const handleLeetLeave = () => {
    setHoveredData(null);
  };

  const filteredProfiles = profiles.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 text-white relative">
      <div className="w-full max-w-2xl px-4 py-2 mb-8 border border-orange-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192732]"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredProfiles.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProfiles.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onLeetHover={handleLeetHover}
              onLeetLeave={handleLeetLeave}
            />
          ))}
        </div>
      )}

      {hoveredData && (
        <div
          className="absolute z-50 bg-white text-black p-3 rounded-lg shadow-xl"
          style={{ top: dialogPosition.top, left: dialogPosition.left ,width: "320px",height: "190px",padding: "16px"
      }}
        >
          <div className="flex items-center gap-2 mb-2">
            <img
              src={hoveredData.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{hoveredData.realName}</p>
              <p className="text-sm text-gray-600">Ranking: {hoveredData.ranking}</p>
            </div>
          </div>
          <div className="text-sm">
            <p>★ {hoveredData.starRating}</p>
            <p>Total Solved: {hoveredData.totalSolved}</p>
            <p>
              Easy: {hoveredData.easySolved} | Medium: {hoveredData.mediumSolved} | Hard: {hoveredData.hardSolved}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
