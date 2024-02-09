"use client";
import React from "react";
import { motion } from "framer-motion";
import { TbX } from "react-icons/tb";
import Button from "../buttons/Button";

const Modal = ({
  children,
  title,
  footerContent,
  isModalOpen,
  setIsModalOpen,
  size, // New prop for modal size
}) => {
  return (
    <div
      className={`MODAL fixed backdrop-brightness-50 inset-0 flex justify-center items-center content-center  ${
        isModalOpen ? "flex" : "hidden"
      } `}
      style={{ zIndex: isModalOpen ? 1000 : -1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <div
          className={`bg-white ${
            size === "lg" ? "w-3/4" : "w-1/2"
          } p-6 rounded shadow-md`}
        >
          <div className="flex justify-between items-center border-b-4 pb-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button
              onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
              icon={TbX}
            />
          </div>
          <div className="mt-4">{children}</div>
          {footerContent && <div className="mt-4">{footerContent}</div>}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
