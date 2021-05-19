const strings = {
    title: "Cosmos",
    homeView: {
        play: "Play",
        joinGameInputPlaceholder: "Game ID",
        cancelButton: "Cancel",
        joinGameButton: "Join lobby",
        createGameButton: "Create lobby",
        gameAlreadyExists: "This game already exists",
        gameDoesNotExists: "This game doesn't exists"
    },
    gameView: {
        lobby: {
            changeColor: "Change color:",
            totalTurns: "Number of turns:",
            angularVelocity: "Rotation velocity:",
            velocity: "Ship's velocity:",
            reloadingVelocity: "Reloading velocity:",
            bulletVelocity: "Bullet velocity:",
            joinLobby: "Join",
            startGame: "Start",
            adminSettings: "Game settings",
            shareTheLink: "Copy link",
            copyTag: "Copy tag",
        }
    }
}

const colors = ["green", "red", "violet", "blue"];


let baseUrl = "https://papero.me";
const urls = {
    baseUrl: "https://papero.me",
    socketPath: "/server/cosmos/socket.io",
    getLoginInfoUrl: baseUrl+"/user/get_info",
    createLocalAccountUrl: baseUrl+"/auth/local",
    logoutUrl: baseUrl+"/auth/logout",
    getGameStatusUrl: baseUrl+"/server/cosmos/games/status_by_id"
}

const sceneKeys = {
    game: "game",
    lobby: "lobby"
}

const gameDimensions = {
    width: 800,
    height: 600
}

const mazeDimensions = {
    nOfRows: 7,
    nOfColumns: 7
}

const rem = parseInt(getComputedStyle(document.documentElement).fontSize)

export { strings, colors, urls, sceneKeys, gameDimensions, mazeDimensions, rem }
