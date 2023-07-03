package com.example.ExpensesApp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Transaction {
    @Id @GeneratedValue
    private Long transaction_id;
    private String title;
    private float amount;
    private Long currencyId;
    private String date;
    private Long categoryId;
    private String description;
    private Long userId;
}
