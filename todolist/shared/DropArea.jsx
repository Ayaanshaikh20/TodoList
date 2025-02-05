"use client";
import React, { useEffect, useState } from "react";

const DropArea = () => {
  const [showDropArea, setshowDropArea] = useState(false);
  return (
    <section
      className={`${showDropArea ? "drop_area py-0" : "hide_drop"}`}
      onDragEnter={() => {
        setshowDropArea(true);
      }}
      onDragLeave={() => {
        setshowDropArea(false);
      }}
    >
      <p className="text-center">Drop here</p>
    </section>
  );
};

export default DropArea;
