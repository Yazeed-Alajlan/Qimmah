"use client";
import React from "react";
import "./CardWithLink.css";
import Link from "next/link";

const CardWithLink = ({ to, label, icon, color }) => {
  const cardStyle = {
    borderColor: color || "default-color", // Provide a default color if not specified.
  };

  return (
    <div>
      <Link
        href={to}
        className={`flex flex-col justify-center items-center relative custom-card human-resources ${
          color ? "custom-color" : ""
        }`}
        style={cardStyle}
      >
        <div className="flex flex-col  justify-center items-center">
          <div className="overlay" />
          <div className="circle ">
            <div className="icon">{icon}</div>
          </div>
        </div>
        <p>{label}</p>
      </Link>
    </div>
  );
};

export default CardWithLink;
