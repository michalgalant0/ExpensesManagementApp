package com.example.ExpensesApp.repositories;

import com.example.ExpensesApp.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    Optional<Person> findByEmail (String email);
}
