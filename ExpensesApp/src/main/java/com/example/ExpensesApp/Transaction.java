package com.example.ExpensesApp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionId;
    @Column(name = "title")
    private String title;
    @Column(name = "amount")
    private float amount;
    @Column(name = "currency_id")
    private int currencyId;
    @Column(name = "date")
    private String date;
    @Column(name = "category_id")
    private int categoryId;
    @Column(name = "description")
    private String description;
    @Column(name = "person_id")
    private int personId;
}
