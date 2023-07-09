package com.example.ExpensesApp.controllers;

import com.example.ExpensesApp.models.Category;
import com.example.ExpensesApp.models.Currency;
import com.example.ExpensesApp.models.Transaction;
import com.example.ExpensesApp.models.TransactionDTO;
import com.example.ExpensesApp.repositories.CategoryRepository;
import com.example.ExpensesApp.repositories.CurrencyRepository;
import com.example.ExpensesApp.repositories.TransactionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    private TransactionRepository repository;
    private CurrencyRepository currencyRepository;
    private CategoryRepository categoryRepository;

    public TransactionController (
            TransactionRepository repository,
            CurrencyRepository currencyRepository,
            CategoryRepository categoryRepository) {
        this.repository = repository;
        this.currencyRepository = currencyRepository;
        this.categoryRepository = categoryRepository;
    }

    // send list of converted transactions (id->name/code) to client
    @GetMapping("/list/{person_id}")
    public List<TransactionDTO> getPersonTransactions (@PathVariable("person_id") int personId) {
        List<Transaction> transactions = this.repository.findByPersonId(personId)
                .orElseThrow(() -> new RuntimeException(
                        String.format("no transactions found for person %s", personId)
                ));

        return mapTransactionsToDTOs(transactions);
    }

    // add new transaction (name/code->id) to database
    @PostMapping
    public Transaction addTransaction (@RequestBody TransactionDTO newTransactionDTO) {
        Transaction newTransaction = mapDTOToTransaction(newTransactionDTO);
        return this.repository.save(newTransaction);
    }

    // send converted transaction (id->name/code) to client
    @GetMapping("/{transaction_id}")
    public TransactionDTO getTransaction (@PathVariable("transaction_id") int transactionId) {
        Transaction transaction = this.repository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException(
                        String.format("no transaction %s found", transactionId)
                ));

        return mapTransactionToDTO(transaction);
    }

    // get transactions id and remove it from database
    @DeleteMapping("/{transaction_id}")
    public void deleteTransaction (@PathVariable("transaction_id") int transaction_id) {
        this.repository.deleteById(transaction_id);
    }

    // update transaction with given id to given form (require conversion name->id)
    // if transaction with this id doesnt exist it will add new
    @PutMapping("/{transaction_id}")
    public Transaction updateTransaction (@PathVariable("transaction_id") int transactionId, @RequestBody TransactionDTO newTransactionDTO) {
        return this.repository.findById(transactionId).map(transaction -> {
            // id is the same
            transaction.setTitle(newTransactionDTO.getTitle());
            transaction.setAmount(newTransactionDTO.getAmount());
            transaction.setCurrencyId(
                    this.currencyRepository.findByCode(newTransactionDTO.getCurrencyCode())
                            .orElseThrow(() -> new RuntimeException("currency not found"))
                            .getCurrencyId()
            );
            transaction.setDate(newTransactionDTO.getDate());
            transaction.setCategoryId(
                    this.categoryRepository.findByName(newTransactionDTO.getCategoryName())
                            .orElseThrow(() -> new RuntimeException("category not found"))
                            .getCategoryId()
            );
            transaction.setDescription(newTransactionDTO.getDescription());
            // person_id is unchangeable
            return this.repository.save(transaction);
        }).orElseGet(() -> {
            newTransactionDTO.setTransactionId(transactionId);
            return this.repository.save(mapDTOToTransaction(newTransactionDTO));
        });
    }

    // map Transaction (backend/database) object to TransactionDTO (frontend) object
    private TransactionDTO mapTransactionToDTO (Transaction transaction) {
        TransactionDTO transactionDTO = new TransactionDTO();

        transactionDTO.setTransactionId(transaction.getTransactionId());
        transactionDTO.setTitle(transaction.getTitle());
        transactionDTO.setAmount(transaction.getAmount());
        transactionDTO.setDate(transaction.getDate());

        // get currency code to save in object
        Currency currency = this.currencyRepository.findById(transaction.getCurrencyId())
                .orElseThrow(() -> new RuntimeException("currency not found"));
        transactionDTO.setCurrencyCode(currency.getCode());

        // get category name to save in object
        Category category = this.categoryRepository.findById(transaction.getCategoryId())
                .orElseThrow(() -> new RuntimeException("category not found"));
        transactionDTO.setCategoryName(category.getName());

        transactionDTO.setDescription(transaction.getDescription());
        transactionDTO.setPersonId(transaction.getPersonId());

        return transactionDTO;
    }

    // map TransactionDTO (frontend) object to Transaction (backend/database) object
    private Transaction mapDTOToTransaction (TransactionDTO transactionDTO) {
        Transaction transaction = new Transaction();

        transaction.setTransactionId(transactionDTO.getTransactionId());
        transaction.setTitle(transactionDTO.getTitle());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setDate(transactionDTO.getDate());

        // get currency id by its code
        Currency currency = this.currencyRepository.findByCode(transactionDTO.getCurrencyCode())
                .orElseThrow(() -> new RuntimeException("currency not found"));
        transaction.setCurrencyId(currency.getCurrencyId());

        // get category id by its name
        Category category = this.categoryRepository.findByName(transactionDTO.getCategoryName())
                .orElseThrow(() -> new RuntimeException("category not found"));
        transaction.setCategoryId(category.getCategoryId());

        transaction.setDescription(transactionDTO.getDescription());
        transaction.setPersonId(transactionDTO.getPersonId());

        return transaction;
    }

    // map list of transactions to list of DTOs (ready to work with on frontend)
    private List<TransactionDTO> mapTransactionsToDTOs (List<Transaction> transactions) {
        return transactions.stream()
                .map(this::mapTransactionToDTO)
                .collect(Collectors.toList());
    }

}
