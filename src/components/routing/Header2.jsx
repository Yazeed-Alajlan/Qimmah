// Header.js

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const MotionFlex = dynamic(() =>
  import("framer-motion").then((module) => module.motion.div)
);
const MotionAvatar = dynamic(() =>
  import("framer-motion").then((module) => module.motion.img)
);
const MotionHeading = dynamic(() =>
  import("framer-motion").then((module) => module.motion.h1)
);

export function Header() {
  // Check if we are on the client side
  const isClient = typeof window !== "undefined";

  // Use useScroll only on the client side
  const { scrollY } = isClient
    ? require("framer-motion").useScroll()
    : { scrollY: null };

  const scrollYRange = [0, 100, 100];

  const motionValueScrollYFactory = (values) => {
    return isClient
      ? require("framer-motion").useTransform(scrollY, scrollYRange, values)
      : null;
  };

  const containerHeight = motionValueScrollYFactory(["100px", "60px", "60px"]);
  const imageSize = motionValueScrollYFactory(["60px", "30px", "30px"]);
  const fontSize = motionValueScrollYFactory(["3rem", "1.5rem", "1.5rem"]);
  const opacity = motionValueScrollYFactory([0, 1, 1]);
  const paddingHeaderX = motionValueScrollYFactory(["30px", "20px", "20px"]);

  const controls = isClient ? require("framer-motion").useAnimation() : null;
  const delta = React.useRef(0);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    if (isClient && scrollY && controls) {
      const updateControls = (val) => {
        const diff = Math.abs(val - lastScrollY.current);
        if (val >= lastScrollY.current) {
          delta.current = delta.current >= 10 ? 10 : delta.current + diff;
        } else {
          delta.current = delta.current <= -10 ? -10 : delta.current - diff;
        }

        if (delta.current >= 10 && val > 200) {
          controls.start("hidden");
        } else if (delta.current <= -10 || val < 200) {
          controls.start("visible");
        }
        lastScrollY.current = val;
      };

      const unsubscribe = scrollY.onChange(updateControls);

      return () => {
        unsubscribe();
      };
    }
  }, [isClient, scrollY, controls]);

  return (
    <MotionFlex
      className="fixed w-full bg-gray-200 transition-all duration-300 ease-in-out"
      initial="visible"
      animate={controls}
      variants={{
        visible: { top: "0px" },
        hidden: { top: "-100px" },
      }}
      style={{
        height: containerHeight,
        paddingLeft: paddingHeaderX,
        paddingRight: paddingHeaderX,
      }}
    >
      <div className="flex items-center justify-between w-full">
        <MotionAvatar
          src="https://randomuser.me/api/portraits/men/32.jpg"
          className="rounded-full"
          style={{
            height: imageSize,
            width: imageSize,
          }}
        />
        <div className="flex items-center">
          <MotionHeading
            className="text-xl font-bold mr-2"
            style={{
              fontSize,
              opacity,
            }}
          >
            Mike
          </MotionHeading>
          <MotionHeading
            className="text-xl font-bold"
            style={{
              fontSize,
              opacity,
            }}
          >
            's blog
          </MotionHeading>
        </div>
        <button className="p-2 text-gray-800 hover:text-gray-600 transition-all">
          {/* Replace the button content with your icon component */}
          Icon
        </button>
      </div>
    </MotionFlex>
  );
}
