import React from 'react';

import TransactionListRow from '../TransactionListRow';

const TransactionList = ({ transactions, handleEdit, currencies }) => {
  const [filterType, setFilterType] = React.useState('all');
  const [filterValue, setFilterValue] = React.useState('');
  const [sortBy, setSortBy] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState('asc');

  // check if user is on HomePage
  const isHomePAge = window.location.pathname === '/';

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filterTransactions = (transaction) => {
    if (filterType === 'all') {
      return true;
    } else if (filterType === 'day') {
      return transaction.date === filterValue;
    } else if (filterType === 'categoryName') {
      return transaction.categoryName.toLowerCase().includes(filterValue.toLowerCase());
    } else if (filterType === 'title') {
      return transaction.title.toLowerCase().includes(filterValue.toLowerCase());
    } else if (filterType === 'currencyCode') {
      return transaction.currencyCode.toLowerCase().includes(filterValue.toLowerCase());
    }
  };

  const sortedTransactions = transactions.sort((a, b) => {
    if (sortBy === 'id') {
      return a.id - b.id;
    } else {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    }
  });

  const filteredTransactions = sortedTransactions.filter(filterTransactions);

  return (
    <div>
      <h2>Transaction List</h2>
      <div>
        <label>
          Filter by:
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="all">All</option>
            <option value="day">Day</option>
            <option value="categoryName">Category</option>
            <option value="title">Title</option>
            <option value="currencyCode">Currency</option>
          </select>
        </label>
        {filterType !== 'all' && (
          <label>
            Value:
            <input type="text" value={filterValue} onChange={handleFilterValueChange} />
          </label>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={handleSort.bind(null, 'tmpId')}>ID</th>
            <th onClick={() => handleSort('title')}>
              Title {sortBy === 'title' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('categoryName')}>
              Category {sortBy === 'categoryName' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('date')}>
              Date {sortBy === 'date' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('amount')}>
              Amount {sortBy === 'amount' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => handleSort('currencyCode')}>
              Currency {sortBy === 'currencyCode' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th>Comment</th>
            {isHomePAge ? null : <th>Actions</th>}
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
