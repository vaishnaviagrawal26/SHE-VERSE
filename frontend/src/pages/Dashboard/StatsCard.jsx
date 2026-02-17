import React from "react";

function StatsCard({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold text-purple-700 mt-2">{value}</p>
    </div>
  );
}

export default StatsCard;