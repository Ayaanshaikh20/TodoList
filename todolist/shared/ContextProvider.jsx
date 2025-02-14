"use client";
import React, { createContext, useEffect, useState, useContext } from "react";

const OverAllContext = createContext();

const ContextProvider = ({ children }) => {
  const [isOpenDashboardSidebar, setIsOpenDashboardSidebar] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <OverAllContext.Provider
      value={{
        user,
        isOpenDashboardSidebar,
        setIsOpenDashboardSidebar,
      }}
    >
      {children}
    </OverAllContext.Provider>
  );
};

export { OverAllContext, ContextProvider };
