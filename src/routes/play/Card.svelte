<script>
    export let isShow = false;
    export let image;
    import { fade } from "svelte/transition";
</script>
<div id='main' transition:fade>
    <img src={isShow ? image : '/individual/card back/cardBackRed.png'} alt='card'>
</div>
<style>
    #main {
        height: 80px;
        aspect-ratio: 417/654;
        border: 1px solid black;
        border-radius: 5px;
    }

    #main img {
        height: 100%;
        width: auto;
    }
</style>