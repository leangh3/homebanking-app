package com.mindhub.HomeBanking.dto;

import com.mindhub.HomeBanking.models.Account;
import com.mindhub.HomeBanking.models.AccountType;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class AccountDTO {

    private long id;
    private String name;
    private LocalDateTime creationDate;
    private double balance;
    private AccountType type;
    private boolean isEnabled;

    private Set<TransactionDTO> Transaction = new HashSet<>();

    public AccountDTO(Account account) {
        this.id = account.getId();
        this.name = account.getName();
        this.creationDate = account.getCreationDate();
        this.balance = account.getBalance();
        this.type = account.getType();
        this.isEnabled = account.isEnabled();
        this.Transaction = account.getTransactions().stream().map(TransactionDTO::new).collect(Collectors.toSet());
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public Set<TransactionDTO> getTransaction() {
        return Transaction;
    }
}
