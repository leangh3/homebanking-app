package com.mindhub.HomeBanking.dto;

import com.mindhub.HomeBanking.models.Transaction;
import com.mindhub.HomeBanking.models.TransactionType;

import java.time.LocalDateTime;

public class TransactionDTO {


    private long id;
    private TransactionType type;
    private double amount;
    private LocalDateTime date;
    private String description;
    private double balanceTransaction;

    public TransactionDTO() {
    }

    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.type = transaction.getType();
        this.amount = transaction.getAmount();
        this.description = transaction.getDescription();
        this.date = transaction.getDate();
        this.balanceTransaction = transaction.getBalanceTransaction();
    }

    public long getId() {
        return id;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setBalance(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime transactionDate) {
        this.date = date;
    }

    public double getBalanceTransaction() {
        return balanceTransaction;
    }

    public void setBalanceTransaction(double balanceTransaction) {
        this.balanceTransaction = balanceTransaction;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



}
