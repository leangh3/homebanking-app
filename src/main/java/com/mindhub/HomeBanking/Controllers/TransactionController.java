package com.mindhub.HomeBanking.Controllers;

import com.mindhub.HomeBanking.models.*;
import com.mindhub.HomeBanking.services.AccountService;
import com.mindhub.HomeBanking.services.CardService;
import com.mindhub.HomeBanking.services.ClientService;
import com.mindhub.HomeBanking.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private CardService cardService;

    @Transactional
    @PostMapping(path = "/transactions")
    public ResponseEntity<Object> createTransactions(
            Authentication authentication, @RequestParam double amount,
            @RequestParam String description, @RequestParam String fromAccount,
            @RequestParam String toAccount) {

        Client client = clientService.getClientCurrent(authentication);
        Account targetAccount = accountService.getAccountByName(toAccount);
        Account sourceAccount = accountService.getAccountByName(fromAccount);

        if (description.isEmpty() || fromAccount.isEmpty() || toAccount.isEmpty()) {

            return new ResponseEntity<>("Missing data", HttpStatus.FORBIDDEN);
        }

        if (amount <= 0) {

            return new ResponseEntity<>("You can't transfer negative amounts", HttpStatus.FORBIDDEN);
        }

        if (fromAccount.equals(toAccount)) {

            return new ResponseEntity<>("Accounts are the same", HttpStatus.FORBIDDEN);
        }

        if (accountService.getAccountByName(fromAccount) == null) {

            return new ResponseEntity<>("Source account doesn't exist", HttpStatus.FORBIDDEN);
        }

        if (!sourceAccount.isEnabled()) {
            return new ResponseEntity<>("Source account is inactive", HttpStatus.FORBIDDEN);
        }

        if (!targetAccount.isEnabled()) {
            return new ResponseEntity<>("Target account is inactive", HttpStatus.FORBIDDEN);
        }

        if (!client.getAccounts().stream().map(account -> account.getName()).collect(Collectors.toSet()).contains(fromAccount)) {

            return new ResponseEntity<>("This account doesn't belong to an authenticated user", HttpStatus.FORBIDDEN);
        }

        if (accountService.getAccountByName(toAccount) == null) {

            return new ResponseEntity<>("Target account doesn't exist", HttpStatus.FORBIDDEN);
        }

        if (accountService.getAccountByName(fromAccount).getBalance() < amount) {
            return new ResponseEntity<>("Account doesn't have enough balance", HttpStatus.FORBIDDEN);
        }

        double currentBalanceCredit = targetAccount.getBalance() + amount;
        double currentBalanceDebit = sourceAccount.getBalance() - amount;
        double localTax = amount * 0.03;
        double transferTax = amount * 0.006;
        double newCurrentBalanceCredit = currentBalanceCredit - localTax;

        targetAccount.setBalance(currentBalanceCredit);
        sourceAccount.setBalance(currentBalanceDebit);

        Transaction transactionDebit = new Transaction(TransactionType.DEBITO, amount, LocalDateTime.now(), description + " " + "to:" + " " + targetAccount.getName() + " " + "-" + " " + targetAccount.getType(), currentBalanceDebit, sourceAccount);
        Transaction transactionCredit = new Transaction(TransactionType.CREDITO, amount, LocalDateTime.now(), description + " " + "from:" + " " + " " + sourceAccount.getName() + " " + "-" + " " + targetAccount.getType(), currentBalanceCredit, targetAccount);

        transactionService.saveTransactions(transactionDebit);
        transactionService.saveTransactions(transactionCredit);

        accountService.saveAccounts(targetAccount);
        accountService.saveAccounts(sourceAccount);

        targetAccount.setBalance(currentBalanceCredit - localTax);
        Transaction transactionLocalTax = new Transaction(TransactionType.DEBITO, localTax, LocalDateTime.now(), "taxes" + " " + "-" + " " + "Impuesto provincial" + " " + "-" + " " + "3,00%", (currentBalanceCredit - localTax), targetAccount);
        transactionService.saveTransactions(transactionLocalTax);
        accountService.saveAccounts(targetAccount);

        sourceAccount.setBalance(currentBalanceDebit - transferTax);
        targetAccount.setBalance(newCurrentBalanceCredit - transferTax);

        Transaction transactionTransferTaxCredit = new Transaction(TransactionType.DEBITO, transferTax, LocalDateTime.now(), "taxes" + " " + "-" + " " + "Impuesto transferencias" + " " + "-" + " " + "0,06%", (newCurrentBalanceCredit - transferTax), targetAccount);
        Transaction transactionTransferTaxDebit = new Transaction(TransactionType.DEBITO, transferTax, LocalDateTime.now(), "taxes" + " " + "-" + " " + "Impuesto transferencias" + " " + "-" + " " + "0,06%", (currentBalanceDebit - transferTax),sourceAccount);

        transactionService.saveTransactions(transactionTransferTaxCredit);
        transactionService.saveTransactions(transactionTransferTaxDebit);

        accountService.saveAccounts(targetAccount);
        accountService.saveAccounts(sourceAccount);

        return new ResponseEntity<>(HttpStatus.CREATED);

    }

}



