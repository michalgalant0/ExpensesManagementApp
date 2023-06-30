import React, { useContext } from 'react';

import { TransactionContext } from '../../TransactionContext';

const TransactionListRow = ({ transaction, handleEdit }) => {
  const { deleteTransaction } = useContext(TransactionContext);

  // const handleEdit = () => {
  //   editTransaction(transaction.id);
  // }

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
      <td>{transaction.id}</td>
      <td>{transaction.title}</td>
      <td>{transaction.category}</td>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.currency}</td>
      <td>{transaction.comment}</td>
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
