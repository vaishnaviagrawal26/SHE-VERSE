import React, { createContext, useState } from "react";

export const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([]); // {text, sender, timestamp}
  const [loading, setLoading] = useState(false);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <AIContext.Provider value={{ messages, addMessage, loading, setLoading }}>
      {children}
    </AIContext.Provider>
  );
};