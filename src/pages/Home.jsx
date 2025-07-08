// Home.jsx
import React, { useState } from "react";
import useFetchProfiles from "../hooks/fetchProfile.js";
import UserCard from "../components/UserCard.jsx";
import { fetchLeetcodeProfile } from "../utils/fetchProfiles";
import { fetchGithubProfile } from "../utils/fetchProfiles.js";
const Home = () => {
  const { profiles, loading } = useFetchProfiles();
  const [search, setSearch] = useState("");

  const [hoveredDataLeet, setHoveredDataLeet] = useState(null);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [hoveredDataGit, setHoveredDataGit] = useState(null);

  const handleLeetHover = async (username, position) => {
    const data = await fetchLeetcodeProfile(username);
    setHoveredDataLeet({ ...data[0], username });
    setDialogPosition(position);
  };
  const handleGitHover = async (username, position) => {
    const data = await fetchGithubProfile(username);
    setHoveredDataGit({ ...data[0], username });
    setDialogPosition(position);
  };
  const handleLeetLeave = () => {
    setHoveredDataLeet(null);
  };
  const handleGitLeave = () => {
    setHoveredDataGit(null);
  };
  const filteredProfiles = profiles.filter(
    (user) =>
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
      <p className="text-gray-400">
        you may hover the links to view git and leetcode profiles
      </p>
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
              onGitHover={handleGitHover}
              onGitLeave={handleGitLeave}
            />
          ))}
        </div>
      )}

      {hoveredDataLeet && (
        <div
          className="absolute z-50 bg-white text-black p-3 rounded-lg shadow-xl"
          style={{
            top: dialogPosition.top,
            left: dialogPosition.left,
            width: "320px",
            height: "190px",
            padding: "16px",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <img
              src={hoveredDataLeet.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{hoveredDataLeet.realName}</p>
              <p className="text-sm text-gray-600">
                Ranking: {hoveredDataLeet.ranking}
              </p>
            </div>
          </div>
          <div className="text-sm">
            <p>★ {hoveredDataLeet.starRating}</p>
            <p>Total Solved: {hoveredDataLeet.totalSolved}</p>
            <p>
              Easy: {hoveredDataLeet.easySolved} | Medium:{" "}
              {hoveredDataLeet.mediumSolved} | Hard:{" "}
              {hoveredDataLeet.hardSolved}
            </p>
          </div>
        </div>
      )}
      {hoveredDataGit && (
        <div
          className="absolute z-50 bg-white text-black p-3 rounded-lg shadow-xl"
          style={{
            top: dialogPosition.top,
            left: dialogPosition.left,
            width: "320px",
            height: "190px",
            padding: "16px",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <img
              src={hoveredDataGit.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">
                {hoveredDataGit.name || hoveredDataGit.username}
              </p>
              <p className="text-sm text-gray-600">
                Repos: {hoveredDataGit.publicRepos}
              </p>
            </div>
          </div>
          <div className="text-sm">
            <p>👤 {hoveredDataGit.bio || "No bio provided."}</p>
            <p>
              📅 Joined: {new Date(hoveredDataGit.createdAt).toDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
