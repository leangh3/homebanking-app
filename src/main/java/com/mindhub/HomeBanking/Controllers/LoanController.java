package com.mindhub.HomeBanking.Controllers;


import com.mindhub.HomeBanking.Utils.Utils;
import com.mindhub.HomeBanking.dto.CreateLoanDTO;
import com.mindhub.HomeBanking.dto.LoanApplicationDTO;
import com.mindhub.HomeBanking.dto.LoanDTO;
import com.mindhub.HomeBanking.models.*;
import com.mindhub.HomeBanking.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ClientLoanService clientLoanService;

    @Autowired
    private TransactionService transactionService;


    @GetMapping("/loans")
    public List<LoanDTO> getLoanDTO() {
        return loanService.getLoanDTO();
    }

    @Transactional
    @PostMapping(path = "/loans")
    public ResponseEntity<String> addLoans(@RequestBody LoanApplicationDTO loanApplicationDTO,
                                           Authentication authentication) {

        Client clientAuth = clientService.getClientCurrent(authentication);
        Account account = accountService.getAccountByName(loanApplicationDTO.getTargetAccount());
        Loan loan = loanService.getLoanById(loanApplicationDTO.getId());
        double loanPlusints = loanApplicationDTO.getAmount() + (loanApplicationDTO.getAmount() * 0.2);

        if(loanApplicationDTO.getAmount() <= 0){

            return new ResponseEntity<>("Loan amount cannot be 0 or lower", HttpStatus.FORBIDDEN);
        }

        if(loanApplicationDTO.getPayments() <= 0){

            return new ResponseEntity<>("Loan payments cannot be 0 or lower", HttpStatus.FORBIDDEN);
        }

        if(loan == null){

            return new ResponseEntity<>("Loan doesn't exist", HttpStatus.FORBIDDEN);
        }

        if(loanApplicationDTO.getAmount() > loan.getMaxAmount()){

            return new ResponseEntity<>("Loan amount is greater than allow", HttpStatus.FORBIDDEN);
        }

        if(!loan.getPayments().contains(loanApplicationDTO.getPayments())){

            return new ResponseEntity<>("These payments are not allowed", HttpStatus.FORBIDDEN);
        }

        if(!clientAuth.getAccounts().stream().map(account1 -> account1.getName()).collect(Collectors.toSet()).contains(loanApplicationDTO.getTargetAccount())){

            return new ResponseEntity<>("This account doesn't belong to an authenticated user", HttpStatus.FORBIDDEN);

        }

        if(clientAuth.getClientLoans().stream().map(loan1 -> loan1.getLoan().getId()).collect(Collectors.toList()).contains(loanApplicationDTO.getId())){

            return new ResponseEntity<>("You already have this type of loan", HttpStatus.FORBIDDEN);

        }

        double currentBalanceLoan = account.getBalance() + loanApplicationDTO.getAmount();
        account.setBalance(currentBalanceLoan);

        ClientLoan clientLoan = new ClientLoan(clientAuth, loan, loanApplicationDTO.getPayments(), Utils.intsPLus(loan, loanApplicationDTO));
        clientLoanService.saveClientLoan(clientLoan);
        Transaction transactionLoan = new Transaction(TransactionType.CREDITO, loanApplicationDTO.getAmount(), LocalDateTime.now(), "loan approved" + " " + "-" + " " + loan.getName(), currentBalanceLoan, account);
        transactionService.saveTransactions(transactionLoan);
        accountService.saveAccounts(account);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PostMapping(path = "/loans/create")
    public ResponseEntity<Object> createLoans(@RequestBody CreateLoanDTO createLoanDTO,
                                              Authentication authentication) {

        Client clientAuth = clientService.getClientCurrent(authentication);
        List<Loan> loans = loanService.getLoans();

        if(!clientAuth.getEmail().contains("@admin.com")){
            return new ResponseEntity<>("Only administrators have permission", HttpStatus.FORBIDDEN);
        }

        if(createLoanDTO.getPayments().isEmpty()){

            return new ResponseEntity<>("Missing data", HttpStatus.FORBIDDEN);
        }

        if(createLoanDTO.getMaxAmount() <= 0){
            return new ResponseEntity<>("The fields cant be 0", HttpStatus.FORBIDDEN);
        }

        Loan newLoan = new Loan(createLoanDTO.getName(), createLoanDTO.getMaxAmount(), createLoanDTO.getPayments());
        loanService.saveLoans(newLoan);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
