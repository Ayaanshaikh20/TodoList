"use client";
import ProtectedRoute from "@/shared/ProtectedRoute";
import React from "react";

const Page = () => {
  return (
    <ProtectedRoute>
      <div className="flex ">
        <span>Dashboard</span>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
