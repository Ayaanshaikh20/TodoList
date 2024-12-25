import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
      <CircularProgress color="success" />
    </div>
  );
};

export default Loader;
