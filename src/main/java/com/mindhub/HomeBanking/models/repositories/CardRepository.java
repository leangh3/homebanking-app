package com.mindhub.HomeBanking.models.repositories;

import com.mindhub.HomeBanking.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CardRepository extends JpaRepository<Card, Long> {

    Card findByNumber (String number);
}
