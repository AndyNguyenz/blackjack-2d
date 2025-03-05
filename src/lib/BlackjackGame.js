
import { writable } from "svelte/store";
import Deck from "./Deck";
import Player from "./Player";
import Dealer from "./Dealer";

export const difficulty = writable('easy');

export const gameState = writable({
    player: {
        hand: []
    },
    playerValue: 0,
    dealer: {
        hand: []
    },
    dealerValue: 0,
    pot: 0,
    currentStage: null,
    winner: null,
    //Stage 1 - Player decision
    //Stage 2 - Dealer decision
    //Stage 3 - Game ended
})

export function initGame(difficulty = "medium") {
    const game = new BlackjackGame(difficulty);

    
    gameState.set({
        player: {
            hand: game.player.hand
        },
        playerValue: game.player.calculateHandValue(),
        dealer: {
            hand: game.dealer.hand
        },
        dealerValue: game.dealer.calculateHandValue(),
        pot: 0,
        currentStage: 0,
        winner: null
    });

    return game;
}

export function startGame(game) {
    game.startGame();
    gameState.set({
        player: {
            hand: game.player.hand
        },
        playerValue: game.player.calculateHandValue(),
        dealer: {
            hand: game.dealer.hand
        },
        dealerValue: game.dealer.calculateHandValue(),
        pot: 0,
        currentStage: 1,
        winner: null
    });
}

export function playerHit(game) {
    let result = game.playerHit();
    if(result) {
        gameState.set({
            player: {
                hand: game.player.hand
            },
            playerValue: game.player.calculateHandValue(),
            dealer: {
                hand: game.dealer.hand
            },
            dealerValue: game.dealer.calculateHandValue(),
            pot: 0,
            currentStage: 3,
            winner: result
        });
        return result;
    } else {
        gameState.set({
            player: {
                hand: game.player.hand
            },
            playerValue: game.player.calculateHandValue(),
            dealer: {
                hand: game.dealer.hand
            },
            dealerValue: game.dealer.calculateHandValue(),
            pot: 0,
            currentStage: 1,
            winner: null
        });
        return -1;
    };
    
    
}

export function playerStand(game) {
    let result = game.playerStand();
    gameState.set({
        player: {
            hand: game.player.hand
        },
        playerValue: game.player.calculateHandValue(),
        dealer: {
            hand: game.dealer.hand
        },
        dealerValue: game.dealer.calculateHandValue(),
        pot: 0,
        currentStage: 3,
        winner: result
    });
    return result;
}



class BlackjackGame {
    constructor(difficulty = "medium") {
        this.deck = new Deck();
        this.deck.shuffle();
        this.player = new Player("User");
        this.dealer = new Dealer(difficulty);
    };

    startGame() {
        this.player.resetHand();
        this.dealer.resetHand();
        this.deck.shuffle();

        this.dealer.receiveCard(this.deck.dealCard());
        this.player.receiveCard(this.deck.dealCard());
        this.dealer.receiveCard(this.deck.dealCard());
        this.player.receiveCard(this.deck.dealCard());
    }

    playerHit() {
        this.player.receiveCard(this.deck.dealCard());

        if (this.player.calculateHandValue() > 21) {
            //player bursts
            return 2
        } else if (this.player.hand.length == 5 && this.player.calculateHandValue() <= 21) {
            return 0
        }
    }

    playerStand() {
        while (this.dealer.shouldHit(this.player.hand[0])) {
            this.dealer.receiveCard(this.deck.dealCard());
        };

        return this.checkWinner();
    };

    checkWinner() {
        const playerTotal = this.player.calculateHandValue();
        const dealerTotal = this.dealer.calculateHandValue();
        // 0 - player wins - 1 - dealer wins - 2 player bursts - 3 dealer bursts - 4 tie
        if(playerTotal > 21) return 2
        if(dealerTotal > 21) return 3
        if (playerTotal > dealerTotal) return 0
        if (dealerTotal > playerTotal) return 1
        return 4; 
    }
    
}

export default BlackjackGame;