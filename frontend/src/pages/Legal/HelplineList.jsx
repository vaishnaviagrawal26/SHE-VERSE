import React, { useEffect, useState } from "react";
import { getHelplines } from "../../services/legalService";

function HelplineList() {
  const [helplines, setHelplines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelplines = async () => {
      try {
        const res = await getHelplines();
        setHelplines(res.helplines);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHelplines();
  }, []);

  if (loading) return <div className="text-gray-500">Loading helplines...</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Helplines & NGOs</h2>
      <ul className="list-disc list-inside text-gray-700">
        {helplines.map((h) => (
          <li key={h.id}>
            <span className="font-semibold">{h.name}</span> - {h.contact} ({h.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HelplineList;