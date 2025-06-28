import React, { useState } from "react";
import useFetchProfiles from "../hooks/fetchProfile.js";
import UserCard from "../components/UserCard.jsx";

const Home = () => {
  const { profiles, loading } = useFetchProfiles();
  const [search, setSearch] = useState("");

  const filteredProfiles = profiles.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) || user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 text-white">
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
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
