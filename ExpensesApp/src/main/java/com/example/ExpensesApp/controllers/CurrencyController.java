package com.example.ExpensesApp.controllers;

import com.example.ExpensesApp.models.Currency;
import com.example.ExpensesApp.repositories.CurrencyRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/currency")
@CrossOrigin(origins = "http://localhost:3000")
public class CurrencyController {
    private CurrencyRepository repository;

    public CurrencyController (CurrencyRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Currency> getCurrencies () {
        return this.repository.findAll();
    }
}
