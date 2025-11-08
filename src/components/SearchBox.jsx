import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../BASE_URL";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredUsers([]);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    const timer = setTimeout(() => {
      fetchFilteredUsers(query);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchFilteredUsers = async (searchQuery) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/search/?query=${searchQuery}`
      );
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Search by name, email, or college..."
          className="w-full px-5 py-3 bg-[#0B1741]/70 text-white placeholder-gray-400 
                     border border-[#FFD400]/30 rounded-xl font-[Poppins]
                     focus:outline-none focus:border-[#FFD400] focus:shadow-[0_0_15px_-3px_rgba(255,212,0,0.4)]
                     transition-all duration-300"
        />

        {/* Animated underline */}
        <div
          className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF] transition-all duration-300 ${
            query ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        ></div>
      </div>

      {/* Results */}
      {(isTyping || query.trim()) && (
        <div
          className="mt-4 bg-[#0E1C4F]/90 backdrop-blur-md border border-[#FFD400]/20 
                     rounded-xl shadow-[0_0_25px_-5px_rgba(255,212,0,0.2)]
                     divide-y divide-[#FFD400]/10 text-white overflow-hidden animate-fadeIn"
        >
          {isLoading ? (
            <p className="p-4 text-center text-[#FFD400] font-[Fredoka]">
              Loading...
            </p>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link
                to={`/admin/${user._id}`}
                key={user._id}
                className="block p-4 hover:bg-[#FFD400]/10 transition-all duration-300"
              >
                <div className="font-semibold text-lg text-[#FFD400]">
                  {user.name}
                </div>
                <div className="text-sm text-gray-300">{user.email}</div>
                <div className="text-sm text-gray-400">
                  College: {user.college}
                </div>
                <div className="text-sm text-gray-400">
                  Contact: {user.contact}
                </div>
                <div className="text-sm text-gray-400 mt-1 flex flex-wrap gap-2">
                  <span>👥 Members:</span>
                  {user.teamMember.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-[1px] bg-[#FFD400]/10 text-[#FFD400] rounded-md text-xs"
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-gray-400 font-[Poppins]">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
