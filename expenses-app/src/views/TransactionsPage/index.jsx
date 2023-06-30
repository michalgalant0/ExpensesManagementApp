import React, { useContext } from 'react';
import { TransactionContext } from '../../TransactionContext';

import TransactionList from '../../components/TransactionList';
import TransactionForm from '../../components/TransactionForm';

const TransactionsPage = () => {
  const { transactions, addTransaction, editedTransaction, editTransaction, updateTransaction } = useContext(TransactionContext);

  const handleEdit = (id) => {
    editTransaction(id);
  }

  return (
    <div>
      <TransactionForm
        addTransaction={addTransaction}
        editedTransaction={editedTransaction}
        updateTransaction={updateTransaction}
      />
      <TransactionList
        transactions={transactions}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default TransactionsPage;