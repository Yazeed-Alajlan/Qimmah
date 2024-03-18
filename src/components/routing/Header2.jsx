"use client";
import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

export default function Header() {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    console.log(mobileNav);
    setMobileNav(!mobileNav);
  };

  return (
    <header className="sticky top-0 inset-x-0 p-6 z-40 bg-black/30 h-full w-full">
      <nav className="container  mx-auto">
        <motion.button
          initial="hide"
          animate={mobileNav ? "show" : "hide"}
          onClick={toggleMobileNav}
          className="flex flex-col space-y-1 relative z-10"
        >
          <motion.span
            variants={{
              hide: {
                rotate: 0,
              },
              show: {
                rotate: 45,
                y: 5,
              },
            }}
            className="w-6 bg-white h-px block"
          ></motion.span>
          <motion.span
            variants={{
              hide: {
                opacity: 1,
              },
              show: {
                opacity: 0,
              },
            }}
            className="w-6 bg-white h-px block"
          ></motion.span>
          <motion.span
            variants={{
              hide: {
                rotate: 0,
              },
              show: {
                rotate: -45,
                y: -5,
              },
            }}
            className="w-6 bg-white h-px block"
          ></motion.span>
        </motion.button>
        <AnimatePresence>
          {mobileNav && (
            <MotionConfig
              transition={{
                type: "spring",
                bounce: 0.1,
              }}
            >
              <motion.div
                key="mobile-nav"
                variants={{
                  hide: {
                    x: "1",
                    transition: {
                      type: "spring",
                      bounce: 0.1,
                      when: "afterChildren",
                      staggerChildren: 0.1,
                    },
                  },
                  show: {
                    x: "-50%",
                    transition: {
                      type: "spring",
                      bounce: 0.1,
                      when: "beforeChildren",
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hide"
                animate="show"
                exit="hide"
                className="fixed inset-0 bg-primary-500 p-6 flex flex-col pt-20  justify-center  space-y-10 lg:hidden"
              >
                <motion.ul
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="list-none space-y-6"
                >
                  <li>
                    <a href="#" className="text-5xl font-semibold text-white">
                      Link #1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-5xl font-semibold text-white">
                      Link #2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-5xl font-semibold text-white">
                      Link #3
                    </a>
                  </li>
                </motion.ul>
                <motion.div
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="w-full h-px bg-white/30"
                ></motion.div>
                <motion.ul
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="list-none flex justify-center gap-x-4"
                >
                  <li>
                    <div className="bg-primary-700 rounded-lg w-8 h-8"></div>
                  </li>
                  <li>
                    <div className="bg-primary-700 rounded-lg w-8 h-8"></div>
                  </li>
                  <li>
                    <div className="bg-primary-700 rounded-lg w-8 h-8"></div>
                  </li>
                </motion.ul>
              </motion.div>
            </MotionConfig>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
