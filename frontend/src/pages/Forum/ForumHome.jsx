import React, { useEffect, useState } from "react";
import { getPosts, votePoll } from "../../services/forumService";
import PostCard from "./PostCard";
import NewPost from "./NewPost";
import PollCard from "./PollCard";

function ForumHome() {
  const [posts, setPosts] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForumData = async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      setPosts(res.posts);
      setPolls(res.polls || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForumData();
  }, []);

  const handleComment = (postId) => {
    const comment = prompt("Write your comment:");
    if (comment) {
      // Call backend API to add comment (implement in forumService)
      alert("Comment submitted (mock)"); 
    }
  };

  const handleVote = async (pollId, optionId) => {
    try {
      await votePoll(pollId, optionId);
      fetchForumData();
    } catch (err) {
      console.error(err);
      alert("Vote failed");
    }
  };

  if (loading) return <div className="text-gray-500 text-center">Loading forum...</div>;

  return (
    <div className="p-4">
      <NewPost onPostCreated={fetchForumData} />
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} onVote={handleVote} />
      ))}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onComment={handleComment} />
      ))}
    </div>
  );
}

export default ForumHome;