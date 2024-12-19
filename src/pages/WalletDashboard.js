import React, { useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import WalletCard from '../components/WalletCard';
import TransactionList from '../components/TransactionList';
import { coinsData } from '../lib/data';

const WalletDashboard = () => {
  const { balances, transactionHistory, fetchBalances, fetchTransactionHistory,  wallet} = useWallet();
  console.log("dash")
  useEffect(() => {
    fetchBalances();
    fetchTransactionHistory();
  }, [fetchBalances, fetchTransactionHistory]);


  const wallets = [
    {
      name: 'Ethereum',
      address: wallet.Ethereum.address || 'N/A',
      balance: balances?.Ethereum ? `${balances.Ethereum} ETH` : 'Loading...',
      transactions: transactionHistory?.Ethereum || [],
      linkStyle: 'text-purple-300',
      borderStyle: 'border-purple-500',
    },
    {
      name: 'Arbitrum',
      address: wallet.Arbitrum.address || 'N/A',
      balance: balances?.Arbitrum ? `${balances.Arbitrum} ETH` : 'Loading...',
      transactions: transactionHistory?.Arbitrum || [],
      linkStyle: 'text-blue-300',
      borderStyle: 'border-blue-500',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Wallet Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wallets.map((wallet) => (
          <React.Fragment key={wallet.name}>
            <WalletCard
              title={`${wallet.name} Wallet Info`}
              address={wallet.address}
              balance={wallet.balance}
              currency={wallet.name}
              imageUrl={coinsData[wallet.name].image}
              linkStyle={wallet.linkStyle}
              borderStyle={wallet.borderStyle}
            />
            <TransactionList
              title={`Recent ${wallet.name} Transactions`}
              transactions={wallet.transactions}
              titleStyle={wallet.linkStyle}
              borderStyle={wallet.borderStyle}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WalletDashboard;
