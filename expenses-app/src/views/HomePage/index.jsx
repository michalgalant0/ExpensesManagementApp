import React, { useContext } from 'react';

import { TransactionContext } from '../../TransactionContext';

import TransactionList from '../../components/TransactionList';

const HomePage = () => {
  const { transactions, deleteTransaction, editTransaction } = useContext(TransactionContext);

  return (
    <div>
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    </div>
  );
};

export default HomePage;
