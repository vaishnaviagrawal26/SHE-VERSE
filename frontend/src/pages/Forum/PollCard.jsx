import React from "react";

function PollCard({ poll, onVote }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3">
      <p className="text-gray-800 font-semibold mb-2">{poll.question}</p>
      <div className="flex flex-col space-y-2">
        {poll.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onVote(poll.id, option.id)}
            className="border rounded-lg p-2 text-left hover:bg-purple-50"
          >
            {option.text} ({option.votes})
          </button>
        ))}
      </div>
    </div>
  );
}

export default PollCard;