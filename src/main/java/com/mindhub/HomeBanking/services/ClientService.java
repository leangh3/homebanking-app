package com.mindhub.HomeBanking.services;

import com.mindhub.HomeBanking.dto.ClientDTO;
import com.mindhub.HomeBanking.models.Client;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ClientService {


    List<ClientDTO> getClientsDTO();
    ClientDTO getCLientDTO(Long id);
    Client getClientCurrent(Authentication authentication);
    void saveClient(Client client);
    Client getClientByEmail (String email);

}
