// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import TransactionForm from "../components/TransactionForm";
// import { useWallet } from "../contexts/WalletContext"; // Import wallet context
// import { coinsData } from "../lib/data";

// const SendTransaction = () => {
//   const [searchParams] = useSearchParams();
//   const initialCurrency = searchParams.get("currency") || "Ethereum";
//   const [currency, setCurrency] = useState(initialCurrency);

//   const [recipientAddress, setRecipientAddress] = useState("");
//   const [amount, setAmount] = useState("");

//   const { wallet, submitTransaction } = useWallet(); // Use context to access wallet and submitTransaction
//   const [senderAddress, setSenderAddress] = useState(wallet ? wallet[currency]?.address : "");

//   // Automatically update sender address when the currency changes
//   useEffect(() => {
//     if (wallet) {
//       const newSenderAddress = wallet[currency]?.address || '';
//       setSenderAddress(newSenderAddress);
//     }
//   }, [currency, wallet]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Sending transaction:", { currency, recipientAddress, senderAddress, amount });
//       const response = await submitTransaction(currency, recipientAddress, amount); // Replace with actual password logic
//       if (response.status === 'success') {
//         alert(`Transaction successful!`);
//       } else {
//         alert(`Transaction failed: ${response.message}`);
//       }
//     } catch (error) {
//       console.error("Error sending transaction:", error);
//       alert("Transaction failed. Please try again.");
//     } finally {
//       // Reset form
//       setRecipientAddress("");
//       setAmount("");
//       setCurrency(initialCurrency);
//     }
//   };

//   useEffect(() => {
//     setCurrency(initialCurrency);
//   }, [initialCurrency]);

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center">
//         <span className="mx-4">Send {currency}</span> 
//       </h2>

//       <TransactionForm
//         currency={currency}
//         senderAddress={senderAddress}
//         recipientAddress={recipientAddress}
//         amount={amount}
//         onCurrencyChange={(currency) => setCurrency(currency)}
//         onRecipientChange={(e) => setRecipientAddress(e.target.value)}
//         onAmountChange={(e) => setAmount(e.target.value)}
//         onSubmit={handleSend}
//         coinsData={coinsData} // Pass the icon mapping to the form
//       />
//     </div>
//   );
// };

// export default SendTransaction;

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { useWallet } from "../contexts/WalletContext"; // Import wallet context
import { coinsData } from "../lib/data";

const SendTransaction = () => {
  const navigate = useNavigate(); // For redirecting to /dashboard
  const [searchParams] = useSearchParams();
  const initialCurrency = searchParams.get("currency") || "Ethereum";
  const [currency, setCurrency] = useState(initialCurrency);

  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { wallet, submitTransaction } = useWallet();
  const [senderAddress, setSenderAddress] = useState(wallet ? wallet[currency]?.address : "");

  // State to handle loading
  const [loading, setLoading] = useState(false);

  // Automatically update sender address when the currency changes
  useEffect(() => {
    if (wallet) {
      const newSenderAddress = wallet[currency]?.address || '';
      setSenderAddress(newSenderAddress);
    }
  }, [currency, wallet]);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      console.log("Sending transaction:", { currency, recipientAddress, senderAddress, amount });
      const response = await submitTransaction(currency, recipientAddress, amount);
      if (response.status === 'success') {
        alert(`Transaction successful!`);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        alert(`Transaction failed: ${response.message}`);
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setLoading(false); // Stop loader
      // Reset form
      setRecipientAddress("");
      setAmount("");
      setCurrency(initialCurrency);
    }
  };

  useEffect(() => {
    setCurrency(initialCurrency);
  }, [initialCurrency]);

  return (
    <div className="max-w-lg mx-auto  flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center">
        <span className="mx-4">Send {currency}</span>
      </h2>

      {loading ? ( // Show loader if transaction is in progress
        <div className="flex items-center justify-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-500"></div>
          <span className="ml-3 text-white text-lg">Processing transaction...</span>
        </div>
      ) : (
        <TransactionForm
          currency={currency}
          senderAddress={senderAddress}
          recipientAddress={recipientAddress}
          amount={amount}
          onCurrencyChange={(currency) => setCurrency(currency)}
          onRecipientChange={(e) => setRecipientAddress(e.target.value)}
          onAmountChange={(e) => setAmount(e.target.value)}
          onSubmit={handleSend}
          coinsData={coinsData} // Pass the icon mapping to the form
        />
      )}
    </div>
  );
};

export default SendTransaction;
