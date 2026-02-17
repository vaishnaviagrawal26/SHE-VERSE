import React, { useEffect, useState } from "react";
import { getSaferRoutes } from "../../services/routesService";
import RouteCard from "./RouteCard";

function SaferRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });

  // Get user geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  const fetchRoutes = async () => {
    if (!currentLocation.lat || !currentLocation.lng) return;
    setLoading(true);
    try {
      const res = await getSaferRoutes(currentLocation);
      setRoutes(res.routes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, [currentLocation]);

  if (loading) return <div className="text-gray-500 text-center">Loading safer routes...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-purple-600 mb-4">Safer Routes</h2>
      {routes.length === 0 ? (
        <p className="text-gray-500">No routes available.</p>
      ) : (
        routes.map((route) => <RouteCard key={route.id} route={route} />)
      )}
    </div>
  );
}

export default SaferRoutes;