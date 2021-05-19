import {mazeDimensions} from "../constants/constants";
/*import { PriorityQueue } from "./PriorityQueue";*/
import _ from "lodash"

function mazeToGraph(tileGrid){
    const result = {}
    for (let row = 3; row <= mazeDimensions.nOfRows + 2; row++) {
        for (let column = 3; column <= mazeDimensions.nOfColumns + 2; column++) {
            const nodeNeighbors = []
            const thisTile = tileGrid[row][column]

            const topTile = tryElseNull(() => tileGrid[row - 1][column])
            if (topTile && thisTile.openings[0] && topTile.openings[2])
                nodeNeighbors.push({ row: row - 1, column: column })
            const bottomTile = tryElseNull(() => tileGrid[row + 1][column])
            if (bottomTile && thisTile.openings[2] && bottomTile.openings[0])
                nodeNeighbors.push({ row: row + 1, column: column })
            const leftTile = tryElseNull(() => tileGrid[row][column - 1])
            if (leftTile && thisTile.openings[3] && leftTile.openings[1])
                nodeNeighbors.push({ row: row, column: column - 1 })
            const rightTile = tryElseNull(() => tileGrid[row][column + 1])
            if (rightTile && thisTile.openings[1] && rightTile.openings[3])
                nodeNeighbors.push({ row: row, column: column + 1 })

            result[[row, column]] = { neighbors: nodeNeighbors }
        }
    }

    return result
}

/*export function dijkstrasAlogorithm(graph, start, end){
    console.log('dijksta\'s algorithm')


    graph = _.cloneDeep(graph)

    const priorityQueue = new PriorityQueue((a, b) => { return a.distance < b.distance })
    for (let row = 3; row <= mazeDimensions.nOfRows + 2; row++) {
        for (let column = 3; column <= mazeDimensions.nOfColumns + 2; column++) {
            const node = Object.assign(
                graph[[ row, column ]],
                {
                    position: { row, column },
                    previous: null,
                    distance: row === start.row && column === start.column ? 0 : 1000000
                }
            )
            priorityQueue.push(node)
        }
    }
    console.log(graph)
    console.log(priorityQueue)

    console.log(priorityQueue.isEmpty())
    while (!priorityQueue.isEmpty()) {
        const tile = priorityQueue.pop()
        console.log(tile)
        let neighbor
        for (neighbor in tile.neighbors) {
            if (tile.distance + 1 < graph[[neighbor.row, neighbor.column]].distance) {
                graph[[neighbor.row, neighbor.column]].previous = tile.position
                graph[[neighbor.row, neighbor.column]].distance = tile.distance + 1
            }
        }
    }

    const result = []
    let tile = end
    while(tile) {
        result.push(tile)
        tile = graph[[tile.row, tile.column]].previous
    }

    console.log(graph)
    return result
}*/

/*function dijkstraAlogorithm(graph, start, end, alreadySeen = []) {
    _.cloneDeep(alreadySeen)
    console.log(graph)

    if (start.row === end.row && start.column === end.column) {
        console.log('end reached: ' + start.row + ', ' + start.column)
        alreadySeen.push(end)
        return alreadySeen
    }

    const unseenNeighbors = graph[[start.row, start.column]].neighbors.filter((neighbor) => {
        let hasBeenSeen = false
        console.log('neighbor: ' + neighbor.row + '-' + neighbor.column)
        for (let i = 0; i < alreadySeen.length; i++) {
            const as = alreadySeen[i]
            if (neighbor.row === as.row && neighbor.column === as.column) {
                hasBeenSeen = true
            }
            console.log('as: ' + as.row + '-' + as.column)
            console.log('as: ' + as)
        }
        console.log('hasBeenSeen: ' + hasBeenSeen)
        return !hasBeenSeen
    })
    console.log('unseenNeighbors: ' + unseenNeighbors.map((tile) => tile.row + '-' + tile.column).join(", "))
    if (unseenNeighbors.length === 0) {
        console.log('dead end: ' + start.row + ', ' + start.column)
        return null
    }

    alreadySeen.push(start)
    console.log('node in the middle of the path: ' + start.row + ', ' + start.column)
    let shortestPath = null
    unseenNeighbors.forEach((neighbor) => {
        const shortestPathThroughNeighbor = dijkstraAlogorithm(graph, neighbor, end, alreadySeen)
        if (shortestPathThroughNeighbor) {
            if (shortestPath) {
                if (shortestPathThroughNeighbor.length < shortestPath.length) {
                    shortestPath = shortestPathThroughNeighbor
                }
            } else {
                shortestPath = shortestPathThroughNeighbor
            }
        }
    })

    return shortestPath
}*/

export function dijkstrasAlgorithm(graph, start, end) {
    return findAllPaths(graph, start, end, []).sort((a, b) => b.length - a.length)[0]
}

function findAllPaths(graph, start, end, alreadySeen) {
    alreadySeen = _.cloneDeep(alreadySeen.map((a) => a))
    alreadySeen.push(start)

    if (objectsEqual(start, end)) {
        return [alreadySeen]
    }

    const unseenNeighbors = removeObjectsFromArray(graph[[start.row, start.column]].neighbors, alreadySeen)
    if(unseenNeighbors.length === 0) {
        return []
    } else {
        const result = []
        for (let i = 0; i < unseenNeighbors.length; i++) {
            const paths = findAllPaths(graph, unseenNeighbors[i], end, alreadySeen)
            for (let j = 0; j < paths.length; j++) {
                result.push(paths[j])
            }
        }
        return result
    }

}

export function objectsEqual(o1, o2) {
    return o1.row === o2.row && o1.column === o2.column
}

export function objectInArray(o, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (objectsEqual(arr[i], o))
            return true
    }
    return false
}

export function removeObjectsFromArray(l1, l2) {
    return l1.filter((o) => !objectInArray(o, l2))
}

export function neighborPosition(tile1, tile2) {
    if (tile1.row - 1 === tile2.row && tile1.column === tile2.column) {
        return 'up'
    }
    if (tile1.row + 1 === tile2.row && tile1.column === tile2.column) {
        return 'down'
    }
    if (tile1.row === tile2.row && tile1.column - 1 === tile2.column) {
        return 'left'
    }
    if (tile1.row === tile2.row && tile1.column + 1 === tile2.column) {
        return 'right'
    }
    return ''
}



function tryElseNull(fun){
    try {
        return fun()
    } catch {
        return null
    }
}

export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export {mazeToGraph, tryElseNull}