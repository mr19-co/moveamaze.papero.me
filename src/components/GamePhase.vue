<template>
  <div class="big-div">
    <div class="buttons">
      <button>up</button>
      <button>down</button>
      <button>left</button>
      <button>right</button>
      <div v-for="(node, index) in state.path" :key="index">{{node}}</div>
    </div>
    <div
        class="grid-container"
        :style="{
          width: state.gridContainerDimension + 'px',
          height: state.gridContainerDimension + 'px'
        }"
    >
      <template
          class="row-container"
          v-for="row in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
          :key="row"
      >
        <div
            class="grid-item"
            :class="{
              'shifting-left': (row === shiftingRow || column === shiftingColumn) && state.shifting && shiftingDirection === 'left',
              'shifting-right': (row === shiftingRow || column === shiftingColumn) && state.shifting && shiftingDirection === 'right',
              'shifting-up': (row === shiftingRow || column === shiftingColumn) && state.shifting && shiftingDirection === 'up',
              'shifting-down': (row === shiftingRow || column === shiftingColumn) && state.shifting && shiftingDirection === 'down'
            }"
            v-for="column in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
            :key="column"
            :style = "{
              'grid-row': row,
               'grid-column': column,
                /*'width': (state.gridContainerDimension / 11 + (column === 1 || column === mazeDimensions.nOfColumns + 4 ? 0.5*rem : 0)) + 'px',
                 'height': (state.gridContainerDimension / 11  + (row === 1 || row === mazeDimensions.nOfRows + 4 ? 0.5*rem : 0))+ 'px'
            */}"
        >
          <div
              v-if="
                column >= 3 && column <= mazeDimensions.nOfColumns + 2
                && row >= 3 && row <= mazeDimensions.nOfRows + 2
              "
              @mouseover="drawRoute({ row, column })"
              @click="moveTokenToDestination({ row, column })"
          >
            <img
                class="tile-image"

                :src="tryElseNull(() => state.tileGrid[row][column].image.path)"
                :style="{ transform: tryElseNull(() => 'rotate(' + state.tileGrid[row][column].image.rotation*90 + 'deg)')}"
                alt=""
                width="50"
                height="50"
                :class="{
                'top-opening': state.tileGrid[row][column].openings[0],
                'right-opening': state.tileGrid[row][column].openings[1],
                'bottom-opening': state.tileGrid[row][column].openings[2],
                'left-opening': state.tileGrid[row][column].openings[3],
              }"
            />
            <div :class="'segment-' + state.segmentGrid[row][column]"></div>
            <div
                :id="'token-' + tokenColor(row, column)"
                class="token"
                v-if="tokenColor(row, column)"
            ></div>
          </div>

          <div
              :class="{
                'move-up': row >= mazeDimensions.nOfRows + 3 && column % 2 === 0 && column >= 3 && column <= mazeDimensions.nOfColumns + 2,
                'move-down': row <= 2 && column % 2 === 0 && column >= 3 && column <= mazeDimensions.nOfColumns + 2,
                'move-left': column >= mazeDimensions.nOfColumns + 3 && row % 2 === 0 && row >= 3 && row <= mazeDimensions.nOfRows + 2,
                'move-right': column <= 2 && row % 2 === 0 && row >= 3 && row <= mazeDimensions.nOfRows + 2,
              }"
              v-else
          >
            <img
                class="tile-image spare-tile-image"
                v-if="
                  row === state.tileGrid.spareTileRow
                   && column === state.tileGrid.spareTileColumn
                "
                :src="tryElseNull(() => state.tileGrid.spareTile.image.path)"
                :style="{
                  transform: tryElseNull(() => 'rotate(' + state.tileGrid.spareTile.image.rotation*90 + 'deg)'),
                   /*width: state.gridContainerDimension / 11,
                    height: state.gridContainerDimension / 11*/
                }"
                alt=""
                width="100"
                height="100"
                @click="state.tileGrid.spareTile = state.tileGrid.spareTile.rotateRight(); log('test')"
            />
            <div
                :class="{
                  'insertion-arrow': true
                }"
                @click="moveSpareTileTo(row, column)"
                v-else-if="
                  (row === 2 || row === mazeDimensions.nOfRows + 3
                   || column === 2 || column === mazeDimensions.nOfRows + 3
                    || (row === spareTileArrowRow && column === spareTileArrowColumn))
                "
            ></div>
          </div>

        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {computed, reactive} from 'vue'
import { mazeDimensions, rem } from "../constants/constants";
import { createTileGrid, shuffledMovableTiles } from "../constants/tiles";
import { tryElseNull, mazeToGraph, dijkstrasAlgorithm, neighborPosition } from "../functions/functions";
import _ from "lodash"
import Vue from "lodash/object";


