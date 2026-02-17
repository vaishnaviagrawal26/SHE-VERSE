import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { triggerSOS } from "../../services/sosService";
import toast from "react-hot-toast";

function SOSButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSOS = async () => {
    setLoading(true);
    try {
      await triggerSOS();

      toast.success("🚨 SOS Activated!");
      navigate("/sos"); // 🔴 go to SOS screen
    } catch (err) {
      console.error(err);
      toast.error("Failed to send SOS. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSOS}
      disabled={loading}
      className="relative w-40 h-40 rounded-full bg-red-600 hover:bg-red-700 text-white text-2xl font-bold shadow-lg flex items-center justify-center transition"
    >
      {loading ? "Sending..." : "SOS"}
      <span className="absolute w-48 h-48 rounded-full bg-red-400 opacity-30 animate-ping"></span>
    </button>
  );
}

export default SOSButton;
