"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserInput = (value, label) => {
    try {
      setUserDetails((prevValue) => {
        return {
          ...prevValue,
          [label]: value,
        };
      });
    } catch (error) {
      console.error("Error in user form input:", error);
    }
  };

  const registerUser = async (event) => {
    try {
      event.preventDefault();
      console.log(userDetails, "userDetails");
      const result = await axios.post("/api/register", userDetails);
      console.log(result, "result");
    } catch (error) {
      console.error("Error while registering user in UI:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10 bg-gray-100">
        <div className="bg-transparent rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Register
          </h2>
          <form onSubmit={registerUser}>
            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-gray-600 font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(e) => {
                  handleUserInput(e.target.value, "first_name");
                }}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Email */}
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
                onChange={(e) => {
                  handleUserInput(e.target.value, "email");
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Password */}
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
                onChange={(e) => {
                  handleUserInput(e.target.value, "password");
                }}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-gray-600 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
