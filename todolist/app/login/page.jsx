"use client"
import React from "react";
import { useState, useEffect } from "react";

const Page = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className=" w-full flex justify-center mt-10">
      <div className="bg-transparent rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <a href="#" className="text-blue-500 ml-2">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
