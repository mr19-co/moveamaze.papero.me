<template>
  <div class="big-div-pre-game-phase">
    <div class="players">
      <div
          class="player-and-name-container"
          v-for="id in Object.keys(state.lobby.players)" :key="id"
      >
        <div
            class="player"
            :class="'player-' + colors[state.lobby.players[id].color]"
            :id="id == state.lobby.yourLocalId ? 'player-you' : ''"
        />
        <div class="name">
          {{ state.lobby.players[id].username }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "PreGamePhase",
  props: {
    lobby: { required: true }
  },
  setup(props) {
    const state = reactive({
      lobby: props.lobby
    })

    const colors = {
      0: 'blue',
      1: 'green',
      2: 'red',
      3: 'yellow'
    }

    return {
      state,
      colors
    }
  }
}
</script>

<style scoped>
  .player-red {
    background-color: red;
  }

  .player-yellow {
    background-color: yellow;
  }

  .player-blue {
    background-color: blue;
  }

  .player-green {
    background-color: green;
  }

  #player-you{
    font-weight: bold;
  }

  .player {
    width: 2rem;
    height: 2rem;
    margin: .1rem;
  }

  .player-and-name-container{
    display: flex;
    flex-direction: row;
  }

  .big-div-pre-game-phase {
    position: relative;
  }

  .players {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .name{
    align-self: center;
  }
</style>