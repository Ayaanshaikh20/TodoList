"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Page = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleUserInput = (value, label) => {
    setUserDetails((prevValue) => ({
      ...prevValue,
      [label]: value,
    }));
  };

  //Registration logic
  const registerUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post("/api/register", userDetails);
      const { status } = result;
      const { message, email, first_name, uid, isExists } = result.data.data;
      setIsLoading(false);
      if (status === 200 && !isExists) {
        Swal.fire({
          title: message,
          icon: !isExists ? "success" : "error",
        });
      } else {
        Swal.fire({
          title: "Registration failed",
          text: message,
          icon: "error",
        });
      }
      !isExists && router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Error while registering user in UI:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
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
                onChange={(e) => handleUserInput(e.target.value, "first_name")}
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
                onChange={(e) => handleUserInput(e.target.value, "email")}
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
                name="password"
                onChange={(e) => handleUserInput(e.target.value, "password")}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
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
