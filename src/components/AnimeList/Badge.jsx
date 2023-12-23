import React from "react";

const Badge = ({ label, className }) => {
  return (
    <span
      className={
        `m-2 rounded-full px-2.5 py-0.5 text-sm font-medium ${className}`
      }
    >
      { label }
    </span>
  );
};

export default Badge;
