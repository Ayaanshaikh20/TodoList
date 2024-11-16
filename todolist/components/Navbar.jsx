import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={"/"} className="text-2xl font-bold">ToDoList</Link>
          <div className="space-x-4">
            <Link href={"/register"} className="hover:text-gray-300 transition">
              Register
            </Link>
            <Link href={"/login"} className="hover:text-gray-300 transition">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
