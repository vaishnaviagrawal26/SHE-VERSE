import React, { useEffect, useState, useContext } from "react";
import SOSButton from "./SOSButton";
import StatsCard from "./StatsCard";
import { fetchUserStats } from "../../services/sosService";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    sosCount: 0,
    alertsSent: 0,
    safeRoutesUsed: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchUserStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">SHE-VERSE</h1>

        <div className="text-right">
          <p className="text-gray-600 text-sm">Welcome back</p>
          <p className="font-semibold text-purple-700">{user?.full_name}</p>
        </div>
      </header>

      {/* SOS Button */}
      <div className="flex justify-center mb-10">
        <SOSButton />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard title="SOS Triggered" value={stats.sosCount} />
        <StatsCard title="Alerts Sent" value={stats.alertsSent} />
        <StatsCard title="Safe Routes Used" value={stats.safeRoutesUsed} />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-purple-700 mb-2">Trusted Contacts</h3>
          <p className="text-gray-500 text-sm">
            Manage emergency contacts for quick alerts.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-purple-700 mb-2">Safe Routes</h3>
          <p className="text-gray-500 text-sm">
            Get safest navigation with real-time risk analysis.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-purple-700 mb-2">Community Forum</h3>
          <p className="text-gray-500 text-sm">
            Share experiences and stay aware together.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="font-semibold text-purple-700 mb-2">AI Sakhi Assistant</h3>
          <p className="text-gray-500 text-sm">
            Instant safety guidance powered by AI.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
