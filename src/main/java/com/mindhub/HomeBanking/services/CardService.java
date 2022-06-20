package com.mindhub.HomeBanking.services;

import com.mindhub.HomeBanking.models.Card;

public interface CardService {

    void saveCards(Card card);

    Card findById(Long id);

    Card findByNumber(String number);

}
