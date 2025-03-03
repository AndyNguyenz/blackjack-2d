<script>
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import Player from "./Player.svelte";
    import { difficulty, gameState, initGame, playerStand, playerHit, startGame } from "$lib/BlackjackGame";

    let game;
    let diff;
    let state;
    $:state = $gameState;
    $:diff = $difficulty;
    onMount(async()=>{
        game = initGame(diff);
    })

    function resetGame() {
        game = initGame(diff);
    }



</script>

<div id='main'>
    {#if state.winner != null}
        <div id='message'>
            {#if state.winner == 0} 
                Player Wins!
            {:else if state.winner == 1}
                Dealer Wins!
            {:else if state.winner == 2}
                Player Bursts! Dealer Wins!
            {:else if state.winner == 3}
                Dealer Bursts! Player Wins!
            {:else} 
                Tie!
            {/if}
        </div>
    {/if}
    <div id='table-container'>
        <div id='table-outer'>
            <div id='table'>
                <div id='banker-section'>
                    <div class='hand-container'>
                        <Player player={state.dealer} isDealer={true} gameState={state.currentStage} value={state.dealerValue}/>
                    </div>
                </div>
                <div id='divider'>BLACJACK</div>
                <div id='player-section'>
                    <Player player={state.player} isDealer={false} gameState={state.currentStage} value={state.playerValue}/>
                </div>
            </div>
        </div>
        
    </div>
    <div id='gui'>
        <div id='action-btn-container'>
            {#if state.currentStage} 
                <button class='round-btn' disabled={state.currentStage!= 3} on:click={resetGame}>Reset</button>
            {:else} 
                <button class='round-btn' on:click={()=>startGame(game)}>Start</button>
            {/if}
            
            <button class='round-btn' on:click={()=>{playerStand(game)}} disabled={state.playerValue <= 16 || state.currentStage != 1}>Stand</button>
            <button class='round-btn' on:click={()=>{playerHit(game)}} disabled={state.currentStage != 1 || state.player.hand.length >= 5}>Hit</button>
            <button class='round-btn' disabled={true}>Double Down</button>
            <button class='round-btn' disabled={true}>Split</button>
        </div>
    </div>
</div>

<style>
    #main {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        background-image: url('background_3.jpg');
        background-size: contain;
    }

    #table-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    #table-outer {
        background-image: url('wood-bar-2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        width: 1000px;
        aspect-ratio: 1.5;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: 110px;  /* 100px of height + 10px of border */
        border-bottom-right-radius: 110px;
        
    }

    #table {
        width: 900px;
        height: 600px;
        background-color: #1d5916;
        background-image: url('background_2.png');
        border-bottom-left-radius: 110px;  /* 100px of height + 10px of border */
        border-bottom-right-radius: 110px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    #banker-section {
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #player-section {
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #divider {
        height: 100px;
        color: #266475;
        border: 5px solid #266475;
        border-radius: 25px;
        width: 80%;
        box-sizing: border-box;
        text-align: center;
        font-weight: 900;
        font-size: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #gui {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 200px;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1));
    }

    #action-btn-container {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
    }

    .round-btn {
        height: 100px;
        width: 100px;
        border-radius: 50px;
        background: rgba(255,255,255,0.5);
        border: 2px solid #fff;
    }

    .round-btn:disabled {
        background: rgba(255,255,255,0.1);
    }

    #message {
        position: absolute;
        background-color: rgba(255,255,255,0.6);
        font-size: 36px;
        font-weight: bold;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 3rem;
        text-align: center;
        border-radius: 10px;
        border: 3px solid grey;
    }

</style>