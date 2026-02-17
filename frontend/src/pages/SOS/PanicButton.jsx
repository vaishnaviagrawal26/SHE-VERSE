import React, { useRef, useContext } from "react";
import { triggerSOS } from "../../services/sosService";
import { SOSContext } from "../../context/SOSContext";

function PanicButton() {
  const timerRef = useRef(null);
  const { setIsSOSActive, setSOSId } = useContext(SOSContext);

  const startPress = () => {
    timerRef.current = setTimeout(async () => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const res = await triggerSOS(location);
        setSOSId(res.sos_id);
        setIsSOSActive(true);
        alert("🚨 SOS Activated");
      });
    }, 2000); // 2 sec hold
  };

  const cancelPress = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <button
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      className="bg-red-600 text-white w-40 h-40 rounded-full text-xl font-bold shadow-lg hover:bg-red-700 transition"
    >
      HOLD SOS
    </button>
  );
}

export default PanicButton;