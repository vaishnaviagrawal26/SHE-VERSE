import React from "react";

function RouteCard({ route }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3">
      <h3 className="text-purple-600 font-semibold mb-2">{route.name}</h3>
      <p className="text-gray-700 mb-1">Distance: {route.distance} km</p>
      <p className="text-gray-700 mb-1">Estimated Time: {route.time} mins</p>
      <p className="text-gray-700 mb-2">Safety Score: {route.safetyScore}/10</p>
      
      <ul className="list-disc pl-5 text-gray-600 mb-2">
        {route.explanations.map((exp, idx) => (
          <li key={idx}>{exp}</li>
        ))}
      </ul>

      {route.nearby && route.nearby.length > 0 && (
        <div className="text-gray-700">
          <p className="font-semibold">Nearby Safe Spots:</p>
          <ul className="list-disc pl-5">
            {route.nearby.map((spot, idx) => (
              <li key={idx}>{spot.name} ({spot.type})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RouteCard;