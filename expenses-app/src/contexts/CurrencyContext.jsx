import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [ currencies, setCurrencies ] = useState([])

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/currency`)
      console.log(response.data)
      setCurrencies(response.data)
    } catch (error) {
      console.error(`Error fetching currencies: ${error}`)
    }
  }

  const getCurrencyName = (currencyCode) => {
    const currency = currencies.find((c) => c.code === currencyCode)
    return currency ? currency.name : ''
  }

  return (
    <CurrencyContext.Provider value={{ currencies, getCurrencyName }} >
      {children}
    </CurrencyContext.Provider>
  )
}
