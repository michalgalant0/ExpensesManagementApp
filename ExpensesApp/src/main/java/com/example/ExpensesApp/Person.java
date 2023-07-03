package com.example.ExpensesApp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Person {
    @Id @GeneratedValue
    private int person_id;
    private String nickname;
    private String email;
    private String password;
}
