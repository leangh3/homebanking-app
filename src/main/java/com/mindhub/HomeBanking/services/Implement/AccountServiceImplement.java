package com.mindhub.HomeBanking.services.Implement;


import com.mindhub.HomeBanking.dto.AccountDTO;
import com.mindhub.HomeBanking.models.Account;
import com.mindhub.HomeBanking.models.repositories.AccountRepository;
import com.mindhub.HomeBanking.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImplement implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void saveAccounts(Account account) {
        accountRepository.save(account);
    }

    @Override
    public List<AccountDTO> getAccountsDTO() {
        return accountRepository.findAll().stream().map(account -> new AccountDTO(account)).collect(Collectors.toList());
    }

    @Override
    public AccountDTO getAccountDTO(Long id) {
        return accountRepository.findById(id).map(account -> new AccountDTO(account)).orElse(null);

    }

    @Override
    public Account getAccountByName(String name) {
        return accountRepository.findByName(name);
    }

    @Override
    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }


}
