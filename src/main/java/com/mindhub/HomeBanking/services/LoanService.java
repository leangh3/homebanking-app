package com.mindhub.HomeBanking.services;

import com.mindhub.HomeBanking.dto.LoanDTO;
import com.mindhub.HomeBanking.models.Loan;

import java.util.List;

public interface LoanService {


    List<LoanDTO> getLoanDTO();
    Loan getLoanById(Long id);
    List<Loan> getLoans();
    void saveLoans(Loan loan);
}
