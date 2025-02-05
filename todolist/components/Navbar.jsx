"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
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
import { useRouter, usePathname } from "next/navigation";
import { useOverAllContext } from "../shared/ContextProvider";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import {
  Add as AddTaskIcon,
  ManageAccounts as ManageTasksIcon,
  People as CommunityIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DashboardDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  border: "none",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  let { user, setUser, isOpenDashboardSidebar, setIsOpenDashboardSidebar } =
    useOverAllContext();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const openLoginModal = () => setIsOpenLoginModal(true);
  const closeLoginModal = () => setIsOpenLoginModal(false);
  const openRegisterModal = () => setIsOpenRegisterModal(true);
  const closeRegisterModal = () => setIsOpenRegisterModal(false);

  const toggleDrawer = () => setIsMenuOpen(!isMenuOpen);

  const toggleDashboardSidebar = () =>
    setIsOpenDashboardSidebar(!isOpenDashboardSidebar);

  const handleSignOut = (event) => {
    event.preventDefault();
    setUser(null);
    toast.success("User logged out successfully");
    router.push("/");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Todolist", icon: <FormatListNumberedIcon />, path: "/todolist" },
    { text: "Create Project", icon: <AddTaskIcon />, path: "/create-project" },
    {
      text: "Manage Projects",
      icon: <ManageTasksIcon />,
      path: "/manage-projects",
    },
    { text: "Community", icon: <CommunityIcon />, path: "/community" },
  ];

  return (
    <>
      {/* App Bar */}
      <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] min-h-screen">
        <div className="col-span-2 row-start-1 z-50">
          <AppBar
            className={` shadow-none md:py-0 transition-all border-b-2 border-gray-300 duration-300 bg-white`}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              color: `${"#000000"}`,
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Toolbar>
              {/* Hamburger Icon */}
              {pathname == "/" ? (
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
              ) : (
                <IconButton
                  size="large"
                  edge="start"
                  className="text-black"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDashboardSidebar}
                >
                  {isOpenDashboardSidebar ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              )}

              {/* Title */}
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="text-black text-sm sm:text-xl font-bold tracking-wide"
              >
                <Image
                  src={logo}
                  className="w-24 sm:w-24 md:w-32 lg:w-36"
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
                  {pathname == "/" && (
                    <Link href={"/dashboard"}>
                      <Button variant="text" size="sm" className=" mr-2">
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <ProfileDropdown user={session?.user} isNormalUser={false} />
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
                  {pathname == "/" && (
                    <Link href={"/dashboard"}>
                      <Button variant="text" size="sm" className=" mr-2">
                        Dashboard
                      </Button>
                    </Link>
                  )}
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
        </div>
        {["/dashboard", "/create-project", "/todolist"].includes(pathname) && (
          <div className="row-start-2 col-start-1 z-40">
            <DashboardDrawer
              variant="permanent"
              className="border-none"
              open={isOpenDashboardSidebar}
              sx={{
                border: "none",
                boxShadow: "none",
                margin: 0,
              }}
            >
              <DrawerHeader>
                <IconButton
                  onClick={() => {
                    setIsOpenDashboardSidebar(false);
                  }}
                >
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    key={item.text}
                    title={item.text}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Link href={item.path}>
                      <ListItemButton
                        sx={[
                          {
                            minHeight: 38,
                            px: 2.5,
                            "&:hover": {
                              backgroundColor: "rgba(156, 163, 175, 0.3)", // Lighter gray on hover
                            },
                          },
                          // Apply active styling if the current route matches the item's path
                          pathname === item.path
                            ? {
                                backgroundColor: "rgba(156, 163, 175, 0.5)", // Active state styling
                              }
                            : {},
                          isOpenDashboardSidebar
                            ? {
                                justifyContent: "initial",
                              }
                            : {
                                justifyContent: "center",
                              },
                        ]}
                      >
                        <ListItemIcon
                          sx={[
                            {
                              minWidth: 0,
                              justifyContent: "center",
                            },
                            isOpenDashboardSidebar
                              ? {
                                  mr: 3,
                                }
                              : {
                                  mr: "auto",
                                },
                          ]}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={[
                            isOpenDashboardSidebar
                              ? {
                                  opacity: 1,
                                }
                              : {
                                  opacity: 0,
                                },
                          ]}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </DashboardDrawer>
          </div>
        )}
      </div>

      {/* Drawer */}
      {pathname !== "/dashboard" && (
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
      )}

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
