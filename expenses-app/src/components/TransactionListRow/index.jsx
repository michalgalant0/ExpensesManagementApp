import React, { useContext } from "react";

import { TransactionContext } from "../../contexts/TransactionContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";

import "./styles.css";

const TransactionListRow = ({ transaction, handleEdit }) => {
  const { deleteTransaction } = useContext(TransactionContext);
  const { getCurrencyName } = useContext(CurrencyContext);

  const handleDelete = () => {
    var messageString = `are you sure you want to delete transaction ${transaction.title}?`;
    const confirmDelete = window.confirm(messageString);
    if (confirmDelete) deleteTransaction(transaction.id);
  };

  // check if user is on HomePage
  const isHomePage = window.location.pathname === "/";

  return (
    <tr className="transaction-row">
      <td className="transaction-data">{transaction.tmpId}</td>
      <td className="transaction-data">{transaction.title}</td>
      <td className="transaction-data">{transaction.categoryName}</td>
      <td className="transaction-data">{transaction.date}</td>
      <td className="transaction-data">{transaction.amount}</td>
      <td
        className="transaction-data"
        title={getCurrencyName(transaction.currencyCode)}
      >
        {transaction.currencyCode}
      </td>
      <td className="transaction-data">{transaction.description}</td>
      {isHomePage ? null : (
        <td className="transaction-actions">
          <button onClick={() => handleEdit(transaction.id)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </td>
      )}
    </tr>
  );
};

export default TransactionListRow;
