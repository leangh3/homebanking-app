package com.mindhub.HomeBanking.services.Implement;


import com.mindhub.HomeBanking.models.Transaction;
import com.mindhub.HomeBanking.models.repositories.TransactionRepository;
import com.mindhub.HomeBanking.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImplement implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;


    @Override
    public void saveTransactions(Transaction transaction) {
        transactionRepository.save(transaction);
    }
}
