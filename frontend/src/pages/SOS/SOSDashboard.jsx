import React, { useContext } from "react";
import { SOSContext } from "../../context/SOSContext";
import PanicButton from "./PanicButton";
import LiveTracker from "./LiveTracker";
import AutoAudioRecorder from "./AutoAudioRecorder";
import LiveSOSMap from "./LiveSOSMap";

function SOSDashboard() {
  const { isSOSActive } = useContext(SOSContext);

  return (
    <div className="flex flex-col items-center p-6">
      {!isSOSActive ? (
        <PanicButton />
      ) : (
        <div className="text-red-600 font-bold text-xl mb-4">
          🚨 SOS ACTIVE — Help is being notified
        </div>
      )}

      {/* 🔴 LIVE MAP */}
      {isSOSActive && <LiveSOSMap />}

      <LiveTracker />
      <AutoAudioRecorder />
    </div>
  );
}

export default SOSDashboard;
