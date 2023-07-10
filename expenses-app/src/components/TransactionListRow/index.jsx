import React, { useContext } from 'react';

import { TransactionContext } from '../../contexts/TransactionContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';

const TransactionListRow = ({ transaction, handleEdit }) => {
  const { deleteTransaction } = useContext(TransactionContext);
  const { getCurrencyName } = useContext(CurrencyContext);

  const handleDelete = () => {
    var messageString = `are you sure you want to delete transaction ${transaction.title}?`
    const confirmDelete = window.confirm(messageString)
    if (confirmDelete)
      deleteTransaction(transaction.id);
  };

  // check if user is on HomePage
  const isHomePAge = window.location.pathname === '/';

  return (
    <tr>
      <td>{transaction.tmpId}</td>
      <td>{transaction.title}</td>
      <td>{transaction.categoryName}</td>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
      <td
        title={getCurrencyName(transaction.currencyCode)}
      >
        {transaction.currencyCode}
      </td>
      <td>{transaction.description}</td>
      {
      isHomePAge ? null : 
        <td>
          <button onClick={() => handleEdit(transaction.id)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </td>
      }
    </tr>
  );
};

export default TransactionListRow;
