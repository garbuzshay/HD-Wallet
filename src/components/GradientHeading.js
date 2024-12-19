// src/components/GradientHeading.js
import React from "react";

const GradientHeading = ({ text }) => {
  return (
    <h1 className="text-5xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
      {text}
    </h1>
  );
};

export default GradientHeading;
