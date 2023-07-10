import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import TransactionsPage from './views/TransactionsPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';

import { TransactionProvider } from './contexts/TransactionContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

function App() {
  const person = sessionStorage.getItem('person_id');

  return (
      <Router>
        {person && <Navbar />}
          {person ? (
            <TransactionProvider>
            <CategoryProvider>
            <CurrencyProvider>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/transactions' element={<TransactionsPage />} />
              </Routes>
            </CurrencyProvider>
            </CategoryProvider>
            </TransactionProvider>
          ) : (
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
          )}
      </Router>
  );
}

export default App;
