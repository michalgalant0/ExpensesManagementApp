// import React from 'react';

// const TransactionListRow = ({
//   transaction,
//   deleteTransaction,
//   handleEdit,
//   isEdited,
//   editedTransaction,
// }) => {
//   const handleDelete = () => {
//     deleteTransaction(transaction.id);
//   };

//   const handleEditClick = () => {
//     handleEdit(transaction);
//   };

//   return (
//     <tr className={isEdited ? 'edited' : ''}>
//       <td>{transaction.id}</td>
//       <td>{transaction.title}</td>
//       <td>{transaction.category}</td>
//       <td>{transaction.date}</td>
//       <td>{transaction.amount}</td>
//       <td>{transaction.currency}</td>
//       <td>{transaction.comment}</td>
//       <td>
//         <button onClick={handleEditClick}>Edit</button>
//         <button onClick={handleDelete}>Delete</button>
//       </td>
//     </tr>
//   );
// };

// export default TransactionListRow;

import React from 'react';

const TransactionListRow = ({
  transaction,
  deleteTransaction,
  editTransaction,
}) => {
  const handleDelete = () => {
    deleteTransaction(transaction.id);
  };

  const handleEditClick = () => {
    editTransaction(transaction.id, {
      ...transaction,
    });
  };

  return (
    <tr>
      <td>{transaction.id}</td>
      <td>{transaction.title}</td>
      <td>{transaction.category}</td>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.currency}</td>
      <td>{transaction.comment}</td>
      <td>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default TransactionListRow;
