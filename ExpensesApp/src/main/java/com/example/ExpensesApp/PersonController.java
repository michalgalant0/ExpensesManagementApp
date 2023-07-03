package com.example.ExpensesApp;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PersonController {
    private PersonRepository repository;

    public PersonController (PersonRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/api/register")
    Person save (@RequestBody Person newPerson) {
        return this.repository.save(newPerson);
    }

    // metoda zwroci id uzytkownika do zapisania w sessionStorage
    @PostMapping("/api/login")
    LoginResponse login (@RequestBody LoginRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();

        Person person = this.repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("user not found"));

        if (person.getPassword().equals(password))
            return new LoginResponse ((long) person.getPerson_id());
        else
            throw new RuntimeException("wrong login data");
    }
}
