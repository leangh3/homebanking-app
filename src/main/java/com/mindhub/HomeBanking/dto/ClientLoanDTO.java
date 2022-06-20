package com.mindhub.HomeBanking.dto;

import com.mindhub.HomeBanking.models.ClientLoan;
import com.mindhub.HomeBanking.models.LoanType;

public class ClientLoanDTO {

    private long id;
    private long loanId;
    private LoanType name;
    private int payments;
    private double amount;

    public ClientLoanDTO() {
    }

    public ClientLoanDTO(ClientLoan clientLoan) {
        this.id = clientLoan.getId();
        this.loanId = clientLoan.getLoan().getId();
        this.name = clientLoan.getLoan().getName();
        this.payments = clientLoan.getPayments();
        this.amount = clientLoan.getAmount();
    }

    public long getId() {
        return id;
    }

    public long getLoanId() {
        return loanId;
    }

    public LoanType getName() {
        return name;
    }

    public void setName(LoanType name) {
        this.name = name;
    }

    public int getPayments() {
        return payments;
    }

    public void setPayments(int payments) {
        this.payments = payments;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        amount = amount;
    }
}
