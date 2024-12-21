
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

    <div>
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
    </div>
  );
};

export default WalletForm;