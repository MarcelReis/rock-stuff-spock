<style>
  .choose-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .choose-header {
    white-space: nowrap;
    text-transform: uppercase;
    font-size: 2rem;
  }
  .choose-buttons {
    display: grid;
    grid-gap: 16px;
  }

  .button-rules {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<script>
  import Button from "./Button.svelte";
  import GameButton from "./GameButton/GameButton.svelte";
  import GameBoard from "./GameBoard.svelte";
  import Leaderboard from "./Leaderboard/Leaderboard.svelte";

  import game from "../store/game";
</script>

{#if !$game.mode}
  <div class="choose-container">
    <h2 class="choose-header">Escolha um modo</h2>
    <div class="choose-buttons">
      <Button full="full" onClick="{() => game.init('normal')}">Normal</Button>
      <Button disabled full="full" onClick="{() => game.init('spock')}">
        Spock
      </Button>
    </div>
  </div>
{:else}
  <Leaderboard score="{$game.player.score}" />

  <GameBoard
    cards="{$game.cards}"
    selected="{$game.player.selected}"
    opponentSelected="{$game.opponent.selected}"
    select="{game.playerChoose}"
  />

  <!-- <Button onClick="{() => game.reset()}">Reset</Button> -->

  <div class="button-rules">
    <Button onClick="{game.toggleRules}">Rules</Button>
  </div>
{/if}
