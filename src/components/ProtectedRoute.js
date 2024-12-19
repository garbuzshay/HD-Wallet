import React from "react";
import { Navigate } from "react-router-dom";
import { useWallet } from "../contexts/WalletContext";

const ProtectedRoute = ({ children }) => {
  const { wallet } = useWallet();

  if (!wallet) {
    return <Navigate to="/create-restore" replace />;
  }

  return children;
};

export default ProtectedRoute;
