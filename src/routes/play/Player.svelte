<script>
    import Card from "./Card.svelte";

    export let player = {
        hand: []
    };

    export let isDealer = false;
    export let gameState = 1;
    export let value = 0;
</script>

<div id='player-container'>
    <div id='card-container'>
        {#each player.hand as card, i}
            <Card isShow={!(i == 0 && gameState == 1 && isDealer)} image={'/individual/'+card.suit[0].toLowerCase()+card.suit.substr(1, card.suit.length-2)+'/card'+card.suit+'_'+card.rank+'.png'}/>
        {/each}
    </div>
    <div><span>{isDealer ? "Dealer - " : "Player - "}
        {isDealer && gameState == 1 ? "" : value}
    </span></div>
    <div>{player.chips}</div>
</div>

<style>
    #player-container {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        gap: 5px;
        min-width: 120px;
        text-align: center;
        background-color: rgba(0,0,0, 0.2);
        border-radius: 10px;
        padding: 1rem;
        color: #fff;
    }

    #card-container {
        display: flex;
        align-content: center;
        justify-content: space-evenly;
    }
</style>

