import Player from "./Player";

class Dealer extends Player {
    constructor(difficulty = "medium") {
        super("Dealer");
        this.difficulty = difficulty;
    }

    shouldHit(playerVisibleCard) {
        let value = this.calculateHandValue();

        //Hit if belows 17
        if(value < 17) return true;

        switch(this.difficulty) {
            case "easy":
                return this.easyMode(value);
            case "medium":
                return this.mediumMode(value, playerVisibleCard);
            case "hard":
                return this.hardMode(value, playerVisibleCard);
            default:
                return false;
        };
    };


    //Dealer has 3 different difficulty settings
    easyMode(value) {
        if(value === 17) return Math.random() < 0.6;
        if(value === 18) return Math.random() < 0.3;
        return false;
    }

    mediumMode(value, playerVisibleCard) {
        if(value === 17 && this.hasSoft17() && Math.random() < 0.3) return true;
        if(["9", "10", "J", "Q", "K", "A"].includes(playerVisibleCard.rank) && value < 18) {
            return Math.random() < 0.15;
        };

        return false;
    };

    hardMode(value, playerVisibleCard) {
        if(value === 17 && this.hasSoft17()) return true;
        if(["9", "10", "J", "Q", "K", "A"].includes(playerVisibleCard.rank) && value < 18) {
            return Math.random() < 0.25;
        };

        return false;
    }

    hasSoft17() {
        let hasAce = this.hand.some(card => card.rank === "A");
        return hasAce && this.calculateHandValue() === 17;
    };
}

export default Dealer;