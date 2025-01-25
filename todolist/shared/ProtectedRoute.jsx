"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser && !session?.user) {
      router.push("/");
      console.log('getting pushed outside')
    }
  }, []);
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default ProtectedRoute;
