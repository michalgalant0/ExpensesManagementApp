package com.example.ExpensesApp.models;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class TransactionDTO {
    private int id;
    private String title;
    private double amount;
    private String currencyCode;
    private String date;
    private String categoryName;
    private String description;
    private int personId;
}
