package com.example.ExpensesApp.repositories;

import com.example.ExpensesApp.models.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CurrencyRepository extends JpaRepository<Currency, Integer> {
    Optional<Currency> findByCode (String code);
}
