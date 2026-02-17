import React, { useState } from "react";
import { createPost } from "../../services/forumService";

function NewPost({ onPostCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createPost(content);
      setContent("");
      onPostCreated();
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded-lg mb-2"
        placeholder="Share your thoughts anonymously..."
      />
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Post
      </button>
    </form>
  );
}

export default NewPost;