export default {
  name: 'GamePhase',
  setup() {
    const tileGrid = createTileGrid(shuffledMovableTiles())
    console.log(tileGrid)

    const state = reactive({
      tileGrid: tileGrid,
      segmentGrid: {
        3: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        4: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        5: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        6: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        7: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        8: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        9: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
      },
      tokenShiftingDirection: '',
      gridContainerDimension: Math.min(window.innerWidth, window.innerHeight),
      shifting: false,
      tokens: {
        red: { row: 3, column: 3 }
      },
      currentPlayer: 'red',
      path: "test",
      openings: [false, false, false, false],
      percentage: 0
    })

    window.addEventListener("resize", function(){
      state.gridContainerDimension = Math.min(window.innerWidth, window.innerHeight)
    })

    function shift() {
      state.shifting = true
      setTimeout(() => {
        state.shifting = false

        const oldSpareTile = state.tileGrid.spareTile
        if (shiftingDirection.value === 'right') {
          Vue.set(state.tileGrid, 'spareTile', state.tileGrid[shiftingRow.value][mazeDimensions.nOfColumns + 2])
          for (let column = mazeDimensions.nOfColumns + 1; column >= 3; column--) {
            Vue.set(state.tileGrid[shiftingRow.value], column + 1, state.tileGrid[shiftingRow.value][column])
          }
          state.tileGrid.spareTileColumn = mazeDimensions.nOfColumns + 3
          Vue.set(state.tileGrid, 'spareTileColumn', mazeDimensions.nOfColumns + 3)
          Vue.set(state.tileGrid[shiftingRow.value], 3, oldSpareTile)
        }
        else if (shiftingDirection.value === 'left') {
          Vue.set(state.tileGrid, 'spareTile', state.tileGrid[shiftingRow.value][3])
          for (let column = 4; column <= mazeDimensions.nOfColumns + 2; column++) {
            Vue.set(state.tileGrid[shiftingRow.value], column - 1, state.tileGrid[shiftingRow.value][column])
          }
          state.tileGrid.spareTileColumn = 2
          Vue.set(state.tileGrid, 'spareTileColumn', 2)
          Vue.set(state.tileGrid[shiftingRow.value], mazeDimensions.nOfColumns + 2, oldSpareTile)
        }
        else if (shiftingDirection.value === 'down') {
          Vue.set(state.tileGrid, 'spareTile', state.tileGrid[mazeDimensions.nOfRows + 2][shiftingColumn.value])
          for (let row = mazeDimensions.nOfRows + 1; row >= 3; row--) {
            Vue.set(state.tileGrid[row + 1], shiftingColumn.value, state.tileGrid[row][shiftingColumn.value])
          }
          state.tileGrid.spareTileRow = mazeDimensions.nOfRows + 3
          Vue.set(state.tileGrid, 'spareTileRow', mazeDimensions.nOfRows + 3)
          Vue.set(state.tileGrid[3], shiftingColumn.value, oldSpareTile)
        }
        else if (shiftingDirection.value === 'up') {
          Vue.set(state.tileGrid, 'spareTile', state.tileGrid[3][shiftingColumn.value])
          for (let row = 4; row <= mazeDimensions.nOfRows + 2; row++) {
            Vue.set(state.tileGrid[row - 1], shiftingColumn.value, state.tileGrid[row][shiftingColumn.value])
          }
          state.tileGrid.spareTileRow = 2
          Vue.set(state.tileGrid, 'spareTileRow', 2)
          Vue.set(state.tileGrid[mazeDimensions.nOfRows + 2], shiftingColumn.value, oldSpareTile)
        }
      }, 1000)
    }

    function moveSpareTileTo(row, column) {
      if (row === spareTileArrowRow.value && column === spareTileArrowColumn.value) {
        shift()
      } else {
        state.tileGrid.spareTileRow = row
        state.tileGrid.spareTileColumn = column
      }
    }

    function drawRoute(end) {
      state.segmentGrid = {
        3: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        4: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        5: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        6: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        7: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        8: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
        9: { 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' },
      }
      const route = dijkstrasAlgorithm(mazeGraph.value, state.tokens[state.currentPlayer], end)
      if (!route)
        return undefined
      for (let i = 0; i < route.length - 1; i++){
        const direction = neighborPosition(route[i], route[i+1])
        Vue.set(state.segmentGrid[route[i].row], route[i].column, direction)
      }
    }

    function tokenColor(row, column){
      let color;
      for (color in state.tokens) {
        if (state.tokens[color].row === row && state.tokens[color].column === column)
          return color
      }
      return ''
    }

    function moveTokenToDestination(end) {
      const route = dijkstrasAlgorithm(mazeGraph.value, state.tokens[state.currentPlayer], end)
      if (route) {
        state.tokens[state.currentPlayer] = _.cloneDeep(end)
      }
    }

    function log(x) { console.log(x) }

    const spareTileArrowPosition = computed(function(){
      if(state.tileGrid.spareTileRow === 2)
        return [1, state.tileGrid.spareTileColumn, 'down', 0, state.tileGrid.spareTileColumn]
      if (state.tileGrid.spareTileRow === mazeDimensions.nOfRows + 3)
        return [mazeDimensions.nOfRows + 4, state.tileGrid.spareTileColumn, 'up', 0, state.tileGrid.spareTileColumn]
      if (state.tileGrid.spareTileColumn === 2)
        return [state.tileGrid.spareTileRow, 1, 'right', state.tileGrid.spareTileRow, 0]
      if (state.tileGrid.spareTileColumn === mazeDimensions.nOfColumns + 3)
        return [state.tileGrid.spareTileRow, mazeDimensions.nOfColumns + 4, 'left', state.tileGrid.spareTileRow, 0]
      return [0, 0, '', 0, 0]
    })

    const spareTileArrowRow = computed(() => spareTileArrowPosition.value[0])
    const spareTileArrowColumn = computed(() => spareTileArrowPosition.value[1])
    const shiftingDirection = computed(() => spareTileArrowPosition.value[2])
    const shiftingRow = computed(() => spareTileArrowPosition.value[3])
    const shiftingColumn = computed(() => spareTileArrowPosition.value[4])

    const mazeGraph = computed(() => mazeToGraph(state.tileGrid))

    return {
      state,
      mazeDimensions,
      tryElseNull,
      moveSpareTileTo,
      rem,
      spareTileArrowRow,
      spareTileArrowColumn,
      shiftingDirection,
      shiftingRow,
      shiftingColumn,
      dijkstrasAlgorithm,
      mazeGraph,
      drawRoute,
      tokenColor,
      moveTokenToDestination,
      log
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container{
  display: inline-grid;
  align-self: center;
  grid-template-rows: repeat(11, 9%);
  grid-template-columns: repeat(11, 9%);
}

.grid-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.tile-image {
  width: 100%;
  height: 100%;
  border-radius: 10%;
}

.spare-tile-image {

}

.move-up {
  width: 100%;
  height: 100%;
  position: relative;

  .insertion-arrow {
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid red;

    &:hover {
      border-bottom: 0.5rem solid black;
    }

    //position
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0%);
  }
}

.move-down {
  width: 100%;
  height: 100%;
  position: relative;

  .insertion-arrow {
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 0.5rem solid red;

    &:hover {
      border-top: 0.5rem solid black;
    }

    //position
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
  }
}

.move-right {
  width: 100%;
  height: 100%;
  position: relative;

  .insertion-arrow {
    width: 0;
    height: 0;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-left: 0.5rem solid red;

    &:hover {
      border-left: 0.5rem solid black;
    }

    //position
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-100%, -50%);
  }
}

.move-left {
  width: 100%;
  height: 100%;
  position: relative;

  .insertion-arrow {
    width: 0;
    height: 0;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-right: 0.5rem solid red;

    &:hover {
      border-right: 0.5rem solid black;
    }

    //position
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
  }
}

.shifting-down {
  @keyframes shifting-down {
    to { transform: translateY(100%); }
  }
  animation-name: shifting-down;
  animation-duration: 1s;
}

.shifting-up {
  @keyframes shifting-up {
    to { transform: translateY(-100%); }
  }
  animation-name: shifting-up;
  animation-duration: 1s;
}

.shifting-right {
  @keyframes shifting-right {
    to { transform: translateX(100%); }
  }
  animation-name: shifting-right;
  animation-duration: 1s;
}

.shifting-left {
  @keyframes shifting-left {
    to { transform: translateX(-100%); }
  }
  animation-name: shifting-left;
  animation-duration: 1s;
}

.token-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.token {
  height: 100%;
  width: 100%;
  background-color: #555;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.big-div {
  display:flex;
  flex-direction: row;
}

.segment-right {
  width: 100%;
  height: 10%;
  background-color: green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.segment-left {
  width: 100%;
  height: 10%;
  background-color: green;
  position: absolute;
  top: 50%;
  left: -50%;
  transform: translateY(-50%);
  z-index: 10;
}

.segment-up {
  width: 10%;
  height: 100%;
  background-color: green;
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
.segment-down {
  width: 10%;
  height: 100%;
  background-color: green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

</style>
