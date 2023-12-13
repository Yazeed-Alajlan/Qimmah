import React from "react";

export default function StockLayout({ children }) {
  return (
    <h1>
      <ul>
        <li>HEADER LAYOUT</li>
      </ul>
      {children}
    </h1>
  );
}
