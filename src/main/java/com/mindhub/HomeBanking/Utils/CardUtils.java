package com.mindhub.HomeBanking.Utils;

import static com.mindhub.HomeBanking.Utils.Utils.getRandomNumber;

public final class CardUtils {

    private CardUtils() {
    }

    public static int getCvv() {
        int cvv = getRandomNumber(100,1000);
        return cvv;
    }

    public static String getNumCard() {
        String numCard = String.valueOf(getRandomNumber(4540, 4540)) + "-" + String.valueOf(getRandomNumber(3000, 3300)) + "-" + String.valueOf(getRandomNumber(7300, 7310)) + "-" + String.valueOf(getRandomNumber(1000, 9999));
        return numCard;
    }
}
