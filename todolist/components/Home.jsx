"use client";
import React from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  // const checkIfUser
  return (
    <>
      <span className=" text-black flex justify-center">todolist</span>
      <span>{JSON.stringify(session)}</span>
    </>
  );
};

export default Home;
