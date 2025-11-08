import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Loader from "../components/Loader";
import DeleteTeam from "../components/DeleteTeam";
import FetchAllTeamMember from "../components/FetchAllTeamMember";
import SearchBox from "../components/SearchBox";
import ScrollToTop from "../components/ScrollTop";
import { Users, CreditCard, School, UserCheck } from "lucide-react";

const Admin = () => {
  const [data, setData] = useState([]);
  const memberlength = data.length;
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchdata = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.get(BASE_URL + "/api/users/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [1]);

  // Stats
  const totalTeams = memberlength - 1;
  const paidTeams = data.filter((d) => d.payment).length;
  const unpaidTeams = totalTeams - paidTeams;

  return (
    <div className="bg-[#08123B] min-h-screen text-white font-[Fredoka]">
      <Layout>
        <ScrollToTopButton />
        <ScrollToTop />

        <div className="w-[90%] lg:w-[85%] mx-auto py-[100px] flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-2xl md:text-3xl font-bold">
              Hi {user.name}! 👋
            </p>
            <p className="text-[#FFD400] text-lg font-medium tracking-wide">
              Admin Dashboard – Manage Teams
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-[#0E1C4F]/90 rounded-xl border border-[#FFD400]/20 shadow-[0_0_15px_-5px_rgba(255,212,0,0.4)] flex flex-col items-center gap-2">
              <Users className="text-[#FFD400]" />
              <p className="text-gray-300 text-sm">Total Teams</p>
              <h3 className="text-2xl font-bold">{totalTeams}</h3>
            </div>
            <div className="p-5 bg-[#0E1C4F]/90 rounded-xl border border-[#00A2FF]/30 shadow-[0_0_15px_-5px_rgba(0,162,255,0.4)] flex flex-col items-center gap-2">
              <CreditCard className="text-[#00A2FF]" />
              <p className="text-gray-300 text-sm">Paid Teams</p>
              <h3 className="text-2xl font-bold">{paidTeams}</h3>
            </div>
            <div className="p-5 bg-[#0E1C4F]/90 rounded-xl border border-[#FF6B00]/30 shadow-[0_0_15px_-5px_rgba(255,107,0,0.4)] flex flex-col items-center gap-2">
              <UserCheck className="text-[#FF6B00]" />
              <p className="text-gray-300 text-sm">Unpaid Teams</p>
              <h3 className="text-2xl font-bold">{unpaidTeams}</h3>
            </div>
            <div className="p-5 bg-[#0E1C4F]/90 rounded-xl border border-[#FFD400]/30 shadow-[0_0_15px_-5px_rgba(255,212,0,0.4)] flex flex-col items-center gap-2">
              <School className="text-[#FFD400]" />
              <p className="text-gray-300 text-sm">Institutions</p>
              <h3 className="text-2xl font-bold">
                {new Set(data.map((d) => d.college)).size}
              </h3>
            </div>
          </div>

          {/* Search */}
          <SearchBox />

          {/* All Teams */}
          <div className="mt-8">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.map((e) => {
                    if (e.name === "Admin") return null;
                    return (
                      <div
                        key={e._id}
                        className="bg-[#0E1C4F]/80 border border-[#FFD400]/30 rounded-xl p-5 
                                   shadow-[0_0_25px_-6px_rgba(255,212,0,0.3)] hover:shadow-[0_0_30px_-6px_rgba(255,212,0,0.6)] 
                                   transition-all duration-300 flex flex-col gap-3"
                      >
                        <div className="flex justify-between">
                          <p className="text-sm text-[#FFD400]/90 font-medium">
                            Team ID
                          </p>
                          <p>{e.teamId}</p>
                        </div>
                        <div className="flex justify-between">
                          <p>Name:</p>
                          <p>{e.name}</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-300 flex-wrap">
                          <p>Email:</p>
                          <p>{e.email}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>College:</p>
                          <p>{e.college}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>Department:</p>
                          <p>{e.dept}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>Contact:</p>
                          <p>{e.contact}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>Payment:</p>
                          <span
                            className={`font-semibold ${
                              e.payment
                                ? "text-[#00FF94]"
                                : "text-[#FF4444]"
                            }`}
                          >
                            {e.payment ? "Paid" : "Not Paid"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p>Members:</p>
                          <p>{e.teamMember.length}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between mt-4 gap-3">
                          <Link
                            to={`/admin/${e._id}`}
                            className="w-full bg-gradient-to-r from-[#FFD400] via-[#FF6B00] to-[#00A2FF]
                                       text-black text-center py-2 rounded-lg font-semibold 
                                       hover:opacity-90 transition duration-300"
                          >
                            View Details
                          </Link>
                          <DeleteTeam userId={e._id} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Error Handling */}
          {error && (
            <div className="text-center text-red-500 font-[Poppins] text-sm">
              {error}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Admin;
