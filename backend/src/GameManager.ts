import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game, ChessMove } from "./Game";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket) {
        // no need for this now (adding users)
        this.users.push(socket);
        this.addHandlers(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
    }

    private handleInitGame(socket: WebSocket) {
        if (this.pendingUser) {
            //start a game
            const game = new Game(this.pendingUser, socket);
            this.games.push(game);
            this.pendingUser = null;
        } else {
            this.pendingUser = socket
        }
    }

    private handleMakeMove(socket: WebSocket, move: ChessMove) {
        const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
        if (game) {
            game.makeMove(socket, move);
        }
    }

    private addHandlers(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === INIT_GAME) {
                this.handleInitGame(socket)
            }
            if (message.type === MOVE) {
                this.handleMakeMove(socket, message.move);
            }
        })
    }
}