<template>
  <div class="big-div-pre-game-phase" v-if="!state.editing">
    <div class="players-list">
      <div class="players">
        <div
            class="player-and-name-container"
            :class="id == lobby.yourLocalId ? 'you' : ''"
            v-for="id in Object.keys(lobby.players)" :key="id"
        >
          <div class="edit-button">
            <img
                src="../assets/edit.png"
                v-if="id == lobby.yourLocalId"
                class="edit-button-image"
                alt="edit"
                @click="state.editing = true"
            />
          </div>
          <div
              class="player"
              :id="'player-' + colors[lobby.players[id].color]"

          />
          <div class="name">
            {{ lobby.players[id].username }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="editing" v-else>
    <h1>Choose a color</h1>
    <div class="players">
      <div class="player-and-name-container" v-for="i in [0, 1, 2, 3]" :key="i" @click="changeColor(i)">
        <div
            class="player"
            :id="'player-' + colors[i]"
        />
        <div class="name">
          {{ isColorAlreadyUsed(i) ? 'Ask to switch colors' : 'Change to this color' }}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {reactive} from "vue";

export default {
  name: "PreGamePhase",
  props: {
    lobby: { required: true }
  },
  setup(props, context) {
    const state = reactive({
      editing: false
    })

    const colors = {
      0: 'blue',
      1: 'green',
      2: 'red',
      3: 'yellow'
    }

    function isColorAlreadyUsed(i){
      let id;
      for (id in props.lobby.players) {
        if (props.lobby.players[id].color == i) {
          return true
        }
      }
      return false
    }

    function changeColor(i) {
      context.emit('changeColor', i)
    }

    return {
      state,
      colors,
      isColorAlreadyUsed,
      changeColor
    }
  }
}
</script>

<style scoped lang="scss">
  #player-red {
    background-color: red;
  }

  #player-yellow {
    background-color: yellow;
  }

  #player-blue {
    background-color: blue;
  }

  #player-green {
    background-color: green;
  }

  .player {
    width: 2rem;
    height: 2rem;
    margin: .1rem;
    border-width: .1rem;
    border-color: black;
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

  .edit-button-image{
    width: 100%;
    height: 100%;
  }

  .edit-button {
    width: 2rem;
    height: 2rem;
  }

  .you {
    .name {
      font-weight: bold;
    }
  }
</style>