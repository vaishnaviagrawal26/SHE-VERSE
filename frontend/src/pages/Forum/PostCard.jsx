import React from "react";

function PostCard({ post, onComment }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3">
      <p className="text-gray-800 mb-2">{post.content}</p>
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <span>{post.author}</span>
        <button
          onClick={() => onComment(post.id)}
          className="text-purple-600 hover:underline"
        >
          Comment
        </button>
      </div>
      {post.comments && post.comments.length > 0 && (
        <div className="mt-2 pl-4 border-l-2 border-gray-200">
          {post.comments.map((c) => (
            <p key={c.id} className="text-gray-600 text-sm">
              <span className="font-semibold">{c.author}: </span>
              {c.content}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCard;