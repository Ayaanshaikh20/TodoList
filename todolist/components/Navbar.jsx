"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import logo from "../app/assets/Todolist_logo.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import ProfileDropdown from "./ProfileDropdown";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const openLoginModal = () => setIsOpenLoginModal(true);
  const closeLoginModal = () => setIsOpenLoginModal(false);
  const openRegisterModal = () => setIsOpenRegisterModal(true);
  const closeRegisterModal = () => setIsOpenRegisterModal(false);

  const toggleDrawer = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    setUser(null);
    toast.success("User logged out successfully");
    window.location.reload();
  };

  return (
    <>
      {/* App Bar */}
      <AppBar
        className={` shadow-none md:py-0 transition-all duration-300 ${
          isScrolled ? "bg-white" : "bg-transparent z-50"
        }`}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: `${isScrolled ? "#000000" : ""}`,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {/* Hamburger Icon */}
          <IconButton
            size="large"
            edge="start"
            className="text-black"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="text-black text-sm sm:text-xl font-bold tracking-wide"
          >
            <Image
              src={logo}
              className="w-24 sm:w-32 md:w-40 lg:w-44"
              alt="logo"
            />
          </Typography>

          {/* Action Buttons */}
          {!session?.user && !user ? (
            <div className="hidden sm:flex gap-2">
              <Button
                color="inherit"
                size="sm"
                variant="outlined"
                className="text-black border-black z-50"
                onClick={openLoginModal}
              >
                Login
              </Button>
              <Button
                color="inherit"
                size="sm"
                variant="gradient"
                className="ml-3"
                onClick={openRegisterModal}
              >
                Register
              </Button>
            </div>
          ) : session?.user ? (
            <div className="flex gap-2 items-center">
              <ProfileDropdown user={session?.user} />
              <Button
                color="inherit"
                size="sm"
                variant="gradient"
                className="ml-3"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <ProfileDropdown normalUser={user} isNormalUser={true} />
              <Button
                color="inherit"
                size="sm"
                variant="gradient"
                className="ml-3"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        open={isMenuOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            background: "#000000",
            color: "#ffffff",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {/* Main Menu */}
          <List>
            {["Home", "About us"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon className="text-white" />
                    ) : (
                      <MailIcon className="text-white" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} className="text-white" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* Login and Register Buttons for small screens */}
          <div className="sm:hidden flex flex-col gap-2 p-3">
            {!session?.user && !user ? (
              <>
                <Button
                  color="inherit"
                  size="sm"
                  variant="outlined"
                  className="text-white border-white"
                  onClick={openLoginModal}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  size="sm"
                  variant="gradient"
                  className="mt-2"
                  onClick={openRegisterModal}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                size="sm"
                variant="gradient"
                className="text-red-600"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            )}
          </div>
        </Box>
      </Drawer>

      {/* Modals */}
      <RegisterModal
        open={isOpenRegisterModal}
        handleOpen={openRegisterModal}
        handleClose={closeRegisterModal}
      />
      <LoginModal
        open={isOpenLoginModal}
        handleOpen={openLoginModal}
        handleClose={closeLoginModal}
      />
    </>
  );
};

export default NavbarComponent;
