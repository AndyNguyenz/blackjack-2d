import Card from './Card.js';

class Deck {
    constructor() {
        this.MAX_SIZE = 52;
        this.SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
        this.NAMES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.cards = [];
        this.SUITS.forEach((suit)=>{
            this.NAMES.forEach((name)=>{
                this.cards.push(new Card(suit, name));
            })
        })
    }

    async shuffle(times) {
        //mimic real-life suffle
        // for(let i = 0; i < times; i++) {
        //     // let newIndex = Math.floor(Math.random() * 51); // Can not use the whole deck to swap : 52 - 1
        //     // let front = this.cards.slice(0, newIndex);
        //     // let back = this.cards.slice(newIndex, this.MAX_SIZE+1);
        //     // let newDeck = back.concat(front);
        //     // //console.log(newDeck);
        //     // this.cards = newDeck;

        //     let newIndex = Math.floor(Math.random() * 51);
        //     let newIndex2 = Math.floor(Math.random() * 51);
        //     let temp = this.cards[newIndex];
        //     this.cards[newIndex] = this.cards[newIndex2];
        //     this.cards[newIndex2] = temp;
        // }

        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
          }
        //console.log(this.cards);
    }

    dealCard() {
        return this.cards.pop();
    }

    show() {
        return this.cards;
    }

}

export default Deck;