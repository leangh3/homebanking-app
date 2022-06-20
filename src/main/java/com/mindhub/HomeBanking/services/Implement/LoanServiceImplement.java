package com.mindhub.HomeBanking.services.Implement;


import com.mindhub.HomeBanking.dto.LoanDTO;
import com.mindhub.HomeBanking.models.Loan;
import com.mindhub.HomeBanking.models.repositories.LoanRepository;
import com.mindhub.HomeBanking.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanServiceImplement implements LoanService {

    @Autowired
    private LoanRepository loanRepository;


    @Override
    public List<LoanDTO> getLoanDTO() {
        return loanRepository.findAll().stream().map(loan -> new LoanDTO(loan)).collect(Collectors.toList());
    }

    @Override
    public Loan getLoanById(Long id) {
        return loanRepository.findById(id).orElse(null);
    }

    @Override
    public List<Loan> getLoans() {
        return loanRepository.findAll();
    }

    @Override
    public void saveLoans(Loan loan) {
        loanRepository.save(loan);
    }
}
