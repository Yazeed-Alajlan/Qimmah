"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Header = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (!scrolling) {
          setScrolling(true);
          controls.start({ height: "75px" }); // Adjust the desired height
        }
      } else {
        if (scrolling) {
          setScrolling(false);
          controls.start({ height: "100px" }); // Adjust the original height
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling, controls]);

  return (
    <motion.header
      className="flex justify-center items-center align-middle sticky top-0 w-full bg-white p-4"
      initial={{ height: "100px" }} // Adjust the original height
      animate={controls}
    >
      {children}
    </motion.header>
  );
};

export default Header;
