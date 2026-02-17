import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { SOSContext } from "../../context/SOSContext";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function SOSMap() {
  const { isSOSActive } = useContext(SOSContext);
  const [position, setPosition] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!isSOSActive) return;

    const watchId = navigator.geolocation.watchPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isSOSActive]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="w-full max-w-2xl mt-6">
      {position && (
        <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={16}>
          <Marker position={position} />
        </GoogleMap>
      )}
    </div>
  );
}

export default SOSMap;
