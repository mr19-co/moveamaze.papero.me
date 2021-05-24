<template>
  <div>
    <PreGamePhase
        :lobby="state.lobby"
        v-if="state.lobby.status === 0"
    />
    <GamePhase v-if="state.lobby.status === 1"/>
  </div>
</template>

<script>
import {reactive} from "vue"
import io from "socket.io-client"
import { urls } from "../constants/constants"
import websocketEvents from "../constants/websocketEvents"
import { useRoute } from "vue-router"
import PreGamePhase from "../components/PreGamePhase";
import GamePhase from "../components/GamePhase";

export default {
  name: "Game",
  components: {GamePhase, PreGamePhase},
  setup() {
    const state = reactive({
      lobby: {
        status: 0,
        admin: 0,
        yourLocalId: 0,
        players: {
          0: {
            localId: 0,
            username: "Massimo",
            color: 0
          },
          1: {
            localId: 1,
            username: "Pino",
            color: 1
          }
        }
      }
    })

    const route = useRoute()

    const socket = io(urls.baseUrl, {
      path: urls.socketPath,
      autoConnect: true
    })

    socket.on("connect", () => {
      socket.emit(websocketEvents.CONNECT_TO_GAME, {
        gameId: route.params.gameId
      })
    })

    socket.on(websocketEvents.LOBBY_MODIFIED, (lobby) => {
      state.lobby = lobby
      console.log('lobby modified')
      console.log(lobby)
    })

    function changeColor(color) {
      socket.emit(websocketEvents.CHANGE_COLOR, color)
    }

    return {
      state,
      changeColor
    }
  }
}
</script>

<style scoped>

</style>