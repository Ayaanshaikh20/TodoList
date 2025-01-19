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
import { Avatar } from "@material-tailwind/react";
import toast from "react-hot-toast";
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import ProfileDropdown from "./ProfileDropdown";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const drawerWidth = 240;
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const openLoginModal = () => {
    setIsOpenLoginModal(true);
  };

  const closeLoginModal = () => {
    setIsOpenLoginModal(false);
  };

  const openRegisterModal = () => {
    setIsOpenRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setIsOpenRegisterModal(false);
  };

  const toggleDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    setUser({});
    toast.success("User logged out successfully");
    window.location.reload();
  };

  const closeMenu = () => setIsProfileOpen(false);

  return (
    <>
      {/* App Bar */}
      <AppBar
        className="shadow-lg py-2 md:py-0"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <Toolbar>
          {/* Hamburger Icon */}
          <IconButton
            size="large"
            edge="start"
            className=" text-black"
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
            <Image src={logo} className="w-44" alt="logo" />
          </Typography>

          {/* Action Buttons */}
          {!session?.user && !user ? (
            <>
              <Button
                color="inherit"
                size="sm"
                variant="outlined"
                className="text-black border-black"
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
              {/* <span>{JSON.stringify(user)}</span> */}
            </>
          ) : session?.user ? (
            <>
              <div className=" flex gap-2 items-center">
                {/* <span className=" text-sm">Welcome, {session?.user?.name}</span> */}
                <ProfileDropdown user={session?.user} />
              </div>
              <Button
                color="inherit"
                size="sm"
                variant="gradient"
                className="ml-3"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : user ? (
            <>
              <ProfileDropdown normalUser={user} isNormalUser={true} />
              <Button
                color="inherit"
                size="sm"
                variant="gradient"
                className="ml-3"
                onClick={(e) => handleSignOut(e)}
              >
                Logout
              </Button>
            </>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        open={isMenuOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#000000",
            color: "#333",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {/* Main Menu */}
          <List>
            {["Home", "About us"].map((text, index) => (
              <ListItem key={text} disablePadding className="">
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon className="text-white" />
                    ) : (
                      <MailIcon className="text-white" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} className=" text-white" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* Secondary Menu */}
          <List>
            {["Logout"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon className="text-red-600" />
                    ) : (
                      <MailIcon className="text-red-600" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} className=" text-white" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Register Modal */}
      <RegisterModal
        open={isOpenRegisterModal}
        handleOpen={openRegisterModal}
        handleClose={closeRegisterModal}
      />

      {/* Login Modal */}
      <LoginModal
        open={isOpenLoginModal}
        handleOpen={openLoginModal}
        handleClose={closeLoginModal}
      />
    </>
  );
};

export default NavbarComponent;
