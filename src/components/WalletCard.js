import React from "react";
import { Link } from "react-router-dom";

const WalletCard = ({
  title,
  address,
  balance,
  currency,
  linkStyle,
  borderStyle,
  imageUrl,
  
}) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg p-6 border ${borderStyle}`}
    >
      <div className="flex items-center mb-4">
        {/* Render the currency image */}
        <img src={imageUrl} alt={currency} className="w-8 h-8 rounded-full mr-2" />
        <h3 className={`text-xl font-semibold ml-2 ${linkStyle}`}>{title}</h3>
      </div>
      <p className="text-gray-300 mb-2">
        {/* <span className="font-semibold">Address:</span> {address} */}
        <span className="font-semibold">Address:</span> {`${address.slice(0, 20)}...${address.slice(-4)}`}
      </p>
      <p className="text-2xl font-bold text-green-400 mb-4">{balance}</p>
      <Link
        to={`/send?currency=${currency}`}
        className={`border border-white inline-block bg-${currency.toLowerCase()}-600 hover:bg-${currency.toLowerCase()}-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 shadow-neon-${currency.toLowerCase()}`}
      >
        Send Funds
      </Link>
    </div>
  );
};

export default WalletCard;