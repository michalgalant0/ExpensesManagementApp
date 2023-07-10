import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [editedTransaction, setEditedTransaction] = useState(null)

  useEffect(() => {
    const personId = sessionStorage.getItem('person_id');
    if (personId) {
      fetchTransactions(personId);
    }
  }, [])

  const fetchTransactions = async (personId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/transaction/list/${personId}`)
      setTransactions(
        response.data.map((transaction, index) => ({
          ...transaction,
          id: transaction.id,
          tmpId: index+1,
        }))
      )
    } catch (error) {
      console.error(`Error fetching transactions: ${error}`)
    }
  }

  const addTransaction = async (transaction) => {
    console.log("ADD TRANSACTION DATA")
    console.log(transaction)
    try {
      const response = await axios.post('http://localhost:8080/api/transaction', transaction);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error(`Error adding transaction: ${error}`);
    }
  }

  const deleteTransaction = async (id) => {
    console.log("DELETE TRANSACTION DATA")
    console.log(id)
    try {
      await axios.delete(`http://localhost:8080/api/transaction/${id}`);
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error(`Error deleting transaction: ${error}`);
    }
  }

  const editTransaction = (id) => {
    console.log("EDIT TRANSACTION DATA")
    console.log(id)
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    setEditedTransaction(transactionToEdit);
  }

  const updateTransaction = async (updatedTransaction) => {
    console.log("UPDATE TRANSACTION DATA")
    console.log(updatedTransaction)
    try {
      const response = await axios.put(`http://localhost:8080/api/transaction/${updatedTransaction.id}`, updatedTransaction);
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === updatedTransaction.id ? response.data : transaction
        )
      );
      setEditedTransaction(null);
    } catch (error) {
      console.error(`Error updating transaction: ${error}`);
    }
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
