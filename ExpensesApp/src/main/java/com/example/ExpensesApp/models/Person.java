package com.example.ExpensesApp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "person")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_id")
    private int personId;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
}
