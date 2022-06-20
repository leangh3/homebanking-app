package com.mindhub.HomeBanking.services.Implement;


import com.mindhub.HomeBanking.models.ClientLoan;
import com.mindhub.HomeBanking.models.repositories.ClientLoanRepository;
import com.mindhub.HomeBanking.services.ClientLoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientLoanServiceImplement implements ClientLoanService {

    @Autowired
    private ClientLoanRepository clientLoanRepository;


    @Override
    public void saveClientLoan(ClientLoan clientLoan) {
        clientLoanRepository.save(clientLoan);
    }
}
