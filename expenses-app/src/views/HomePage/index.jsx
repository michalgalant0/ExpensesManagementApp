import React, { useContext } from 'react';

import { TransactionContext } from '../../TransactionContext';

import TransactionList from '../../components/TransactionList';

const HomePage = () => {
  const { transactions } = useContext(TransactionContext);

  return (
    <div>
      <TransactionList
        transactions={transactions}
      />
    </div>
  );
};

export default HomePage;
