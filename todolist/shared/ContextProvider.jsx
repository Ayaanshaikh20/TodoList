"use client";
import React, { createContext, useEffect, useState } from "react";

const OverAllContext = createContext();

const ContextProvider = ({ children }) => {
  const [isOpenDashboardSidebar, setIsOpenDashboardSidebar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) {
      setUser(userDetails);
    }
  }, []);

  return (
    <OverAllContext.Provider
      value={{
        user,
        setUser,
        isOpenDashboardSidebar,
        setIsOpenDashboardSidebar,
      }}
    >
      {children}
    </OverAllContext.Provider>
  );
};

export { OverAllContext, ContextProvider };
