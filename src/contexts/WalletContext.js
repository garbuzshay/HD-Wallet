
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Wallet, JsonRpcProvider, formatEther, Mnemonic, ethers } from "ethers";
// import { Wallet, JsonRpcProvider, formatEther, parseEther, Mnemonic, ethers } from 'ethers';
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { coinsData } from "../lib/data";
import { HDNodeWallet } from "ethers";

// Encryption utilities
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "default-secure-key";
const ETHERSCAN_API_KEY = "5166JW8TT4HIGUQBY265CCB24QC4KTBSP7";

const encryptText = (text, key = SECRET_KEY) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

const WalletContext = createContext();

// Custom hook for using wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Wallet Provider Component
export const WalletProvider = ({ children }) => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState();
  const [balances, setBalances] = useState({
    Arbitrum: "",
    Ethereum: "",
  });
  const [transactionHistory, setTransactionHistory] = useState({
    Arbitrum: [],
    Ethereum: [],
  });

  // Network configurations
  const NETWORK_PROVIDERS = useMemo(
    () => ({
      Arbitrum: coinsData.Arbitrum.provider,
      Ethereum: coinsData.Ethereum.provider,
    }),
    []
  );

  // Create a new wallet
  const createWallet = (name, password) => {
    try {
      const ethWallet = Wallet.createRandom();
      const mnemonic = ethWallet.mnemonic.phrase;

      const arbitrumWallet = HDNodeWallet.fromMnemonic(
        Mnemonic.fromPhrase(mnemonic),
        "m/44'/60'/0'/0/0"
      );
      // const ethereumWallet = Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/1");
      const ethereumWallet = HDNodeWallet.fromMnemonic(
        Mnemonic.fromPhrase(mnemonic),
        "m/44'/60'/0'/0/1"
      );
      const walletName = `wallet-${arbitrumWallet.address}`;

      const newWallet = {
        name: walletName,
        Arbitrum: {
          address: arbitrumWallet.address,
          privateKey: encryptText(arbitrumWallet.privateKey, password),
        },
        Ethereum: {
          address: ethereumWallet.address,
          privateKey: encryptText(ethereumWallet.privateKey, password),
        },
      };
      localStorage.setItem(walletName, JSON.stringify(newWallet));
      setWallet(newWallet);
      // navigate('/dashboard');
      localStorage.setItem("mnemonic", mnemonic);
      // console.log(mnemonic)
      return mnemonic;
    } catch (error) {
      console.error("Wallet creation failed:", error);
      alert("Wallet creation failed. Please try again.");
      return null;
    }
  };

  const restoreWallet = (mnemonic) => {
    try {
      const arbitrumWallet = HDNodeWallet.fromMnemonic(
        Mnemonic.fromPhrase(mnemonic),
        "m/44'/60'/0'/0/0"
      );
      const ethereumWallet = HDNodeWallet.fromMnemonic(
        Mnemonic.fromPhrase(mnemonic),
        "m/44'/60'/0'/0/1"
      );
      const walletName = `wallet-${arbitrumWallet.address}`;

      const restoredWallet = {
        name: walletName,
        Arbitrum: {
          address: arbitrumWallet.address,
          privateKey: arbitrumWallet.privateKey,
        },
        Ethereum: {
          address: ethereumWallet.address,
          privateKey: ethereumWallet.privateKey,
        },
      };

      localStorage.setItem(walletName, JSON.stringify(restoredWallet));
      setWallet(restoredWallet);
      navigate("/dashboard");
    } catch (error) {
      console.error("Wallet restoration failed:", error);
      alert("Wallet restoration failed. Please check your mnemonic.");
    }
  };

  const fetchBalance = useCallback(
    async (networkName, address) => {
      try {
        const provider = new JsonRpcProvider(NETWORK_PROVIDERS[networkName]);
        const balance = await provider.getBalance(address);
        return formatEther(balance);
      } catch (error) {
        console.error(`Balance fetch error for ${networkName}:`, error);
        return "0";
      }
    },
    [NETWORK_PROVIDERS]
  );

  const fetchBalances = useCallback(async () => {
    if (!wallet) return;

    const arbitrumBalance = await fetchBalance(
      "Arbitrum",
      wallet.Arbitrum.address
    );
    const ethereumBalance = await fetchBalance(
      "Ethereum",
      wallet.Ethereum.address
    );

    setBalances({
      Arbitrum: arbitrumBalance,
      Ethereum: ethereumBalance,
    });
  }, [wallet, fetchBalance]);

  const logout = () => {
    setWallet(null);
    setBalances({ Arbitrum: "", Ethereum: "" });
    setTransactionHistory({ Arbitrum: [], Ethereum: [] });
    navigate("/create-restore");
  };


  const submitTransaction = async (coin, toAddress, amount) => {
    try {
      if (!wallet) throw new Error("❌ No wallet connected");

      const currentWallet = wallet[coin];
      if (!currentWallet)
        throw new Error(`❌ No wallet found for coin: ${coin}`);

      const privateKey = currentWallet.privateKey;
      const fromAddress = currentWallet.address;

      const walletInstance = new ethers.Wallet(privateKey);
      const provider = new ethers.JsonRpcProvider(NETWORK_PROVIDERS[coin]);

      // const gasLimit = 21000;

      // 🔥 Get the gas price using Ethers v6 format
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice; // Use gasPrice from the feeData

      if (!gasPrice) throw new Error("❌ Failed to retrieve gas price.");

      const connectedWallet = walletInstance.connect(provider);
      const amountWei = ethers.parseUnits(amount.toString(), "ether"); // Convert amount to Wei
      const gasLimit = await provider.estimateGas({
        from: fromAddress,
        to: toAddress,
        value: amountWei,
      });

      const tx = {
        from: fromAddress,
        to: toAddress,
        value: amountWei,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
      };

      console.log("📬 Sending Transaction:", tx);

      const transaction = await connectedWallet.sendTransaction(tx);
      const receipt = await transaction.wait();

      // 🔥 Update balances and transaction history
      await fetchBalances();
      await fetchTransactionHistory();

      console.log("✅ Transaction Successful!");
      return {
        status: "success",
        message: receipt.transactionHash ||"✅ Transaction Successful!" ,
      };
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      return {
        status: "failed",
        message: error.message || "Transaction failed",
      };
    }
  };

  const getTransactionHistory = useCallback(
    async (
      coinName,
      address = "",
      startBlock = 0,
      endBlock = 99999999,
      page = 1,
      offset = 15,
      sort = "desc"
    ) => {
      try {
        let apiURL;

        if (coinName === "Ethereum") {
          apiURL = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${ETHERSCAN_API_KEY}`;
        } else if (coinName === "Arbitrum") {
          apiURL = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${ETHERSCAN_API_KEY}`;
        } else {
          throw new Error("Unsupported coin name");
        }

        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "1") {
          throw new Error(`Etherscan API error! message: ${data.message}`);
        }

        return data.result;
      } catch (error) {
        return [];
      }
    },
    []
  );
  const fetchTransactionHistory = useCallback(async () => {
    if (wallet) {
      const arbitrumTransactions = await getTransactionHistory(
        "Arbitrum",

        wallet.Arbitrum.address
      );

      const ethereumTransactions = await getTransactionHistory(
        "Ethereum",
        wallet.Ethereum.address
      );
      console.log(arbitrumTransactions);
      console.log(ethereumTransactions);
      setTransactionHistory({
        Arbitrum: arbitrumTransactions,
        Ethereum: ethereumTransactions,
      });
    }
  }, [getTransactionHistory, wallet]);

  useEffect(() => {
    if (wallet) {
      fetchBalances();
    }
  }, [wallet, fetchBalances]);

  const contextValue = {
    wallet,
    balances,
    transactionHistory,
    createWallet,
    restoreWallet,
    logout,
    submitTransaction,
    fetchBalances,
    fetchTransactionHistory,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
