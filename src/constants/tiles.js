import _ from 'lodash'
import { mazeDimensions } from "./constants";

class Tile {
    constructor(obj) {
        Object.assign(this, obj)
    }

    rotateRight() {
        if(this.image.rotation === 3) {
            this.image.rotation = 0
        }
        this.image.rotation++

        const oldOpenings = this.openings
        this.openings = [
            oldOpenings[3],
            oldOpenings[0],
            oldOpenings[1],
            oldOpenings[2],
        ]

        return this
    }

    rotateRightNTimes(n) {
        for(let i = 0; i < n; i++) {
            this.rotateRight()
        }

        return this
    }
}

export const movableTiles = [
    {
        quantity: 12,
        tile: new Tile({
            image: {
                path: require('../assets/tiles/movable-tiles/straight_tile.png'),
                rotation: 0,
            },
            openings: [true, false, true, false],
            object: null
        })
    },
    {
        quantity: 10,
        tile: new Tile({
            image: {
                path: require('../assets/tiles/movable-tiles/turn_tile.png'),
                rotation: 0
            },
            openings: [false, true, true, false],
            object: null
        })
    }
]

export const fixedTiles = {
    3: {
        3: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-3-3.png"),
                rotation: 0
            },
            openings: [false, true, true, false],
            object: null
        }),
        5: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-3-5.png"),
                rotation: 0
            },
            openings: [false, true, true, true],
            object: null
        }),
        7: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-3-7.png"),
                rotation: 0
            },
            openings: [false, true, true, true],
            object: null
        }),
        9: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-3-9.png"),
                rotation: 0
            },
            openings: [false, false, true, true],
            object: null
        })
    },
    5: {
        3: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-5-3.png"),
                rotation: 0
            },
            openings: [true, true, true, false],
            object: null
        }),
        5: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-5-5.png"),
                rotation: 0
            },
            openings: [true, true, true, false],
            object: null
        }),
        7: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-5-7.png"),
                rotation: 0
            },
            openings: [false, true, true, true],
            object: null
        }),
        9: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-5-9.png"),
                rotation: 0
            },
            openings: [true, false, true, true],
            object: null
        })
    },
    7: {
        3: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-7-3.png"),
                rotation: 0
            },
            openings: [true, true, true, false],
            object: null
        }),
        5: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-7-5.png"),
                rotation: 0
            },
            openings: [true, true, false, true],
            object: null
        }),
        7: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-7-7.png"),
                rotation: 0
            },
            openings: [true, false, true, true],
            object: null
        }),
        9: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-7-9.png"),
                rotation: 0
            },
            openings: [true, false, true, true],
            object: null
        })
    },
    9: {
        3: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-9-3.png"),
                rotation: 0
            },
            openings: [true, true, false, false],
            object: null
        }),
        5: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-9-5.png"),
                rotation: 0
            },
            openings: [true, true, false, true],
            object: null
        }),
        7: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-9-7.png"),
                rotation: 0
            },
            openings: [true, true, false, true],
            object: null
        }),
        9: new Tile({
            image: {
                path: require("../assets/tiles/fixed-tiles/fixed-tile-9-9.png"),
                rotation: 0
            },
            openings: [true, false, false, true],
            object: null
        })
    }
}

export function createTileGrid(shuffledMovableTiles){
    const result = {}
    for (let row = 2; row <= mazeDimensions.nOfRows + 3; row++){
        if(row !== 2 && row !== mazeDimensions.nOfRows + 3) {
            const rowTiles = {}
            for (let column = 2; column <= mazeDimensions.nOfColumns + 3; column++) {
                if(column !== 2 && column !== mazeDimensions.nOfColumns + 3){
                    if (column % 2 === 1 && row % 2 === 1){
                        rowTiles[column] = fixedTiles[row][column]
                    } else {
                        rowTiles[column] = shuffledMovableTiles.shift()
                    }
                }
            }
            result[row] = rowTiles
        }
    }
    result.spareTile = shuffledMovableTiles.shift()
    result.spareTileRow = 2
    result.spareTileColumn = 4

    return result
}

export function shuffledMovableTiles(){
    const result = []
    for (let i = 0; i < 34; i++) {
        result.push(_.cloneDeep(movableTiles[Math.floor(Math.random()*2)].tile).rotateRightNTimes(Math.floor(Math.random()*4)))
    }
    return result
}

/*
export function generateInitialTileGrid(nOfRows, nOfColumns) {
    const result = []

    for (let row = 1; row <= nOfRows; row++) {
        for(let column = 1; column <= nOfColumns; column++) {
            result.push({
                row: row,
                column: column,
                tile: _.cloneDeep(movableTiles[Math.floor(Math.random()*2)].tile).rotateRight(Math.floor(Math.random()*4))
            })
        }
    }

    return result
}*/
