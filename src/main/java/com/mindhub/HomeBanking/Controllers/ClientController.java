package com.mindhub.HomeBanking.Controllers;


import com.mindhub.HomeBanking.dto.ClientDTO;
import com.mindhub.HomeBanking.models.Account;
import com.mindhub.HomeBanking.models.AccountType;
import com.mindhub.HomeBanking.models.Client;
import com.mindhub.HomeBanking.services.AccountService;
import com.mindhub.HomeBanking.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import static com.mindhub.HomeBanking.Utils.Utils.getRandomNumber;

@RestController
@RequestMapping("/api")
public class ClientController {

   @Autowired
   ClientService clientService;


    @GetMapping("/clients")
    public List<ClientDTO> getClients() {
        return clientService.getClientsDTO();
    }

    @GetMapping("/clients/{id}")
    public ClientDTO getClient(@PathVariable Long id) {
        return clientService.getCLientDTO(id);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountService accountService;

    @PostMapping(path = "/clients")
    public ResponseEntity<Object> register(

            @RequestParam String firstName, @RequestParam String lastName,

            @RequestParam String email, @RequestParam String password, Authentication authentication) {


        if (firstName.isEmpty() || lastName.isEmpty() || email.isEmpty() || password.isEmpty()) {

            return new ResponseEntity<>("Missing data", HttpStatus.FORBIDDEN);

        }

        if(!email.contains("@") || !email.contains(".com")){

            return new ResponseEntity<>("The email is not valid", HttpStatus.FORBIDDEN);
        }


        if (password.length() < 6) {

            return new ResponseEntity<>("Password to short: At least 6 characters", HttpStatus.LENGTH_REQUIRED);
        }

        if(password.length() > 15){

            return new ResponseEntity<>("Password to long: cannot be longer than 15 characters", HttpStatus.LENGTH_REQUIRED);
        }

        if (clientService.getClientByEmail(email) != null) {

            return new ResponseEntity<>("Email already in use", HttpStatus.FORBIDDEN);

        }

        Client client = new Client(firstName, lastName, email, passwordEncoder.encode(password));
        clientService.saveClient(client);

        Account account = new Account("VIN-" + getRandomNumber(10000000, 99999999), LocalDateTime.now(), 0, AccountType.AHORRO, client);
        accountService.saveAccounts(account);

        return new ResponseEntity<>(HttpStatus.CREATED);


    }


    @GetMapping("/clients/current")
    public ClientDTO getClientDTO(Authentication authentication) {
        Client client = clientService.getClientCurrent(authentication);
        ClientDTO clientDTO = new ClientDTO(client);
        return clientDTO;

    }

}


