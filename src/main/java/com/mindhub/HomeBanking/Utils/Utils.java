package com.mindhub.HomeBanking.Utils;

import com.mindhub.HomeBanking.dto.LoanApplicationDTO;
import com.mindhub.HomeBanking.models.Loan;

public class Utils {

    private static double loanPlusinterest;

    public static int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    public static double intsPLus(Loan loan, LoanApplicationDTO loanApplicationDTO){

        if(loan.getId() == 1 && loanApplicationDTO.getPayments() == 6){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.2 / 12 * 6));
        }
        if(loan.getId() == 2 && loanApplicationDTO.getPayments() == 6){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.1 / 12 * 6));
        }
        if(loan.getId() == 3 && loanApplicationDTO.getPayments() == 6){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.15 / 12 * 6));
        }

        if(loan.getId() == 1 && loanApplicationDTO.getPayments() == 12){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * 0.2);
        }
        if(loan.getId() == 2 && loanApplicationDTO.getPayments() == 12){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * 0.1);
        }
        if(loan.getId() == 3 && loanApplicationDTO.getPayments() == 12){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * 0.15);
        }

        if(loan.getId() == 1 && loanApplicationDTO.getPayments() == 24){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.2 / 12 * 24));
        }
        if(loan.getId() == 2 && loanApplicationDTO.getPayments() == 24){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.1 / 12 * 24));
        }
        if(loan.getId() == 3 && loanApplicationDTO.getPayments() == 24){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.15 / 12 * 24));
        }

        if(loan.getId() == 1 && loanApplicationDTO.getPayments() == 36){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.2 / 12 * 36));
        }
        if(loan.getId() == 2 && loanApplicationDTO.getPayments() == 36){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.1 / 12 * 36));
        }
        if(loan.getId() == 3 && loanApplicationDTO.getPayments() == 36){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.15 / 12 * 36));
        }

        if(loan.getId() == 1 && loanApplicationDTO.getPayments() == 48){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.2 / 12 * 48));
        }
        if(loan.getId() == 2 && loanApplicationDTO.getPayments() == 48){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.1 / 12 * 48));
        }
        if(loan.getId() == 3 && loanApplicationDTO.getPayments() == 48){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.15 / 12 * 48));
        }

        if(loan.getId() == 1 && loanApplicationDTO.getPayments() == 60){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.2 / 12 * 60));
        }
        if(loan.getId() == 2 && loanApplicationDTO.getPayments() == 60){
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.1 / 12 * 60));
        }
        if(loan.getId() == 3 && loanApplicationDTO.getPayments() == 60) {
            loanPlusinterest = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * (0.15 / 12 * 60));
        }

        return loanPlusinterest;
    }

}
