package com.mindhub.HomeBanking.models.repositories;


import com.mindhub.HomeBanking.models.Account;
import com.mindhub.HomeBanking.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface AccountRepository extends JpaRepository<Account, Long> {

    Account findByName(String name);

    List<Account> getAccountsByClient (Client client);



}
