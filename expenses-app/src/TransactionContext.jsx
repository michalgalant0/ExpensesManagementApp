import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    // test dataSet
    {
      id: 1,
      title: 'Transaction 1',
      category: 'Category 1',
      date: '2023-06-28',
      amount: 100,
      currency: 'USD',
      comment: 'Comment 1',
    },
    {
      id: 2,
      title: 'Transaction 2',
      category: 'Category 2',
      date: '2023-06-27',
      amount: 200,
      currency: 'EUR',
      comment: 'Comment 2',
    },
    {
      id: 3,
      title: 'Transaction 3',
      category: 'Category 1',
      date: '2023-06-26',
      amount: 300,
      currency: 'USD',
      comment: 'Comment 3',
    },
    {
      id: 4,
      title: 'Transaction 4',
      category: 'Category 3',
      date: '2023-06-25',
      amount: 400,
      currency: 'GBP',
      comment: 'Comment 4',
    },
    {
      id: 5,
      title: 'Transaction 5',
      category: 'Category 2',
      date: '2023-06-24',
      amount: 500,
      currency: 'EUR',
      comment: 'Comment 5',
    },
  ]);

  const [editedTransaction, setEditedTransaction] = useState(null);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const editTransaction = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    setEditedTransaction(transactionToEdit);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
    setEditedTransaction(null);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        updateTransaction,
        editedTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
