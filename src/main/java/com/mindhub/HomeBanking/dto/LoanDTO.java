package com.mindhub.HomeBanking.dto;


import com.mindhub.HomeBanking.models.Loan;
import com.mindhub.HomeBanking.models.LoanType;

import java.util.ArrayList;
import java.util.List;

public class LoanDTO {

    private long id;
    private LoanType name;
    private double maxAmount;
    private List<Integer> payments = new ArrayList<>();


    public LoanDTO() {
    }

    public LoanDTO(Loan loan){

        this.id = loan.getId();
        this.name = loan.getName();
        this.maxAmount = loan.getMaxAmount();
        this.payments = loan.getPayments();


    }

    public long getId() {
        return id;
    }

    public LoanType getName() {
        return name;
    }

    public void setName(LoanType name) {
        this.name = name;
    }

    public double getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(double maxAmount) {
        this.maxAmount = maxAmount;
    }

    public List<Integer> getPayments() {
        return payments;
    }

    public void setPayments(List<Integer> payments) {
        this.payments = payments;
    }


}
