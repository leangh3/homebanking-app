package com.mindhub.HomeBanking;


import com.mindhub.HomeBanking.Utils.CardUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest
public class CardUtilTests {

    @Test

//    public void cardNumberIsCreated(){
//
//        String cardNumber = CardUtils.getNumCard();
//
//        assertThat(cardNumber,is(not(emptyOrNullString())));
//
//    }

    public void cvvNumberReturned(){

        int cvvNumber = CardUtils.getCvv();

        assertThat(cvvNumber, lessThanOrEqualTo(1000));
        assertThat(cvvNumber, greaterThanOrEqualTo(100));

    }


}
