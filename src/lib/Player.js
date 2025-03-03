class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    receiveCard(card) {
        this.hand.push(card)
    };

    calculateHandValue() {
        let value = 0;
        let aces = 0;

        this.hand.forEach(card => {
            if(['J', 'Q', 'K'].includes(card.rank)) {
                value += 10;
            } else if (card.rank === 'A') {
                value += 11;
                aces ++;
            } else {
                value += parseInt(card.rank)
            }
        });

        //Reduce value if hands if one or more aces and not hitting 21
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        return value;
    };

    resetHand() {
        this.hand = [];
    }
}

export default Player;