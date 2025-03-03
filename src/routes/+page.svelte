<script>
    import Deck from "$lib/Deck";
    import { onDestroy } from "svelte";
    import Card from "./play/Card.svelte";
    import {fade} from 'svelte/transition';
    import {difficulty} from '$lib/BlackjackGame';

    let deck = new Deck();
    deck.shuffle(50);
    let interval;
    let setDif;

    $:setDif = $difficulty;
    let ran = 0;
    let card = deck.cards[ran]

    // interval = setInterval(()=>{
    //     ran = Math.floor(Math.random() * 52);
    //     card = deck.cards[ran];
    // }, 5000)

    // onDestroy(()=>{
    //     clearInterval(interval);
    // });

    function updateDifficulty(e) {
        setDif.set(e.target.value);
    }
</script>

<div id='main'>
    
    <div id='table-container'>
        <div id='table-outer'>
            <div id='table'>
                <div id='banker-section'>
                    <!-- {#key card}
                        <div class='hand-container' transition:fade>
                            <Card isShow={true} image={'/individual/'+card.suit[0].toLowerCase()+card.suit.substr(1, card.suit.length-2)+'/card'+card.suit+'_'+card.rank+'.png'}/>
                        </div>
                    {/key} -->
                </div>
                <div id='divider'>BLACJACK</div>
                <div id='player-section'>
                    <div class='single-row'>
                        <p>Difficulty Setting</p>
                        <select on:change={(e)=>updateDifficulty(e)}>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </div>
                    <div class='single-row'>
                        <a href='/play' id='play-btn'>PLAY</a>
                    </div>
                </div>
            </div>
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
        flex-direction: column;
        gap: 20px;
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

    .single-row {
        display: block;
    }

    .single-row p {
        color: #fff;
        text-align: center;
        font-size: 1.3rem;
        margin: 10px 0; 
    }

    #play-btn {
        text-decoration: none;
        background: #fff;
        padding: 1rem 3rem;
        display: block;
        transition: all ease-in-out 0.3s;
        font-weight: 900;
    }

    select {
        padding: 0.25rem 0.5rem;
        width: 10rem;
    }

    a:visited {
        color: inherit;
    }

    #play-btn:hover {
        scale: 1.2;
    }

</style>
