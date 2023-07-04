package com.example.ExpensesApp;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    private TransactionRepository repository;

    public TransactionController (TransactionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/transactions/{person_id}")
    List<Transaction> getPersonTransactions (@PathVariable("person_id") int personId) {
        return this.repository.findByPersonId(personId)
                .orElseThrow(() -> new RuntimeException(
                        String.format("no transactions found for person %s", personId)
                ));
    }

    @PostMapping("/api/transaction")
    Transaction addTransaction (@RequestBody Transaction newTransaction) {
        return this.repository.save(newTransaction);
    }

    @GetMapping("/api/transaction/{id}")
    Transaction getTransaction (@PathVariable("id") int transactionId) {
        return this.repository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException(
                        String.format("no transaction %s found", transactionId)
                ));
    }

    @DeleteMapping("/api/transaction/{id}")
    void deleteTransaction (@PathVariable("id") int transaction_id) {
        this.repository.deleteById(transaction_id);
    }

    @PutMapping("/api/transaction/{id}")
    Transaction updateTransaction (@PathVariable("id") int transactionId, @RequestBody Transaction newTransaction) {
        return this.repository.findById(transactionId).map(transaction -> {
            // id is the same
            transaction.setTitle(newTransaction.getTitle());
            transaction.setAmount(newTransaction.getAmount());
            transaction.setCurrencyId(newTransaction.getCurrencyId());
            transaction.setDate(newTransaction.getDate());
            transaction.setCategoryId(newTransaction.getCategoryId());
            transaction.setDescription(newTransaction.getDescription());
            // person_id is unchangeable
            return this.repository.save(transaction);
        }).orElseGet(() -> {
            newTransaction.setTransactionId(transactionId);
            return this.repository.save(newTransaction);
        });
    }

}
