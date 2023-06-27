import React, { useContext } from 'react';
import { TransactionContext } from '../../TransactionContext';

import TransactionListRow from '../TransactionListRow';

const TransactionList = () => {
  const { transactions, deleteTransaction, editTransaction } = useContext(TransactionContext);

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionListRow
              key={transaction.id}
              transaction={transaction}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
