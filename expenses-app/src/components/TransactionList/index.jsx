import React, { useState } from "react";

import TransactionListRow from "../TransactionListRow";

import "./styles.css";

const TransactionList = ({ transactions, handleEdit, currencies }) => {
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // check if user is on HomePage
  const isHomePAge = window.location.pathname === "/";

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filterTransactions = (transaction) => {
    if (filterType === "all") {
      return true;
    } else if (filterType === "day") {
      return transaction.date === filterValue;
    } else if (filterType === "categoryName") {
      return transaction.categoryName
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    } else if (filterType === "title") {
      return transaction.title
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    } else if (filterType === "currencyCode") {
      return transaction.currencyCode
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    }
  };

  const sortedTransactions = transactions.sort((a, b) => {
    if (sortBy === "id") {
      return a.id - b.id;
    } else {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }
  });

  const filteredTransactions = sortedTransactions.filter(filterTransactions);

  return (
    <div>
      <h2 className="list-title">Transaction List</h2>
      <div className="filter-container">
        <label className="filter-label">Filter by:</label>
        <select
          className="filter-select"
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          <option value="all">All</option>
          <option value="day">Day</option>
          <option value="categoryName">Category</option>
          <option value="title">Title</option>
          <option value="currencyCode">Currency</option>
        </select>
        {filterType !== "all" && (
          <label className="filter-label">
            Value:
            <input
              className="filter-input"
              type="text"
              value={filterValue}
              onChange={handleFilterValueChange}
            />
          </label>
        )}
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("tmpId")} className="table-header">
              ID
            </th>
            <th onClick={() => handleSort("title")} className="table-header">
              Title{" "}
              {sortBy === "title" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th
              onClick={() => handleSort("categoryName")}
              className="table-header"
            >
              Category{" "}
              {sortBy === "categoryName" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("date")} className="table-header">
              Date{" "}
              {sortBy === "date" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("amount")} className="table-header">
              Amount{" "}
              {sortBy === "amount" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th
              onClick={() => handleSort("currencyCode")}
              className="table-header"
            >
              Currency{" "}
              {sortBy === "currencyCode" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th className="table-header">Comment</th>
            {isHomePAge ? null : <th className="table-header">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <TransactionListRow
              key={transaction.id}
              transaction={transaction}
              handleEdit={handleEdit}
              currencies={currencies}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
