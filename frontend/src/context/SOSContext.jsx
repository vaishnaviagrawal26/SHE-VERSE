import React, { createContext, useState } from "react";

export const SOSContext = createContext();

export const SOSProvider = ({ children }) => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [sosId, setSOSId] = useState(null);

  return (
    <SOSContext.Provider
      value={{ isSOSActive, setIsSOSActive, sosId, setSOSId }}
    >
      {children}
    </SOSContext.Provider>
  );
};