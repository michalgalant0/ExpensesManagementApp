import React from 'react';

import TransactionListRow from '../TransactionListRow';

const TransactionList = ({ transactions, handleEdit }) => {
  
  // check if user is on HomePage
  const isHomePAge = window.location.pathname === '/';

  return (
    <div>
      <h2>Transaction List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Comment</th>
            {isHomePAge ? null : <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionListRow
              key={transaction.id}
              transaction={transaction}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
