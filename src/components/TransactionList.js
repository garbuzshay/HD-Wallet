// // src/components/TransactionList.js
// import React from 'react';

// const TransactionList = ({ transactions }) => {
//   return (
//     <div className="bg-gray-800 rounded-lg p-6 border border-purple-500 shadow-neon-purple">
//       <h3 className="text-xl font-semibold mb-4 text-purple-300">Recent Transactions</h3>
//       <ul className="space-y-2">
//         {transactions.map((tx) => (
//           <li
//             key={tx.id}
//             className="flex justify-between items-center border-b border-gray-700 py-2"
//           >
//             <span className={tx.type === 'Received' ? 'text-green-400' : 'text-red-400'}>
//               {tx.type}
//             </span>
//             <span className="text-gray-300">{tx.amount}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;


// src/components/TransactionList.js

// import React from 'react';

// const TransactionList = ({ 
//   title, 
//   transactions, 
//   titleStyle = '', 
//   borderStyle = '', 
//   networkName 
// }) => {
//   // If no transactions, show a message
//   if (!transactions || transactions.length === 0) {
//     return (
//       <div className={`bg-gray-800 rounded-lg p-6 border ${borderStyle} shadow-neon`}>
//         <h3 className={`text-xl font-semibold mb-4 ${titleStyle}`}>{title}</h3>
//         <p className="text-gray-400 text-center">No transactions found</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`bg-gray-800 rounded-lg p-6 border ${borderStyle} shadow-neon`}>
//       <h3 className={`text-xl font-semibold mb-4 ${titleStyle}`}>{title}</h3>
//       <ul className="space-y-2">
//         {transactions.map((tx, index) => (
//           <li
//             key={`${tx.hash}-${index}`}
//             className="flex justify-between items-center border-b border-gray-700 py-2"
//           >
//             <div className="flex flex-col">
//               <span className={tx.txreceipt_status === '1' ? 'text-green-400' : 'text-red-400'}>
//                 {tx.txreceipt_status === '1' ? 'Success' : 'Failed'}
//               </span>
//               <span className="text-md ">
//                 From: {tx.from}
//               </span>
//               <span className="text-md ">
//                 To: {tx.to}
//               </span>
//             </div>
//             <div className="flex flex-col items-end">
//               <span className="text-gray-300">
//                 {parseFloat(tx.value) / 1e18} ETH
//               </span>
//               <span className="text-xs text-gray-500">
//                 {new Date(tx.timeStamp * 1000).toLocaleString()}
//               </span>
//               <span className="text-xs text-gray-500">
//                 Gas Used: {tx.gasUsed}
//               </span>
//               <span className="text-xs text-gray-500">
//                 Gas Price: {parseFloat(tx.gasPrice) / 1e9} Gwei
//               </span>
              
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;
import React from 'react';

const TransactionList = ({ 
  title, 
  transactions, 
  titleStyle = '', 
  borderStyle = '', 
  networkName 
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 border ${borderStyle} shadow-lg`}>
        <h3 className={`text-2xl font-bold mb-4 ${titleStyle}`}>{title}</h3>
        <p className="text-gray-400 text-center">No transactions found</p>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border ${borderStyle} shadow-lg`}>
      <h3 className={`text-2xl font-bold mb-6 ${titleStyle}`}>{title}</h3>
      <ul className="space-y-4">
        {transactions.map((tx, index) => (
          <li
            key={`${tx.hash}-${index}`}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 py-4"
          >
            <div className="flex flex-col mb-2 sm:mb-0">
              <span className={`text-sm font-semibold mb-1 ${tx.txreceipt_status === '1' ? 'text-green-400' : 'text-red-400'}`}>
                {tx.txreceipt_status === '1' ? 'Success' : 'Failed'}
              </span>
              <span className="text-sm text-gray-300 mb-1">
                From: <span className="font-mono">{tx.from.slice(0, 6)}...{tx.from.slice(-4)}</span>
              </span>
              <span className="text-sm text-gray-300">
                To: <span className="font-mono">{tx.to.slice(0, 6)}...{tx.to.slice(-4)}</span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-semibold text-gray-100 mb-1">
                {parseFloat(tx.value) / 1e18} ETH
              </span>
              <span className="text-xs text-gray-400 mb-1">
                {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">
                Gas: {tx.gasUsed} @ {(parseFloat(tx.gasPrice) / 1e9).toFixed(2)} Gwei
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;


