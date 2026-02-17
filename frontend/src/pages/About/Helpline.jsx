import React from "react";

const helplines = [
  { name: "Police", number: "100" },
  { name: "Women Helpline (Domestic Violence)", number: "1091" },
  { name: "Child Helpline", number: "1098" },
  { name: "Medical Emergency", number: "108" },
  { name: "Cybercrime Helpline", number: "155260" }
];

function Helpline() {
  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-purple-600 mb-4">Helpline Numbers</h2>
      <ul>
        {helplines.map((h, idx) => (
          <li key={idx} className="flex justify-between border-b py-2">
            <span>{h.name}</span>
            <a href={`tel:${h.number}`} className="text-purple-600 hover:underline">{h.number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Helpline;