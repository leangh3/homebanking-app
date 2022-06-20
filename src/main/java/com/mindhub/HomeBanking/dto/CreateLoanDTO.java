package com.mindhub.HomeBanking.dto;

import com.mindhub.HomeBanking.models.LoanType;

import java.util.ArrayList;
import java.util.List;

public class CreateLoanDTO {


    private LoanType name;
    private double maxAmount;
    private List<Integer> payments = new ArrayList<>();


    public CreateLoanDTO() {
    }

    public CreateLoanDTO(LoanType name, double maxAmount, List<Integer> payments) {
        this.name = name;
        this.maxAmount = maxAmount;
        this.payments = payments;

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
