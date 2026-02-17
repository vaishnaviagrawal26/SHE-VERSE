import React, { useEffect, useState } from "react";
import { getNearbyServices } from "../../services/sosService";

function NearbyServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getNearbyServices();
        setServices(data.services);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="h-64 bg-gray-50 rounded shadow-md p-4 overflow-y-auto">
      <h3 className="font-semibold mb-2">Nearby Services</h3>
      {services.length === 0 && <p>No nearby services found.</p>}
      <ul className="list-disc list-inside">
        {services.map((s, i) => (
          <li key={i}>
            {s.type}: {s.name} ({s.distance} km)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NearbyServices;