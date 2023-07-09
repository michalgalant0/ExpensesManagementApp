package com.example.ExpensesApp.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class TransactionDTO {
    private int transactionId;
    private String title;
    private double amount;
    private String currencyCode;
    private String date;
    private String categoryName;
    private String description;
    private int personId;
}
