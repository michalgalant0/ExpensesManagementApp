import React, { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

import TransactionList from "../../components/TransactionList";
import TransactionForm from "../../components/TransactionForm";

import "./styles.css";

const TransactionsPage = () => {
  const {
    transactions,
    addTransaction,
    editedTransaction,
    editTransaction,
    updateTransaction,
  } = useContext(TransactionContext);

  const handleEdit = (id) => {
    editTransaction(id);
  };

  return (
    <div className="transactions-page">
      <TransactionForm
        addTransaction={addTransaction}
        editedTransaction={editedTransaction}
        updateTransaction={updateTransaction}
        className="transaction-form"
      />
      <TransactionList
        transactions={transactions}
        handleEdit={handleEdit}
        className="transaction-list"
      />
    </div>
  );
};

export default TransactionsPage;
