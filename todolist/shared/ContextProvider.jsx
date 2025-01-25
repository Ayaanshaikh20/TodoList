"use client";
import React, { createContext, useEffect, useState, useContext } from "react";

const OverAllContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOpenDashboardSidebar, setIsOpenDashboardSidebar] = useState(false);

  // Load user details from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user details to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <>
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
    </>
  );
};

export default ContextProvider;

export const useOverAllContext = () => useContext(OverAllContext);
