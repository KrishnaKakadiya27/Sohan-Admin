// src/customHooks/useWindowHeight.js
import { useState, useEffect } from "react";

const useWindowHeight = () => {
  // Initialize state with window height
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Handler to update state when the window is resized
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Add event listener to track window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs once

  return windowHeight;
};

export default useWindowHeight;
