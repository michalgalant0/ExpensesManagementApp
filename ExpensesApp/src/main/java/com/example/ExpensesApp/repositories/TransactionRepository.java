package com.example.ExpensesApp.repositories;

import com.example.ExpensesApp.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    Optional<List<Transaction>> findByPersonId (int personId);
}
