import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { SOSContext } from "../../context/SOSContext";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

function LiveMap() {
  const { isSOSActive } = useContext(SOSContext);
  const [position, setPosition] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  // Track location every 5 sec during SOS
  useEffect(() => {
    if (!isSOSActive) return;

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    };

    updateLocation(); // first call
    const interval = setInterval(updateLocation, 5000);

    return () => clearInterval(interval);
  }, [isSOSActive]);

  if (!isLoaded) return <p>Loading map...</p>;
  if (!position) return <p>Getting location...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={16}>
      <Marker position={position} />
    </GoogleMap>
  );
}

export default LiveMap;
