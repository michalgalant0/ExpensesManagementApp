import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [editedTransaction, setEditedTransaction] = useState(null)

  useEffect(() => {
    const fetchTransaciotns = async () => {
      try {
        const personId = sessionStorage.getItem('person_id')
        const response = await axios.get(`http://localhost:8080/api/transactions/${personId}`)
        setTransactions(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(`Error fetching transactions: ${error}`)
      }
    }

    fetchTransaciotns()
  }, [])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
  }

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    )
    setTransactions(updatedTransactions)
  }

  const editTransaction = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id)
    setEditedTransaction(transactionToEdit)
  }

  const updateTransaction = (updatedTransaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    )
    setEditedTransaction(null)
  }

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
  )
}
