import React, { useContext } from "react";

import { TransactionContext } from "../../contexts/TransactionContext";

import TransactionList from "../../components/TransactionList";

import "./styles.css";

const HomePage = () => {
  const { transactions } = useContext(TransactionContext);
  const currentUserNickname = sessionStorage.getItem("nickname");

  return (
    <div className="home-page">
      <h2 className="list-title">Hi, {currentUserNickname}</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default HomePage;
