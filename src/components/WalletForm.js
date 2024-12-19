// // src/components/WalletForm.js
// import React from 'react';
// import Button from './Button';
// import InputField from './InputField';

// const WalletForm = ({ seedPhrase, setSeedPhrase, onCreateWallet, onRestoreWallet }) => {
//   return (
//     <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-purple-500 shadow-neon-purple">
//       <Button onClick={onCreateWallet} className="mb-4">
//         Create New Wallet
//       </Button>
//       <div className="space-y-4">
//         <InputField
//           value={seedPhrase}
//           onChange={(e) => setSeedPhrase(e.target.value)}
//           placeholder="Enter seed phrase"
//         />
//         <Button onClick={onRestoreWallet}>
//           Recover Wallet
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default WalletForm;

// import React from "react";
// import Button from "./Button";
// import InputField from "./InputField";
// import { FaBitcoin, FaEthereum } from "react-icons/fa";

// const WalletForm = ({
//   seedPhrase,
//   setSeedPhrase,
//   onCreateWallet,
//   onRestoreWallet,
//   currency,
//   setCurrency,
// }) => {
//   const currencyIcons = {
//     Bitcoin: <FaBitcoin className="text-yellow-400 text-2xl" />,
//     Ethereum: <FaEthereum className="text-blue-400 text-2xl" />,
//   };

//   return (
//     <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-purple-500 shadow-neon-purple">
//       <div className=" justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold text-purple-400 mb-2">
//           Choose Wallet Currency
//         </h3>
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setCurrency("Ethereum")}
//             className={`flex items-center px-3 py-2 rounded-md ${
//               currency === "Ethereum"
//                 ? "bg-purple-600 text-white shadow-neon-purple"
//                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//             }`}
//           >
//             {currencyIcons.Ethereum}
//             <span className="ml-2">Ethereum</span>
//           </button>
//           <button
//             onClick={() => setCurrency("Bitcoin")}
//             className={`flex items-center px-3 py-2 rounded-md ${
//               currency === "Bitcoin"
//                 ? "bg-purple-600 text-white shadow-neon-purple"
//                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//             }`}
//           >
//             {currencyIcons.Bitcoin}
//             <span className="ml-2">Bitcoin</span>
//           </button>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Button onClick={onCreateWallet} className="w-full">
//           Create New {currency} Wallet
//         </Button>

//         <div className="flex items-center justify-center my-4">
//           <div className="flex-grow border-t border-gray-600"></div>
//           <span className="mx-4 text-gray-400 text-sm">OR</span>
//           <div className="flex-grow border-t border-gray-600"></div>
//         </div>

//         <InputField
//           value={seedPhrase}
//           onChange={(e) => setSeedPhrase(e.target.value)}
//           placeholder={`Enter ${currency} seed phrase`}
//           className="w-full"
//         />

//         <Button onClick={onRestoreWallet} className="w-full">
//           Recover {currency} Wallet
//         </Button>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

const WalletForm = ({ onCreateWallet, onRestoreWallet }) => {
  const [formState, setFormState] = useState({
    seedPhrase: "",
    name: "",
    password: "",
    isCreatingWallet: false
  });


  const handleCreateNewWalletClick = () => {
    setFormState((prevState) => ({ ...prevState, isCreatingWallet: true }));
  };

  const handleReturnClick = () => {
    setFormState({ seedPhrase: "", name: "", password: "", isCreatingWallet: false });
  };

  const handleSubmitNewWallet = () => {
    onCreateWallet(formState.name, formState.password);
    setFormState({ seedPhrase: "", name: "", password: "", isCreatingWallet: false });
  };

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-purple-500 shadow-neon-purple">
      

      {formState.isCreatingWallet ? (
        <div className="space-y-4">
          <InputField
            value={formState.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter wallet name"
            className="w-full"
          />
          <InputField
            value={formState.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Enter wallet password"
            type="password"
            className="w-full"
          />
          <Button onClick={handleSubmitNewWallet} className="w-full">
            Submit New Wallet
          </Button>
          <Button onClick={handleReturnClick} className="w-full bg-red-500 mt-4">
            Return
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Button onClick={handleCreateNewWalletClick} className="w-full">
            Create New Wallet
          </Button>

          <div className="flex items-center justify-center my-4">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <InputField
            value={formState.seedPhrase}
            onChange={(e) => handleInputChange('seedPhrase', e.target.value)}
            placeholder={`Enter seed phrase`}
            className="w-full"
          />

          <Button onClick={() => onRestoreWallet(formState.seedPhrase)} className="w-full">
            Recover Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletForm;