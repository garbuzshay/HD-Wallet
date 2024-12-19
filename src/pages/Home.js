// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import GradientHeading from "../components/GradientHeading";
import ProfileCard from "../components/ProfileCard";

const Home = () => {
  console.log("home")
  return (
    <div className="text-center ">
      <GradientHeading text="Welcome to CryptoWallet" />
      <p className="text-base sm:text-xl mb-4 text-gray-300 ">
        Your secure and easy-to-use cryptocurrency wallet
      </p>

      {/* Made by Section */}
      <div className="mt-8 md:mt-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6">Made by</h2>
        <div className="flex justify-center items-center space-x-8">
          <ProfileCard name="Shay Garbuz" imgSrc="/images/shayjpg.jpg" />
          <ProfileCard name="May Caspi" imgSrc="/images/may.jpg" />
        </div>
      </div>
      
      <div className="mt-8">
        <Link
          to="/create-restore"
          className="w-full sm:w-auto inline-block px-6 sm:px-8 py-2 sm:py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors duration-300 shadow-neon-purple text-sm sm:text-base"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;