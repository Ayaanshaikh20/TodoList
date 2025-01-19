import ProtectedRoute from "@/shared/ProtectedRoute";
import React from "react";

const Page = () => {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
};

export default Page;
