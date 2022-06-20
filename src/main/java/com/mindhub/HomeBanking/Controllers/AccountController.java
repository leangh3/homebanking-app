package com.mindhub.HomeBanking.Controllers;


import com.mindhub.HomeBanking.Utils.Utils;
import com.mindhub.HomeBanking.dto.AccountDTO;
import com.mindhub.HomeBanking.models.Account;
import com.mindhub.HomeBanking.models.AccountType;
import com.mindhub.HomeBanking.models.Client;
import com.mindhub.HomeBanking.services.AccountService;
import com.mindhub.HomeBanking.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private ClientService clientService;

    @GetMapping("/accounts")
    public List<AccountDTO> getAccounts() {
        return accountService.getAccountsDTO();
    }

    @GetMapping("/accounts/{id}")
    public AccountDTO getAccountDTO(@PathVariable Long id, Authentication authentication) {
        Client client = clientService.getClientCurrent(authentication);
        Account account = accountService.getAccountById(id);
        if (!client.getAccounts().contains(account)) {
            return null;
        }

        if(!account.isEnabled()){
            return null;
        }

        return accountService.getAccountDTO(id);


    }


    @PostMapping(path = "/clients/current/accounts")
    public ResponseEntity<Object> createAccounts(@RequestParam AccountType type, Authentication authentication) {

        Client client = clientService.getClientCurrent(authentication);
        List<Account> accounts = client.getAccounts().stream().filter(account -> account.getType().equals(type)).collect(Collectors.toList());

        if (accounts.size() >= 2) {

            return new ResponseEntity<>("Cannot create more than 2 accounts of each type", HttpStatus.FORBIDDEN);
        }


        if (client.getAccounts().size() >= 3) {

            return new ResponseEntity<>("Cannot create more than 3 accounts", HttpStatus.FORBIDDEN);
        }



        Account account = new Account("VIN-" + Utils.getRandomNumber(10000000, 99999999), LocalDateTime.now(), 0, type, client);
        accountService.saveAccounts(account);

        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PatchMapping("/clients/current/accounts")
    public ResponseEntity<Object> disabledAccount(@RequestParam Long id, Authentication authentication){

        Account account = accountService.getAccountById(id);
        Client clientAuth = clientService.getClientCurrent(authentication);

        if(id == null){
            return new ResponseEntity<>("The account id doesn't exist", HttpStatus.FORBIDDEN);
        }

        if(account == null){
            return new ResponseEntity<>("The account doesn't exist",HttpStatus.FORBIDDEN);
        }

        if(!clientAuth.getAccounts().contains(account)){

            return new ResponseEntity<>("The account doesn't belong to an authenticated customer", HttpStatus.FORBIDDEN);
        }

        if(account.getBalance() > 0){
            return new ResponseEntity<>("Can't disabled an account with balance",HttpStatus.FORBIDDEN);
        }

        account.setEnabled(false);
        accountService.saveAccounts(account);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
