import React, { useEffect, useContext } from "react";
import { SOSContext } from "../../context/SOSContext";
import { updateSOSLocation } from "../../services/sosService";

function LiveTracker() {
  const { isSOSActive, sosId } = useContext(SOSContext);

  useEffect(() => {
    if (!isSOSActive || !sosId) return;

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        await updateSOSLocation(sosId, location);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isSOSActive, sosId]);

  return null;
}

export default LiveTracker;