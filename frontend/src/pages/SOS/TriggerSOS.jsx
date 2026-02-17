import React, { useContext, useState } from "react";
import { triggerSOS } from "../../services/sosService";
import { SOSContext } from "../../context/SOSContext";
import AudioRecorder from "./AudioRecorder";
import LiveMap from "./LiveMap";
import NearbyServices from "./NearbyServices";

function TriggerSOS() {
  const { setSOSActive } = useContext(SOSContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSOS = async () => {
    setLoading(true);
    try {
      const res = await triggerSOS({ message: "User triggered SOS" });
      console.log(res);
      setSOSActive(true);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Failed to trigger SOS!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">Emergency SOS</h2>

      <button
        onClick={handleSOS}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg mb-4"
        disabled={loading}
      >
        {loading ? "Sending Alert..." : "Tap to Trigger SOS"}
      </button>

      {success && <p className="text-green-600 font-semibold">SOS Triggered!</p>}

      {/* Live map + nearby services */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <LiveMap />
        <NearbyServices />
      </div>

      {/* Audio recorder starts automatically */}
      <AudioRecorder />
    </div>
  );
}

export default TriggerSOS;