package com.mindhub.HomeBanking.dto;

import com.mindhub.HomeBanking.models.Card;
import com.mindhub.HomeBanking.models.CardColor;
import com.mindhub.HomeBanking.models.CardType;

import java.time.LocalDate;

public class CardDTO {

    private long id;
    private CardColor color;
    private CardType type;
    private LocalDate fromDate;
    private LocalDate thruDate;
    private String cardHolder;
    private int cvv;
    private String number;
    private boolean isEnabled;

    public CardDTO() {
    }

    public CardDTO(Card card) {
        this.id = card.getId();
        this.color = card.getColor();
        this.type = card.getType();
        this.fromDate = card.getFromDate();
        this.thruDate = card.getThruDate();
        this.cardHolder = card.getCardHolder();
        this.cvv = card.getCvv();
        this.isEnabled = card.isEnabled();
        this.number = card.getNumber();

    }

    public long getId() {
        return id;
    }

    public CardColor getColor() {
        return color;
    }

    public void setColor(CardColor color) {
        this.color = color;
    }

    public CardType getType() {
        return type;
    }

    public void setType(CardType type) {
        this.type = type;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getThruDate() {
        return thruDate;
    }

    public void setThruDate(LocalDate thruDate) {
        this.thruDate = thruDate;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
