import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
      <CircularProgress color="inherit" className=" text-black" />
    </div>
  );
};

export default Loader;
