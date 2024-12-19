// src/components/ProfileCard.js
import React from "react";

const ProfileCard = ({ name, imgSrc }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={imgSrc}
        alt={name}
        className="w-40 h-40 md:w-44 md:h-44 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-purple-500 transition-transform duration-300 hover:scale-105"
      />
      <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-300">{name}</p>
    </div>
  );
};

export default ProfileCard;
