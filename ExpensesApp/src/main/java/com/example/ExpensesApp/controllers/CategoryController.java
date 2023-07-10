package com.example.ExpensesApp.controllers;

import com.example.ExpensesApp.models.Category;
import com.example.ExpensesApp.repositories.CategoryRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    private CategoryRepository repository;

    public CategoryController (CategoryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Category> getCategories () {
        return this.repository.findAll();
    }
}
