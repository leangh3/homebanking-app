package com.mindhub.HomeBanking.services;

import com.mindhub.HomeBanking.dto.AccountDTO;
import com.mindhub.HomeBanking.models.Account;
import com.mindhub.HomeBanking.models.Client;

import java.util.List;

public interface AccountService {

    void saveAccounts(Account account);
    List<AccountDTO> getAccountsDTO();
    AccountDTO getAccountDTO(Long id);
    Account getAccountByName(String name);
    Account getAccountById (Long id);
}
