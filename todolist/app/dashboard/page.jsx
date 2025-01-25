"use client";
import ProtectedRoute from "@/shared/ProtectedRoute";
import React, { useState } from "react";

const Page = () => {
  return (
    <ProtectedRoute>
      <div className="flex justify-center">
        <span>Dashboard</span>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
