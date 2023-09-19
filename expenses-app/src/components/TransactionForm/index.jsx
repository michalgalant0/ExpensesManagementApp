import React, { useState, useEffect, useContext } from "react";

import { CategoryContext } from "../../contexts/CategoryContext";
import { CurrencyContext } from "../../contexts/CurrencyContext";

import TransactionValidator from "../../validators/TransactionValidator";

import "./styles.css";

const TransactionForm = ({
  addTransaction,
  editedTransaction,
  updateTransaction,
}) => {
  const categories = useContext(CategoryContext);
  const { currencies, getCurrencyName } = useContext(CurrencyContext);

  const [transaction, setTransaction] = useState({
    id: "",
    title: "",
    categoryName: "",
    date: "",
    amount: "",
    currencyCode: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

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

    // validation part
    const validationErrors = TransactionValidator(
      transaction,
      currencies,
      categories
    );

    if (Object.keys(validationErrors).length > 0)
      setValidationErrors(validationErrors);
    else {
      if (editedTransaction) {
        updateTransaction(transaction);
      } else {
        addTransaction(transaction);
      }

      setTransaction({
        id: "",
        title: "",
        categoryName: "",
        date: "",
        amount: 0.0,
        currencyCode: "",
        description: "",
      });
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {editedTransaction ? "Edit transaction" : "Add transaction"}
      </h2>
      {editedTransaction ? (
        <div>
          Edited transaction: {transaction.tmpId}
          <hr />
        </div>
      ) : (
        ""
      )}
      <div className="form-row">
        <label className="form-label">Title:</label>
        <input
          type="text"
          name="title"
          className="form-input"
          value={transaction.title}
          onChange={handleChange}
          // required
        />
        {validationErrors.title && (
          <p className="form-error">{validationErrors.title}</p>
        )}
      </div>
      <div className="form-row">
        <label className="form-label">Amount:</label>
        <input
          type="number"
          name="amount"
          className="form-input half-width"
          value={transaction.amount}
          onChange={handleChange}
          // required
        />
        {validationErrors.amount && (
          <p className="form-error">{validationErrors.amount}</p>
        )}
        <label className="form-label">Currency:</label>
        <select
          name="currencyCode"
          className="form-select half-width"
          value={transaction.currencyCode}
          onChange={handleChange}
          // required
        >
          <option value={null}>pick currency from list</option>
          {currencies.map((currency) => (
            <option
              key={`${currency.id}-${currency.code}`}
              value={currency.id}
              title={getCurrencyName(currency.code)}
            >
              {currency.code}
            </option>
          ))}
        </select>
        {validationErrors.currency && (
          <p className="form-error">{validationErrors.currency}</p>
        )}
      </div>
      <div className="form-row">
        <label className="form-label">Category:</label>
        <select
          name="categoryName"
          className="form-select"
          value={transaction.categoryName}
          onChange={handleChange}
          // required
        >
          <option value={null}>pick category from list</option>
          {categories.map((category) => (
            <option key={`${category.id}-${category.name}`} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {validationErrors.category && (
          <p className="form-error">{validationErrors.category}</p>
        )}
      </div>
      <div className="form-row">
        <label className="form-label">Date:</label>
        <input
          type="date"
          name="date"
          className="form-input"
          value={transaction.date}
          onChange={handleChange}
          // required
        />
        {validationErrors.date && (
          <p className="form-error">{validationErrors.date}</p>
        )}
      </div>
      <div className="form-row">
        <label className="form-label">Comment:</label>
        <textarea
          name="description"
          className="form-textarea"
          value={transaction.description}
          onChange={handleChange}
          // required
        ></textarea>
        {validationErrors.description && (
          <p className="form-error">{validationErrors.description}</p>
        )}
      </div>
      <button type="submit" className="form-button">
        {editedTransaction ? "Save" : "Add"}
      </button>
    </form>
  );
};

export default TransactionForm;
