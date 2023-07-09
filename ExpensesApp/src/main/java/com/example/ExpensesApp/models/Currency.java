package com.example.ExpensesApp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "currency")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "currency_id")
    private int currencyId;
    @Column(name = "name")
    private String name;
    @Column(name = "code")
    private String code;
}
