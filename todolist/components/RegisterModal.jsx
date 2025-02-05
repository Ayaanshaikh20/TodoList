"use client";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { useOverAllContext } from "../shared/ContextProvider";

const RegisterModal = ({ open, handleClose, handleOpen }) => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { user, setUser } = useOverAllContext();

  const handleUserInput = (value, label) => {
    setUserDetails((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const registerUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post("/api/register", userDetails);
      const { status, isExists, message, data, error } = result.data;
      setIsLoading(false);

      if (status === 200) {
        handleClose();
        setUser(data);
        toast.success(message);

        // Redirect to the dashboard
        router.push("/dashboard");
      } else if (status === 409) {
        toast.error(error);
      } else {
        handleClose();
        toast.error(error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error while registering user in UI:", error);
      handleClose();
      toast.error(`Something went wrong. Please try again.`);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="register-modal-title"
      aria-describedby="register-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "400px" }, // Responsive width
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "10px",
          p: 4,
        }}
      >
        {isLoading && <Loader />}
        <h2 className="text-2xl font-bold text-gray-600 flex justify-start text-center mb-4">
          User Register
        </h2>
        <form onSubmit={registerUser}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={userDetails.first_name}
              onChange={(e) => handleUserInput(e.target.value, "first_name")}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) => handleUserInput(e.target.value, "email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={userDetails.password}
              onChange={(e) => handleUserInput(e.target.value, "password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" variant="gradient" className=" w-full">
            Register
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
