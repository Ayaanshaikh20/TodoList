"use client";
import React, { use, useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { ContextProvider, OverAllContext } from "../shared/ContextProvider";

const LoginModal = ({ open, handleClose }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  let { user } = useContext(OverAllContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUserInput = (value, label) => {
    setUserDetails((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const loginUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post("/api/login", userDetails);
      const { message, status, error, data } = result?.data;
      setIsLoading(false);
      if (status === 200) {
        handleClose();
        let userDetails = await fetchUserDetails(data.userId);
        setUser(userDetails);
        toast.success(message);
        router.push("/dashboard");
      } else {
        toast.error(error || "Login failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error while logging in user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      let requestPayload = {
        userId: userId,
      };
      let result = await axios.post("/api/user-details", requestPayload);
      const { data } = result.data;
      return data;
    } catch (error) {
      console.error("Failed to fetch user details in frontend:", error);
    }
  };

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    await signIn("google");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "400px" },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "10px",
          p: 4,
        }}
      >
        {isLoading && <Loader />}
        <div className="flex justify-between w-full items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-600 flex justify-start text-center">
            User Login
          </h2>
          {/* <Image src={logo} className="w-32" priority alt="logo" /> */}
        </div>
        <form onSubmit={loginUser}>
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
          <Button type="submit" variant="gradient" className=" w-full">
            Login
          </Button>
          <Button
            size="sm"
            type="button"
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center mt-2 w-full gap-3"
            onClick={(e) => signInWithGoogle(e)}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="google"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
          <span className=" mt-2 mb-2 flex justify-center items-center">
            ---OR---
          </span>
          <Button type="submit" variant="gradient" className=" w-full">
            Login as guest
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
