import React, { useState, useRef, useEffect } from "react";
import AIModal from "./AIModal";
import { sendAIQuery } from "../../services/aiService";
import LoadingSpinner from "../components/LoadingSpinner";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendAIQuery(input);
      const aiMsg = { sender: "ai", text: res.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const aiMsg = { sender: "ai", text: "Sorry, something went wrong. Please try again." };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Ask Sakhi AI
      </button>

      <AIModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col h-96">
          <div className="flex-1 overflow-y-auto mb-2 p-2 border rounded bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded ${
                  msg.sender === "user" ? "bg-purple-100 self-end text-right" : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <LoadingSpinner />}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border rounded p-2 mr-2"
              placeholder="Ask Sakhi AI..."
            />
            <button
              onClick={handleSend}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Send
            </button>
          </div>
        </div>
      </AIModal>
    </>
  );
}

export default AIChat;