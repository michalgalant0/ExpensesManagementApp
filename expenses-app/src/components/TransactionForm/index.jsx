import React, { useState, useEffect } from 'react';

const TransactionForm = ({ addTransaction, editedTransaction, updateTransaction }) => {
  const [transaction, setTransaction] = useState({
    id: '',
    title: '',
    category: '',
    date: '',
    amount: 0,
    currency: '',
    comment: '',
  });

  useEffect(() => {
    if (editedTransaction) {
      setTransaction(editedTransaction);
    }
  }, [editedTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedTransaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }

    setTransaction({
      id: '',
      title: '',
      category: '',
      date: '',
      amount: 0,
      currency: '',
      comment: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editedTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
      <label>
        ID:
        <input
          type="text"
          name="id"
          value={transaction.id}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={transaction.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={transaction.category}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="text"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Currency:
        <input
          type="text"
          name="currency"
          value={transaction.currency}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Comment:
        <input
          type="text"
          name="comment"
          value={transaction.comment}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{editedTransaction ? 'Save' : 'Add'}</button>
    </form>
  );
};

export default TransactionForm;
