import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import TransactionsPage from './views/TransactionsPage';

import './App.css';

import { TransactionProvider } from './TransactionContext';

function App() {
  return (
    <TransactionProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/transactions"
              element={<TransactionsPage />}
            />
          </Routes>
        </div>
      </Router>
    </TransactionProvider>
  );
}

export default App;
