package com.mindhub.HomeBanking.services.Implement;

import com.mindhub.HomeBanking.models.Card;
import com.mindhub.HomeBanking.models.repositories.CardRepository;
import com.mindhub.HomeBanking.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardServiceImplement implements CardService {

    @Autowired
    CardRepository cardRepository;


    @Override
    public void saveCards(Card card) {
        cardRepository.save(card);
    }

    @Override
    public Card findById(Long id) {
        return cardRepository.findById(id).orElse(null);
    }

    @Override
    public Card findByNumber(String number) {
        return cardRepository.findByNumber(number);
    }
}
