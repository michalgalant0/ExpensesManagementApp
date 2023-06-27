import React, { useState, useContext } from 'react';
import { TransactionContext } from '../../TransactionContext';

import TransactionList from '../../components/TransactionList';
import TransactionForm from '../../components/TransactionForm';

const TransactionsPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(null);

  const { transactions, addTransaction, deleteTransaction, editTransaction } = useContext(TransactionContext);

  const handleEdit = (transaction) => {
    setEditMode(true);
    setEditedTransaction(transaction);
  };

  const handleSave = (updatedTransaction) => {
    editTransaction(editedTransaction.id, updatedTransaction);
    setEditMode(false);
    setEditedTransaction(null);
  };

  return (
    <div>
      <TransactionForm
        addTransaction={addTransaction}
        editMode={editMode}
        editedTransaction={editedTransaction}
        handleSave={handleSave}
      />
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        handleEdit={handleEdit}
        editMode={editMode}
        editedTransaction={editedTransaction}
      />
    </div>
  );
};

export default TransactionsPage;
