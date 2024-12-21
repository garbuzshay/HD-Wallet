

import React from "react";
import FormField from "./FormField";

const TransactionForm = ({
  currency,
  senderAddress,
  recipientAddress,
  amount,
  onCurrencyChange,
  onRecipientChange,
  onAmountChange,
  onSubmit,
  coinsData, // Receive icon mapping
}) => {

  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState(currency);

  const options = Object.values(coinsData).map((coin) => ({ 
    id: coin.name,
    name: coin.name, 
    icon: coin.image
  }));

  const handleCurrencySelect = (option) => {
    setSelectedCurrency(option.name);
    onCurrencyChange(option.name);
    setShowDropdown(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-800 rounded-lg p-6 border border-purple-500 shadow-neon-purple"
    >
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-white ml-2">
          Transaction Details
        </h3>
      </div>

      <div className="relative mb-4">
        <label htmlFor="currency" className="block text-sm font-medium text-white mb-1">
          Currency
        </label>
        <button 
          type="button" 
          className="w-full flex justify-between items-center bg-gray-700 text-white p-3 rounded-lg shadow focus:outline-none" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex items-center">
            {selectedCurrency && (
              <img 
                src={options.find(option => option.name === selectedCurrency)?.icon} 
                alt={selectedCurrency} 
                className="w-6 h-6 mr-2" 
              />
            )}
            {selectedCurrency || 'Select Currency'}
          </div>
          <span className="text-white">&#9662;</span> {/* Dropdown arrow */}
        </button>
        
        {showDropdown && (
          <ul className="absolute z-10 bg-gray-700 mt-2 w-full rounded-lg shadow-md">
            {options.map((option) => (
              <li 
                key={option.id} 
                onClick={() => handleCurrencySelect(option)} 
                className="flex items-center p-3 hover:bg-purple-700 cursor-pointer"
              >
                <img 
                  src={option.icon} 
                  alt={option.name} 
                  className="w-6 h-6 mr-2" 
                />
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <FormField
        id="sender"
        label="Sender Address"
        placeholder="Your Wallet Address"
        type="text"
        value={senderAddress}
        readOnly // Make it read-only so users can't change it
      />

      <FormField
        id="recipient"
        label="Recipient Address"
        placeholder="Enter Recipient Address"
        type="text"
        value={recipientAddress}
        onChange={onRecipientChange}
        required
      />

      <FormField
        id="amount"
        label="Amount"
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (value > 0 || e.target.value === "") {
            onAmountChange(e); // Only allow positive numbers or an empty field
          }
        }}
        required
        step="0.000001"
        min="0.0000001" // Prevent numbers less than or equal to 0
      />

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 shadow-neon-purple"
      >
        Send Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
