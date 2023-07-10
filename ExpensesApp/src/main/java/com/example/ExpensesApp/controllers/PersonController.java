package com.example.ExpensesApp.controllers;

import com.example.ExpensesApp.models.LoginRequest;
import com.example.ExpensesApp.models.LoginResponse;
import com.example.ExpensesApp.models.Person;
import com.example.ExpensesApp.repositories.PersonRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonController {
    private PersonRepository repository;

    public PersonController (PersonRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/register")
    public Person register (@RequestBody Person newPerson) {
        return this.repository.save(newPerson);
    }

    // metoda zwroci id uzytkownika do zapisania w sessionStorage
    @PostMapping("/login")
    public LoginResponse login (@RequestBody LoginRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();

        Person person = this.repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("user not found"));

        if (person.getPassword().equals(password))
            return new LoginResponse (person.getPersonId());
        else
            throw new RuntimeException("wrong login data");
    }
}
