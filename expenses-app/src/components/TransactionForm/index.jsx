import React, { useState, useEffect, useContext } from 'react';
import { CategoryContext } from '../../contexts/CategoryContext';
import { CurrencyContext } from '../../contexts/CurrencyContext';

const TransactionForm = ({ addTransaction, editedTransaction, updateTransaction }) => {
  const categories = useContext(CategoryContext)
  const { currencies, getCurrencyName } = useContext(CurrencyContext)
  
  const [transaction, setTransaction] = useState({
    id: '',
    title: '',
    categoryName: '',
    date: '',
    amount: 0,
    currencyCode: '',
    description: '',
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
      categoryName: '',
      date: '',
      amount: 0,
      currencyCode: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editedTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
      {
        editedTransaction ?
          <div>
            Edited transaction: {transaction.tmpId}
            <hr />
          </div>
          : ''
      }
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
        <select
          name="categoryName"
          value={transaction.categoryName}
          onChange={handleChange}
          required
        >
          {categories.map(category => (
            // different way of key generating - removed error with non-unique keys
            <option key={`${category.id}-${category.name}`} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Currency:
        <select
          name="currencyCode"
          value={transaction.currencyCode}
          onChange={handleChange}
          required
        >
          {currencies.map(currency => (
            // different way of key generating - removed error with non-unique keys
            <option
              key={`${currency.id}-${currency.code}`}
              value={currency.id}
              title={getCurrencyName(currency.code)}
            >
              {currency.code}
            </option>
          ))}
        </select>
      </label>
      <label>
        Comment:
        <input
          type="text"
          name="description"
          value={transaction.description}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{editedTransaction ? 'Save' : 'Add'}</button>
    </form>
  );
};

export default TransactionForm;
