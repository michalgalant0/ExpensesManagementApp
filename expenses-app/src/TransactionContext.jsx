import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: 'tit1',
      category: 'cat1',
      date: '20.05.2023',
      amount: '120',
      currency: 'PLN',
      comment: 'some comment'
    },
    {
      id: 2,
      title: 'tit2',
      category: 'cat1',
      date: '01.06.2023',
      amount: '1209',
      currency: 'GBP',
      comment: 'some comment'
    },
    {
      id: 3,
      title: 'tit1',
      category: 'cat2',
      date: '19.06.2023',
      amount: '40',
      currency: 'PLN',
      comment: 'some comment'
    },
    {
      id: 4,
      title: 'tit1',
      category: 'cat3',
      date: '23.06.2023',
      amount: '5',
      currency: 'EUR',
      comment: 'some comment'
    }
  ]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  const editTransaction = (id, updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === id) {
        return { ...transaction, ...updatedTransaction };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
