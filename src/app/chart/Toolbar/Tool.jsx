"use client";
import Button from "@/components/utils/buttons/Button";
import React from "react";

const Tool = ({ icon, hoverText, onClick }) => {
  return (
    <Button
      icon={icon}
      hoverText={hoverText}
      onClick={onClick}
      size="sm" // Define the size here or pass it as a prop when using Tool component
    />
  );
};

export default Tool;
