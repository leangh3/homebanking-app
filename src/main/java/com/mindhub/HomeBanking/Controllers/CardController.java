package com.mindhub.HomeBanking.Controllers;

import com.mindhub.HomeBanking.Utils.CardUtils;
import com.mindhub.HomeBanking.models.Card;
import com.mindhub.HomeBanking.models.CardColor;
import com.mindhub.HomeBanking.models.CardType;
import com.mindhub.HomeBanking.models.Client;
import com.mindhub.HomeBanking.services.CardService;
import com.mindhub.HomeBanking.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
class CardController {

    @Autowired
    private CardService cardService;

    @Autowired
    private ClientService clientService;


    @PostMapping(path = "/clients/current/cards")
    public ResponseEntity<Object> createCards(
            @RequestParam CardType type, @RequestParam CardColor color,
            Authentication authentication) {

        Client client = clientService.getClientCurrent(authentication);
        List<Card> cardsType = client.getCards().stream().filter(card -> card.getType().equals(type)).collect(Collectors.toList());;
        List<Card> cardsColor = cardsType.stream().filter(card -> card.getColor().equals(color)).collect(Collectors.toList());


        if (cardsColor.size() >= 1 ) {

            return new ResponseEntity<>("Cannot obtain more than a card of each color and type", HttpStatus.FORBIDDEN);
        }


        if (cardsType.size() >= 3) {

            return new ResponseEntity<>("Cannot obtain more than 3 cards of each", HttpStatus.FORBIDDEN);
        }

        String numCard = CardUtils.getNumCard();
        int cvv = CardUtils.getCvv();

        Card card = new Card(color, type, LocalDate.now(), LocalDate.now().plusYears(5), client.getFirstName() + " " + client.getLastName(), cvv, numCard, client);
        cardService.saveCards(card);

        return new ResponseEntity<>(HttpStatus.CREATED);

    }


    @PatchMapping("/clients/current/cards")
    public ResponseEntity<Object> setDisabledCard(@RequestParam Long id, Authentication authentication){

        Client clientAuth = clientService.getClientCurrent(authentication);
        Card card = cardService.findById(id);

        if(id == null){
            return new ResponseEntity<>("The id doesn't exist", HttpStatus.FORBIDDEN);
        }

        if(card == null){
            return new ResponseEntity<>("The card doesn't exist", HttpStatus.FORBIDDEN);
        }

        if(!clientAuth.getCards().contains(card)){

            return new ResponseEntity<>("The card doesn't belong to an authenticated customer", HttpStatus.FORBIDDEN);
        }


        card.setEnabled(false);
        cardService.saveCards(card);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
